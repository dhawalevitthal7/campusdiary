import { GraduationCap, Sparkles } from "lucide-react";
import { ApiTestButton } from "./ApiTestButton";

export function Header() {
  return (
    <header className="bg-white border-b border-border shadow-custom-sm">
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-custom-sm flex-shrink-0">
              <GraduationCap className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                CampusDiary RCOEM
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                A comprehensive list of companies that visited RCOEM for campus recruitment drives.
              </p>
              <p className="text-xs text-muted-foreground sm:hidden">
                RCOEM campus recruitment companies
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <div className="hidden sm:block">
              <ApiTestButton />
            </div>
            <div className="flex items-center gap-1 sm:gap-2 bg-gradient-light px-2 sm:px-4 py-1 sm:py-2 rounded-full border border-border">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary">AI</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}