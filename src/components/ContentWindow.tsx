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

        {/* Placeholder sections for navigation */}
        <section id="cv">
          <h2 className="text-2xl font-semibold mb-4">CV</h2>
          <p>CV content coming soon...</p>
        </section>

        <section id="projects">
          <h2 className="text-2xl font-semibold mb-4">Projects</h2>
          <p>Projects content coming soon...</p>
        </section>

        <section id="linkedin">
          <h2 className="text-2xl font-semibold mb-4">LinkedIn</h2>
          <p>LinkedIn content coming soon...</p>
        </section>

        <section id="map">
          <h2 className="text-2xl font-semibold mb-4">Map</h2>
          <p>Map content coming soon...</p>
        </section>

        <section id="blog">
          <h2 className="text-2xl font-semibold mb-4">Blog</h2>
          <p>Blog content coming soon...</p>
        </section>

        <section id="collaborators">
          <h2 className="text-2xl font-semibold mb-4">Collaborators</h2>
          <p>Collaborators content coming soon...</p>
        </section>

        <section id="press">
          <h2 className="text-2xl font-semibold mb-4">Press</h2>
          <p>Press content coming soon...</p>
        </section>
      </div>

      {/* Fade overlays */}
      <div 
        className="pointer-events-none absolute top-0 left-0 right-0 h-10 z-50"
        style={{ background: "linear-gradient(to bottom, #f5f5f7, transparent)" }} 
      />
      <div 
        className="pointer-events-none absolute top-0 bottom-0 left-0 w-10 z-50"
        style={{ background: "linear-gradient(to right, #f5f5f7, transparent)" }} 
      />
      <div 
        className="pointer-events-none absolute top-0 bottom-0 right-3 w-10 z-50"
        style={{ background: "linear-gradient(to left, #f5f5f7, transparent)" }} 
      />
    </div>
  );
}