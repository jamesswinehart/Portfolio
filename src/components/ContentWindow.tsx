"use client";

import { useEffect, useRef } from "react";
import { useVisibleSections } from "./Wrapper";
import About from "./ContentBlocks/Everything/About";
import Projects from "./ContentBlocks/Everything/Projects";
import Marketing from "./ContentBlocks/Everything/Marketing";
import Writing from "./ContentBlocks/Everything/Writing";
import HungryTiger from "./ContentBlocks/Everything/HungryTiger";
import LinkedIn from "./ContentBlocks/Everywhere/LinkedIn";
import Beli from "./ContentBlocks/Everywhere/Beli";
import Instagram from "./ContentBlocks/Everyone/Instagram";
import ContactMe from "./ContentBlocks/Everyone/ContactMe";

// Constants
const OBSERVER_OPTIONS = {
  root: null,
  rootMargin: '0px 0px -20% 0px',
  threshold: 0.1,
};

const DOM_RENDER_DELAY = 100;

export default function ContentWindow() {
  const { setVisibleSections } = useVisibleSections();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleSections((prevSections: Set<string>) => {
          const newVisibleSections = new Set(prevSections);
          
          entries.forEach((entry) => {
            const sectionId = entry.target.id;
            if (entry.isIntersecting) {
              newVisibleSections.add(sectionId);
            } else {
              newVisibleSections.delete(sectionId);
            }
          });
          
          return newVisibleSections;
        });
      },
      OBSERVER_OPTIONS
    );

    observerRef.current = observer;

    // Ensure DOM is fully rendered before observing sections
    const timeoutId = setTimeout(() => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => observer.observe(section));
    }, DOM_RENDER_DELAY);

    return () => {
      clearTimeout(timeoutId);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [setVisibleSections]);

  return (
    <div className="scroll-frame">
      {/* Top fade overlay (pinned to top of content window) */}
      <div className="top-gradient" />

      <div className="scroll-content">
        
        {/* Everything */}
        <About />
        <Projects />
        <Marketing />
        <Writing />
        <HungryTiger />

        {/* Everywhere */}
        <LinkedIn />
        <Beli />

        {/* Everyone */}
        <Instagram />
        <ContactMe />
      </div>
    </div>
  );
}