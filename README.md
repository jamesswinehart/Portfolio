# James Swinehart Portfolio

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Features a beautiful Apple-inspired design with smooth animations and a golden ratio layout.

## Features

- **Golden Ratio Layout**: Desktop version uses a perfectly proportioned golden ratio wrapper
- **Responsive Design**: Full-screen mobile experience with hamburger navigation
- **Apple-Style Animations**: Smooth entrance animations and transitions
- **Interactive Navigation**: Expandable sidebar with smooth scrolling
- **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS 4

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: CSS transitions with Apple-style cubic-bezier curves

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Main stylesheet with responsive design
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── components/
│   ├── ContentBlocks/       # Content section components
│   │   ├── AboutContent.tsx
│   │   └── Section.tsx
│   ├── AboutButton.tsx      # About button component
│   ├── ContentWindow.tsx    # Main content area
│   ├── Header.tsx           # Header component
│   ├── MobileMenuOverlay.tsx # Mobile navigation overlay
│   ├── MobileMenuToggle.tsx # Hamburger menu toggle
│   ├── Sidebar.tsx          # Desktop sidebar navigation
│   └── Wrapper.tsx          # Main wrapper with context
```

## Design System

### Colors
- **Background**: `#F5F5F7` (Apple-style white)
- **Foreground**: `#1D1D1F` (Apple-style grey for text)

### Typography
- **Font Family**: Helvetica, Georgia, Arial, sans-serif
- **Line Height**: 25px
- **Letter Spacing**: -0.374px

### Breakpoints
- **Mobile**: `max-width: 650px`
- **Desktop**: `min-width: 651px`

### Animations
- **Entrance**: Apple-style fade-in with upward movement
- **Transitions**: `cubic-bezier(0.4, 0, 0.2, 1)` for smooth interactions

## Adding Content

### Content Sections
Add new content sections in `src/components/ContentWindow.tsx`:

```tsx
<section id="your-section">
  <h2>Your Section Title</h2>
  <p>Your content here...</p>
</section>
```

### Navigation Items
Update the sidebar navigation in `src/components/Sidebar.tsx` to include new sections.

### Mobile Menu
Update the mobile menu in `src/components/MobileMenuOverlay.tsx` to include new navigation items.

## Deployment

The project is ready for deployment on Vercel, Netlify, or any other Next.js-compatible platform.

## License

This project is private and proprietary.

## Contact

James Swinehart - jamesswine@gmail.com
