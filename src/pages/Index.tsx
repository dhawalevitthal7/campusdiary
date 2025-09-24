import { useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { CompanyList } from "@/components/CompanyList";
import { ChatInterface } from "@/components/ChatInterface";
import { MobileCompanyDrawer } from "@/components/MobileCompanyDrawer";

const Index = () => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const handleCompanySelect = useCallback((company: string) => {
    setSelectedCompany(company);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header />
      
      {/* Mobile Company Drawer */}
      <MobileCompanyDrawer onCompanySelect={handleCompanySelect} />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Company Sidebar */}
        <div className="w-80 flex-shrink-0 hidden md:block">
          <CompanyList onCompanySelect={handleCompanySelect} />
        </div>
        
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <ChatInterface 
            onCompanySelect={handleCompanySelect}
            selectedCompany={selectedCompany}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
