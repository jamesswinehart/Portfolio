"use client";

import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import ContentWindow from "./ContentWindow";
import MobileMenuToggle from "./MobileMenuToggle";
import MobileMenuOverlay, { NAV_SECTION_IDS } from "./MobileMenuOverlay";

// A section becomes active once its top scrolls above this line (px below the top of the scroll frame).
const ACTIVE_LINE = 120;
// How long scrolling must stop before a click-triggered scroll counts as finished.
const SCROLL_SETTLE_MS = 150;

function findActiveSection(frame: HTMLElement): string {
  // At the very bottom, short final sections can never reach the line, so pick the last one.
  if (frame.scrollTop + frame.clientHeight >= frame.scrollHeight - 2) {
    return NAV_SECTION_IDS[NAV_SECTION_IDS.length - 1];
  }

  const frameTop = frame.getBoundingClientRect().top;
  let active = NAV_SECTION_IDS[0];
  for (const id of NAV_SECTION_IDS) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top - frameTop <= ACTIVE_LINE) {
      active = id;
    }
  }
  return active;
}

export default function Wrapper() {
  const [activeSection, setActiveSection] = useState(NAV_SECTION_IDS[0]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // While a click-triggered smooth scroll is running, keep the clicked item active.
  const isClickScrolling = useRef(false);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // (Re)starts the countdown that ends a click-triggered scroll.
  const restartSettleTimer = (ms: number) => {
    if (settleTimer.current) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, ms);
  };

  useEffect(() => {
    const frame = document.querySelector<HTMLElement>(".scroll-frame");
    if (!frame) return;

    const handleScroll = () => {
      if (isClickScrolling.current) {
        restartSettleTimer(SCROLL_SETTLE_MS);
        return;
      }
      setActiveSection(findActiveSection(frame));
    };

    frame.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      frame.removeEventListener("scroll", handleScroll);
      if (settleTimer.current) clearTimeout(settleTimer.current);
    };
  }, []);

  const handleNavItemClick = (section: string) => {
    setActiveSection(section);
    isClickScrolling.current = true;
    // Covers clicks that cause no scrolling (already in place); later scroll events extend the wait.
    restartSettleTimer(SCROLL_SETTLE_MS * 2);
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
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
        activeSection={activeSection}
        onNavItemClick={handleNavItemClick}
      />

      <ContentWindow />

      {/* Bottom gradient overlay */}
      <div className="bottom-gradient" />
    </div>
  );
}
