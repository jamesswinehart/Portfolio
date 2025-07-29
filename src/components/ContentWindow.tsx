"use client";

import { useEffect, useRef } from "react";
import { useVisibleSections } from "./Wrapper";
import AboutContent from "./ContentBlocks/AboutContent";

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
      <div className="scroll-content">
        <AboutContent />

        {/* Content Sections */}
        {/* Add your content sections here with proper IDs for navigation */}
        
        {/* Example structure:
        <section id="cv">
          <h2>CV</h2>
          <p>Your CV content here...</p>
        </section>
        
        <section id="projects">
          <h2>Projects</h2>
          <p>Your projects content here...</p>
        </section>
        */}
      </div>

      {/* Top fade overlay */}
      <div 
        className="pointer-events-none absolute top-0 left-0 right-0 h-10 z-50"
        style={{ background: "linear-gradient(to bottom, #f5f5f7, transparent)" }} 
      />
    </div>
  );
}