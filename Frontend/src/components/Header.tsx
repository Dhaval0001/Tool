// 
import { Wind } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-primary shadow-elevated">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center">
          <img 
            src="Cropped HD.png" 
            alt="Logo" 
            className="h-16 w-auto sm:h-15 object-contain"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;