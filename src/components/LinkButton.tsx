interface LinkButtonProps {
  href?: string;
  children: React.ReactNode;
}

// Without an href, renders as a non-clickable button (e.g. "Coming Soon").
export default function LinkButton({ href, children }: LinkButtonProps) {
  if (!href) {
    return <span className="link-button link-button-static">{children}</span>;
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="link-button">
      {children}
    </a>
  );
}
