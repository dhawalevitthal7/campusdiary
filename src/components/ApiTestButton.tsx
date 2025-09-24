import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ApiTestButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const testApi = async () => {
    setIsLoading(true);
    setStatus('idle');

    try {
      const response = await fetch("https://campus-diary-lwk6.onrender.com/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: "Test connection" }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("API Response:", data);
      
      setStatus('success');
      toast({
        title: "✅ API Connection Successful",
        description: "Your backend is working correctly!",
      });
    } catch (error) {
      console.error("API Test Error:", error);
      setStatus('error');
      
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        toast({
          title: "❌ CORS Error Detected",
          description: "Backend needs CORS configuration. Check console for details.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "❌ API Test Failed",
          description: error instanceof Error ? error.message : "Unknown error",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={testApi}
      disabled={isLoading}
      variant="outline"
      size="sm"
      className="gap-2"
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : status === 'success' ? (
        <CheckCircle className="w-4 h-4 text-success" />
      ) : status === 'error' ? (
        <AlertCircle className="w-4 h-4 text-destructive" />
      ) : null}
      Test API Connection
    </Button>
  );
}