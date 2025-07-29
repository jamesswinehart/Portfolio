"use client";

import { useState } from "react";
import { useVisibleSections } from "./Wrapper";

// Types
type MenuSection = 'everything' | 'everywhere' | 'everyone';

interface MenuItem {
  id: string;
  label: string;
  onClick?: () => void;
}

interface MenuSectionData {
  id: MenuSection;
  label: string;
  items: MenuItem[];
}

// Constants
const MENU_SECTIONS: MenuSectionData[] = [
  {
    id: 'everything',
    label: 'Everything',
    items: [
      { id: 'cv', label: 'CV', onClick: () => document.getElementById("cv")?.scrollIntoView({ behavior: "smooth" }) },
      { id: 'linkedin', label: 'LinkedIn' },
      { id: 'projects', label: 'Projects' },
    ]
  },
  {
    id: 'everywhere',
    label: 'Everywhere',
    items: [
      { id: 'map', label: 'Map' },
      { id: 'blog', label: 'Blog' },
    ]
  },
  {
    id: 'everyone',
    label: 'Everyone',
    items: [
      { id: 'collaborators', label: 'Collaborators' },
      { id: 'press', label: 'Press' },
    ]
  }
];

// Submenu Item Component
function SubmenuItem({ item, opacity }: { item: MenuItem; opacity: number }) {
  const handleClick = () => {
    item.onClick?.();
  };

  return (
    <div
      className="sidebar-submenu-item cursor-pointer"
      onClick={handleClick}
      style={{ opacity }}
    >
      {item.label}
    </div>
  );
}

// Menu Section Component
function MenuSection({ 
  section, 
  expanded, 
  onToggle, 
  getOpacity
}: { 
  section: MenuSectionData; 
  expanded: boolean; 
  onToggle: () => void; 
  getOpacity: (id: string) => number;
}) {
  return (
    <>
      <button
        className="sidebar-button text-left text-[25px] flex items-center justify-between relative"
        onClick={onToggle}
        style={{ opacity: 1, width: '167px' }}
      >
        <span>{section.label}</span>
        <div className={`submenu-toggle absolute ${expanded ? 'open' : ''}`} style={{ right: '8px' }} />
      </button>
      <div className={`submenu-content ${expanded ? 'open' : ''}`}>
        <div className="pl-2 text-[16px] space-y-1">
          {section.items.map((item) => (
            <SubmenuItem key={item.id} item={item} opacity={getOpacity(item.id)} />
          ))}
        </div>
      </div>
    </>
  );
}

export default function Sidebar() {
  const [expanded, setExpanded] = useState<Record<MenuSection, boolean>>({
    everything: false,
    everywhere: false,
    everyone: false,
  });
  
  const { visibleSections } = useVisibleSections();

  const toggle = (section: MenuSection) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getOpacity = (sectionId: string) => {
    if (visibleSections.has(sectionId)) {
      return 1;
    }
    return 0.67;
  };

  return (
    <div 
      className="absolute flex flex-col items-start bg-[var(--background)]"
      style={{
        top: "calc(50% - 100px)",
        left: "0",
        width: "176px",
        maxHeight: "calc(100vh / 1.6 - 120px)",
        overflowY: "auto",
      }}
    >
      <div className="mt-8 flex flex-col w-full space-y-4">
        {MENU_SECTIONS.map((section) => (
          <MenuSection
            key={section.id}
            section={section}
            expanded={expanded[section.id]}
            onToggle={() => toggle(section.id)}
            getOpacity={getOpacity}
          />
        ))}
      </div>
    </div>
  );
}