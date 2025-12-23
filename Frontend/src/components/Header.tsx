import { Wind } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-primary shadow-elevated">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary">
              <Wind className="w-6 h-6 text-secondary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary-foreground tracking-tight">
                REVERSOMATIC
              </h1>
              <p className="text-xs text-accent font-medium">
                HRV/ERV Selection Tool
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-primary-foreground/80 text-sm">
            <span className="font-medium">Industrial Ventilation Solutions</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
