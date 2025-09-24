import { useState } from "react";
import { Search, Building2, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const companies = [
  "NUTANIX", "Cognizant", "accenture", "Capgemini", "LTI", "Infosys",
  "AMADEUS", "GlobalLogic", "BRISTLECONE", "vconstruct", "ZS",
  "Aspect Ratio", "VarroC", "mahindra", "Schneider Electric", "Cognida.ai",
  "SoftLink International", "Principal", "PHILIPS", "C&R Software", "Eaton",
  "Finastra", "DE Shaw & Co", "EPAM", "Sagacious IP", "Porter", "TURING",
  "Siemens", "Nexcellerate Technologies", "Kickdrum", "HSBC", "Nvidia",
  "Carrier", "Planful", "Fendahl", "Pubmatic", "Trimble", "YOptima",
  "Bluealtair", "JSW", "GOCOMET", "AVEVA", "Chegg", "JTP", "Darwinbox",
  "TIAA", "Quantiphi", "Demand Farm", "Taurani Holdings", "emami",
  "Muthoot Finance", "DeltaX", "Innovaptive Inc", "Raja Software Labs",
  "Hitachi Energy", "ALPHAWAVE SEMI", "Adani", "CEAT", "Hexaware",
  "ArcelorMittal Nippon Steel India", "Solar Industries", "Grindwell Norton",
  "Acmegrade", "Grappus", "Cloud 4C", "TravClan", "Tata Technologies",
  "Tata Asset Management", "Tata Hitachi", "Blue Star", "AFCONS",
  "Telaverge Communications", "Asian Heart Institute"
];

interface CompanyListProps {
  onCompanySelect?: (company: string) => void;
}

export function CompanyList({ onCompanySelect }: CompanyListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCompanies = companies.filter(company =>
    company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCompanyClick = (company: string) => {
    if (onCompanySelect) {
      onCompanySelect(company);
    }
  };

  const getCompanyCategory = (company: string) => {
    const tech = ["NUTANIX", "Nvidia", "EPAM", "GlobalLogic", "Infosys", "Cognizant", "accenture", "Capgemini", "LTI"];
    const consulting = ["ZS", "Aspect Ratio", "DE Shaw & Co", "Principal"];
    const manufacturing = ["mahindra", "Siemens", "Tata Technologies", "JSW", "Adani"];
    
    if (tech.some(t => company.toLowerCase().includes(t.toLowerCase()))) return "Technology";
    if (consulting.some(c => company.toLowerCase().includes(c.toLowerCase()))) return "Consulting";
    if (manufacturing.some(m => company.toLowerCase().includes(m.toLowerCase()))) return "Manufacturing";
    return "Other";
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Technology": return "bg-primary text-primary-foreground";
      case "Consulting": return "bg-accent text-accent-foreground";
      case "Manufacturing": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="h-full bg-white border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-3">
          <Building2 className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">Companies</h2>
          <Badge variant="secondary" className="ml-auto">
            {filteredCompanies.length}
          </Badge>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-lg"
          />
        </div>
      </div>

      {/* Company List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredCompanies.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Building2 className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No companies found</p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredCompanies.map((company, index) => {
                const category = getCompanyCategory(company);
                return (
                  <button
                    key={index}
                    onClick={() => handleCompanyClick(company)}
                    className="w-full text-left p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200 group border border-transparent hover:border-border"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm text-foreground truncate group-hover:text-primary transition-colors">
                          {company}
                        </h3>
                        <div className="mt-1">
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${getCategoryColor(category)}`}
                          >
                            {category}
                          </Badge>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer Stats */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="text-xs text-muted-foreground text-center">
          <p className="font-medium">Campus Placement 2024</p>
          <p>Click any company to ask questions</p>
        </div>
      </div>
    </div>
  );
}