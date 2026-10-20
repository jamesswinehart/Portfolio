import { useState } from 'react';
import { useVisibleSections } from './Wrapper';

interface MobileMenuOverlayProps {
  isOpen: boolean;
  onNavItemClick: (section: string) => void;
}

type MenuEntry =
  | { kind: 'section'; id: string; label: string }
  | { kind: 'group'; id: string; label: string; items: { id: string; label: string }[] }
  | { kind: 'external'; href: string; label: string };

const MENU: MenuEntry[] = [
  { kind: 'section', id: 'about', label: 'About' },
  { kind: 'section', id: 'projects', label: 'Projects' },
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

export default function MobileMenuOverlay({ isOpen, onNavItemClick }: MobileMenuOverlayProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const { visibleSections } = useVisibleSections();

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
      onClick={(e) => { e.preventDefault(); onNavItemClick(id); }}
      style={{ opacity: visibleSections.has(id) ? 1 : 0.67 }}
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
                <a href={entry.href} target="_blank" rel="noopener noreferrer">
                  {entry.label} <span className="external-arrow" aria-hidden="true">↗</span>
                </a>
              </li>
            );
          }

          return (
            <li key={entry.id} className={`has-submenu ${expandedGroups.has(entry.id) ? 'open' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); toggleGroup(entry.id); }}>
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
