# James Swinehart Portfolio

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS 4.

## 🚀 Features

- **Responsive Design**: Optimized for both desktop and mobile devices
- **Smooth Animations**: Custom hamburger menu animation and smooth scrolling
- **Modern UI**: Clean, minimalist design with consistent typography
- **TypeScript**: Full type safety throughout the application
- **Performance**: Optimized with Next.js 15 features

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and responsive design
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Home page component
├── components/
│   ├── ContentBlocks/       # Content section components
│   │   ├── AboutContent.tsx # About section content
│   │   └── Section.tsx      # Reusable section wrapper
│   ├── AboutButton.tsx      # About button component
│   ├── ContentWindow.tsx    # Main content area with scroll detection
│   ├── Header.tsx           # Site header component
│   ├── MobileMenuOverlay.tsx # Full-screen mobile navigation
│   ├── MobileMenuToggle.tsx # Hamburger menu toggle
│   ├── Sidebar.tsx          # Desktop sidebar navigation
│   └── Wrapper.tsx          # Main layout wrapper with context
```

## 🎨 Design System

### Typography
- **Line Height**: 25px across all text elements
- **Letter Spacing**: -0.374px for consistent character spacing
- **Font Family**: Helvetica/Arial for UI, Georgia for content

### Colors
- **Background**: `#F5F5F7` (light gray)
- **Foreground**: `#1D1D1F` (dark gray)
- **Scrollbar**: Semi-transparent dark with hover states

### Breakpoints
- **Mobile**: Below 650px
- **Desktop**: 651px and above

## 🛠️ Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Linting
```bash
npm run lint
```

## 📱 Mobile Features

- **Hamburger Menu**: Custom animated toggle with X transformation
- **Full-Screen Navigation**: Overlay menu with smooth transitions
- **Responsive Layout**: Optimized spacing and typography for mobile
- **Touch-Friendly**: Large touch targets and smooth scrolling

## 🖥️ Desktop Features

- **Sidebar Navigation**: Expandable menu sections with smooth animations
- **Content Area**: Scrollable content with intersection observer
- **Gradient Overlays**: Subtle fade effects for visual hierarchy

## 🔧 Technical Details

### State Management
- **Context API**: `VisibleSectionsContext` for tracking visible content sections
- **Local State**: Component-level state for UI interactions

### Animations
- **CSS Transitions**: Smooth 0.3s ease transitions
- **Transform Animations**: Rotations and translations for menu toggles
- **Intersection Observer**: Scroll-based visibility detection

### Performance
- **Next.js 15**: Latest features for optimal performance
- **Tailwind CSS 4**: Modern CSS framework with JIT compilation
- **TypeScript**: Type safety and better developer experience

## 📝 Content Sections

The portfolio includes placeholder sections for:
- **About**: Personal introduction
- **CV**: Resume and experience
- **Projects**: Portfolio projects
- **LinkedIn**: Professional profile
- **Map**: Location-based content
- **Blog**: Articles and thoughts
- **Collaborators**: Team and partnerships
- **Press**: Media coverage

## 🎯 Future Enhancements

- [ ] Add actual content to placeholder sections
- [ ] Implement dark mode toggle
- [ ] Add contact form functionality
- [ ] Optimize images and assets
- [ ] Add analytics tracking
- [ ] Implement SEO optimizations

## 📄 License

This project is private and proprietary.
