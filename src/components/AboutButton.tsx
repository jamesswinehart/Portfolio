"use client";

import { useState } from "react";
import { useVisibleSections } from "./Wrapper";

// Constants
const ABOUT_SECTION_ID = "about";
const VISIBLE_OPACITY = 1;
const DEFAULT_OPACITY = 0.67;

export default function AboutButton() {
  const { visibleSections } = useVisibleSections();
  const [isClicked, setIsClicked] = useState(false);
  
  const scrollToAbout = () => {
    setIsClicked(true);
    const section = document.getElementById(ABOUT_SECTION_ID);
    section?.scrollIntoView({ behavior: "smooth" });
    
    // Reset click state after scroll completes
    setTimeout(() => setIsClicked(false), 1000);
  };

  const isAboutVisible = visibleSections.has(ABOUT_SECTION_ID);
  const opacity = isClicked || isAboutVisible ? VISIBLE_OPACITY : DEFAULT_OPACITY;

  return (
    <div 
      className="about-button" 
      onClick={scrollToAbout}
      style={{ opacity }}
    >
      About
    </div>
  );
}