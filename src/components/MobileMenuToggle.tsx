interface MobileMenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function MobileMenuToggle({ isOpen, onToggle }: MobileMenuToggleProps) {
  return (
    <button 
      className={`mobile-menu-toggle ${isOpen ? 'open' : ''}`}
      onClick={onToggle}
      aria-label="Toggle mobile menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
} 