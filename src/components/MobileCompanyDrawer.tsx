import { useState } from "react";
import { Building2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CompanyList } from "./CompanyList";

interface MobileCompanyDrawerProps {
  onCompanySelect?: (company: string) => void;
}

export function MobileCompanyDrawer({ onCompanySelect }: MobileCompanyDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCompanySelect = (company: string) => {
    if (onCompanySelect) {
      onCompanySelect(company);
    }
    setIsOpen(false); // Close drawer after selection
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="md:hidden fixed top-20 left-4 z-50 bg-white shadow-custom-md border-border"
        >
          <Building2 className="w-4 h-4 mr-2" />
          Companies
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Companies
          </SheetTitle>
        </SheetHeader>
        <div className="h-[calc(100vh-80px)]">
          <CompanyList onCompanySelect={handleCompanySelect} />
        </div>
      </SheetContent>
    </Sheet>
  );
}