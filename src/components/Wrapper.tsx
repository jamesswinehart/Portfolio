"use client";

import { useState, createContext, useContext } from "react";
import Header from "./Header";
import AboutButton from "./AboutButton";
import Sidebar from "./Sidebar";
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
  const [visibleSections, setVisibleSectionsState] = useState<Set<string>>(new Set(["about"]));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle about button click
  const handleAboutClick = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  // Handle navigation item clicks
  const handleNavItemClick = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const setVisibleSections = (sections: Set<string> | ((prev: Set<string>) => Set<string>)) => {
    setVisibleSectionsState(sections);
  };

  return (
    <VisibleSectionsContext.Provider value={{ visibleSections, setVisibleSections }}>
      <div className="wrapper">
        <Header />
        <AboutButton />
        
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

        {/* Desktop Sidebar */}
        <Sidebar />
        
        {/* Mobile Menu Overlay */}
        <MobileMenuOverlay 
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          onAboutClick={handleAboutClick}
          onNavItemClick={handleNavItemClick}
        />

        <ContentWindow />
        
        {/* Bottom gradient overlay */}
        <div className="bottom-gradient" />
      </div>
    </VisibleSectionsContext.Provider>
  );
}