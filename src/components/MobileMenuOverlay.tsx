import { useState } from 'react';

interface MobileMenuOverlayProps {
  isOpen: boolean;
  activeSection: string;
  onNavItemClick: (section: string) => void;
}

type MenuEntry =
  | { kind: 'section'; id: string; label: string }
  | { kind: 'group'; id: string; label: string; items: { id: string; label: string }[] }
  | { kind: 'external'; href: string; label: string };

const MENU: MenuEntry[] = [
  { kind: 'section', id: 'about', label: 'About' },
  {
    kind: 'group',
    id: 'projects',
    label: 'Projects',
    items: [
      { id: 'crestsocial', label: 'Crest Social' },
      { id: 'connectegories', label: 'Connectegories' },
      { id: 'sousspecs', label: 'SousSpecs' },
      { id: 'foodwastescore', label: 'The Food Waste Score' },
      { id: 'belicrawl', label: 'Beli Crawl' },
      { id: 'knowbody', label: 'KnowBody' },
      { id: 'avaline', label: 'Avaline' },
    ],
  },
  {
    kind: 'group',
    id: 'personal',
    label: 'Personal',
    items: [
      { id: 'writing', label: 'Writing' },
      { id: 'hungrytiger', label: 'The Hungry Tiger' },
      { id: 'art', label: 'Art' },
    ],
  },
  { kind: 'external', href: 'https://www.linkedin.com/in/jamesswinehart/', label: 'LinkedIn' },
  { kind: 'external', href: 'https://beliapp.co/app/jamesswinehart', label: 'Beli' },
];

// Every section the menu can scroll to, in page order.
export const NAV_SECTION_IDS = MENU.flatMap((entry) => {
  if (entry.kind === 'section') return [entry.id];
  if (entry.kind === 'group') return entry.items.map((item) => item.id);
  return [];
});

export default function MobileMenuOverlay({ isOpen, activeSection, onNavItemClick }: MobileMenuOverlayProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  };

  const sectionLink = (id: string, label: string) => (
    <a
      href={`#${id}`}
      className={id === activeSection ? 'active' : undefined}
      onClick={(e) => { e.preventDefault(); onNavItemClick(id); }}
    >
      {label}
    </a>
  );

  return (
    <div className={`mobile-menu-overlay ${isOpen ? 'open' : ''}`}>
      <ul className="mobile-menu">
        {MENU.map((entry) => {
          if (entry.kind === 'section') {
            return <li key={entry.id}>{sectionLink(entry.id, entry.label)}</li>;
          }

          if (entry.kind === 'external') {
            return (
              <li key={entry.label}>
                <a href={entry.href} target="_blank" rel="noopener noreferrer" className="external-link">
                  {entry.label}
                </a>
              </li>
            );
          }

          const containsActive = entry.items.some((item) => item.id === activeSection);

          return (
            <li key={entry.id} className={`has-submenu ${expandedGroups.has(entry.id) ? 'open' : ''}`}>
              <a
                href="#"
                className={containsActive ? 'active' : undefined}
                onClick={(e) => { e.preventDefault(); toggleGroup(entry.id); }}
              >
                {entry.label}
                <div className="submenu-toggle">
                  <span></span>
                  <span></span>
                </div>
              </a>
              <ul className="submenu">
                {entry.items.map((item) => (
                  <li key={item.id}>{sectionLink(item.id, item.label)}</li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
