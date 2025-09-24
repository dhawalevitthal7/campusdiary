import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  onCompanySelect?: (company: string) => void;
  selectedCompany?: string | null;
}

const suggestedQuestions = [
  "What companies are visiting for placements?",
  "What is the CTC range offered by tech companies?",
  "Tell me about internship opportunities and stipends",
  "What are the eligibility criteria for placements?",
  "How many rounds are there in the placement process?",
  "Which roles are available for CS students?",
  "What are the requirements for Infosys placement?",
  "Tell me about FAANG companies visiting campus"
];

export function ChatInterface({ onCompanySelect, selectedCompany }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm your Campus Placement Assistant. I can help you with information about companies, CTC ranges, eligibility criteria, placement rounds, and more. What would you like to know?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("https://campus-diary-lwk6.onrender.com/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: inputValue }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      
      // Extract only the response text and format it properly
      let responseText = data.response || "I'm sorry, I couldn't process that request.";
      
      // Clean up the response text formatting
      responseText = responseText
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove markdown bold formatting
        .replace(/\*(.*?)\*/g, '$1')     // Remove markdown italic formatting
        .trim();
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
  };

  // Handle company selection from the sidebar
  useEffect(() => {
    if (selectedCompany) {
      const companyQuestion = `Tell me about ${selectedCompany} - their placement process, CTC, eligibility criteria, and available roles.`;
      setInputValue(companyQuestion);
    }
  }, [selectedCompany]);

  return (
    <div className="flex flex-col h-full bg-gradient-light">
      {/* Chat Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${message.isBot ? "" : "flex-row-reverse"}`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.isBot 
                  ? "bg-gradient-primary text-white" 
                  : "bg-primary-light text-primary-dark"
              }`}>
                {message.isBot ? <Bot size={16} /> : <User size={16} />}
              </div>
              
              <div className={`max-w-[70%] ${message.isBot ? "" : "flex flex-col items-end"}`}>
                <div className={`rounded-2xl px-4 py-3 shadow-custom-sm ${
                  message.isBot
                    ? "bg-white text-foreground rounded-tl-sm"
                    : "bg-primary text-primary-foreground rounded-tr-sm"
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                </div>
                <span className="text-xs text-muted-foreground mt-1 px-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary text-white flex items-center justify-center">
                <Bot size={16} />
              </div>
              <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-custom-sm">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="px-4 pb-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Try asking about:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="text-left p-3 bg-white rounded-lg shadow-custom-sm hover:shadow-custom-md transition-all duration-200 hover:bg-gradient-card border border-border text-sm"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t bg-white p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about companies, CTC, eligibility, or placement process..."
              className="flex-1 rounded-xl border-border focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="bg-gradient-primary hover:opacity-90 rounded-xl px-6 shadow-custom-sm"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}