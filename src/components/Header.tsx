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
                Campus Placement 2026 - Companies visiting RCOEM for recruitment drives.
              </p>
              <p className="text-xs text-muted-foreground sm:hidden">
                Campus Placement 2026
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <div className="text-xs sm:text-sm text-muted-foreground font-medium">
              Created by Vitthal Dhawale
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}