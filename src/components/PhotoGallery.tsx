"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface PhotoGalleryItem {
  id: number;
  title: string;
  image: any; // StaticImageData from Next.js
}

interface PhotoGalleryProps {
  items: PhotoGalleryItem[];
  imageWidth?: number;
  imageHeight?: number;
}

export default function PhotoGallery({ 
  items, 
  imageWidth = 200, 
  imageHeight = 250 
}: PhotoGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [enlargedImageIndex, setEnlargedImageIndex] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll event listener to track which photo is visible
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth;
      const containerWidth = container.clientWidth;
      
      // Check if we're at the very beginning or end
      if (scrollLeft <= 10) {
        setActiveIndex(0);
        return;
      }
      
      if (scrollLeft >= scrollWidth - containerWidth - 10) {
        setActiveIndex(itemRefs.current.length - 1);
        return;
      }
      
      // Normal center-based detection for middle items
      let closestIndex = 0;
      let closestDistance = Infinity;
      
      itemRefs.current.forEach((item, index) => {
        if (item) {
          const itemRect = item.getBoundingClientRect();
          const itemCenter = itemRect.left + itemRect.width / 2;
          const distance = Math.abs(itemCenter - containerCenter);
          
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        }
      });
      
      setActiveIndex(closestIndex);
    };

    // Initial check
    handleScroll();
    
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);


  // Click handler for dots
  const handleDotClick = (index: number) => {
    const item = itemRefs.current[index];
    if (item && containerRef.current) {
      item.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
      setActiveIndex(index);
    }
  };

  // Handle image click
  const handleImageClick = (index: number) => {
    setEnlargedImageIndex(index);
  };

  // Close lightbox
  const closeLightbox = () => {
    setIsClosing(true);
    setTimeout(() => {
      setEnlargedImageIndex(null);
      setIsClosing(false);
    }, 300); // Match the CSS animation duration
  };

  // ESC to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="photo-gallery">
      <div className="photo-gallery-container" ref={containerRef}>
        {items.map((item, index) => (
          <div 
            key={item.id} 
            className="photo-gallery-item"
            ref={(el) => (itemRefs.current[index] = el)}
            onClick={() => handleImageClick(index)}
          >
            <Image
              src={item.image}
              alt={item.title}
              width={imageWidth}
              height={imageHeight}
              style={{ objectFit: 'cover', cursor: 'pointer' }}
            />
          </div>
        ))}
      </div>
      <div className="photo-gallery-indicators">
        {items.map((_, index) => (
          <div 
            key={index} 
            className={`gallery-dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>

      {/* Clean Lightbox - Rendered as Portal */}
      {enlargedImageIndex !== null && typeof window !== 'undefined' && createPortal(
        <div className={`lightbox ${isClosing ? 'lightbox-closing' : ''}`} onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              <span></span>
              <span></span>
            </button>
            <Image
              src={items[enlargedImageIndex].image}
              alt={items[enlargedImageIndex].title}
              width={1200}
              height={800}
              style={{ 
                objectFit: 'contain',
                maxWidth: '90vw',
                maxHeight: '90vh',
                width: 'auto',
                height: 'auto'
              }}
            />
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
