import { useState } from 'react';

interface MobileMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onAboutClick: () => void;
  onNavItemClick: (section: string) => void;
}

interface MenuSection {
  id: string;
  label: string;
  items: { id: string; label: string }[];
}

const MENU_SECTIONS: MenuSection[] = [
  {
    id: 'everything',
    label: 'Everything',
    items: [
      { id: 'cv', label: 'CV' },
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

export default function MobileMenuOverlay({ 
  isOpen, 
  onClose, 
  onAboutClick,
  onNavItemClick 
}: MobileMenuOverlayProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const handleNavClick = (section: string) => {
    onNavItemClick(section);
    onClose();
  };

  return (
    <div className={`mobile-menu-overlay ${isOpen ? 'open' : ''}`}>
      <ul className="mobile-menu">
        <li>
          <a href="#" onClick={(e) => { e.preventDefault(); onAboutClick(); }}>
            About
          </a>
        </li>
        
        {MENU_SECTIONS.map((section) => (
          <li key={section.id} className={`has-submenu ${expandedSections.has(section.id) ? 'open' : ''}`}>
            <a href="#" onClick={(e) => { e.preventDefault(); toggleSection(section.id); }}>
              {section.label}
              <div className="submenu-toggle">
                <span></span>
                <span></span>
              </div>
            </a>
            
            <ul className="submenu">
              {section.items.map((item) => (
                <li key={item.id}>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
} 