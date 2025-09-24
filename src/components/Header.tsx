import { GraduationCap, Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white border-b border-border shadow-custom-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-custom-sm">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                CampusDiary
              </h1>
              <p className="text-sm text-muted-foreground">Campus Placement Assistant</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-gradient-light px-4 py-2 rounded-full border border-border">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI Powered</span>
          </div>
        </div>
      </div>
    </header>
  );
}