"use client";

import { useState, createContext, useContext } from "react";
import Header from "./Header";
import ContentWindow from "./ContentWindow";
import MobileMenuToggle from "./MobileMenuToggle";
import MobileMenuOverlay from "./MobileMenuOverlay";

// Types
interface VisibleSectionsContextType {
  visibleSections: Set<string>;
  setVisibleSections: (sections: Set<string> | ((prev: Set<string>) => Set<string>)) => void;
}

// Context for sharing visible sections state across components
const VisibleSectionsContext = createContext<VisibleSectionsContextType>({
  visibleSections: new Set(),
  setVisibleSections: () => {},
});

export const useVisibleSections = () => useContext(VisibleSectionsContext);

export default function Wrapper() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(["about"]));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle navigation item clicks
  const handleNavItemClick = (section: string) => {
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <VisibleSectionsContext.Provider value={{ visibleSections, setVisibleSections }}>
      <div className="wrapper">
        <Header />
        
        {/* Mobile Menu Toggle */}
        <MobileMenuToggle 
          isOpen={isMobileMenuOpen} 
          onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
        />
        
        {/* Mobile Gradients */}
        <div className="mobile-side-gradient-left" />
        <div className="mobile-side-gradient-right" />
        <div className="mobile-top-gradient" />
        <div className="mobile-bottom-gradient" />

        {/* Mobile Menu Overlay */}
        <MobileMenuOverlay 
          isOpen={isMobileMenuOpen}
          onNavItemClick={handleNavItemClick}
        />

        <ContentWindow />
        
        {/* Bottom gradient overlay */}
        <div className="bottom-gradient" />
      </div>
    </VisibleSectionsContext.Provider>
  );
}