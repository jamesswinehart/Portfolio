"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { StaticImageData } from "next/image";

interface PhotoGalleryItem {
  id: number;
  title: string;
  image?: StaticImageData | string;
  videoUrl?: string;
  source?: string;
  url?: string;
}

interface PhotoGalleryProps {
  items: PhotoGalleryItem[];
  imageWidth?: number;
  imageHeight?: number;
  className?: string;
  showCaptions?: boolean;
}

export default function PhotoGallery({ 
  items, 
  imageWidth = 300, 
  imageHeight = 400,
  className = '',
  showCaptions = false
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
    const item = items[index];
    // If item has a URL, navigate to it instead of opening lightbox
    if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else {
      setEnlargedImageIndex(index);
    }
  };

  // Close lightbox
  const closeLightbox = () => {
    setIsClosing(true);
    setTimeout(() => {
      setEnlargedImageIndex(null);
      setIsClosing(false);
    }, 300);
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
    <div className={`photo-gallery ${className}`}>
      <div className="photo-gallery-container" ref={containerRef}>
        {items.map((item, index) => (
          <div 
            key={item.id} 
            className={`photo-gallery-item ${item.url ? 'photo-gallery-item-clickable' : ''}`}
            ref={(el) => { itemRefs.current[index] = el; }}
            onClick={() => item.image && handleImageClick(index)}
          >
            {item.videoUrl ? (
              <div className="gallery-video-container">
                <iframe
                  src={item.videoUrl}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={item.title}
                />
              </div>
            ) : item.image ? (
              <Image
                src={item.image}
                alt={item.title}
                width={imageWidth}
                height={imageHeight}
                className={`gallery-image ${item.url ? 'gallery-image-clickable' : ''}`}
              />
            ) : null}
            {showCaptions && (item.title || item.source) && (
              <div className="gallery-item-caption">
                {item.url ? (
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="gallery-item-title"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item.title}
                  </a>
                ) : (
                  <div className="gallery-item-title">{item.title}</div>
                )}
                {item.source && (
                  <div className="gallery-item-source">{item.source}</div>
                )}
              </div>
            )}
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
      {enlargedImageIndex !== null && typeof window !== 'undefined' && items[enlargedImageIndex].image && createPortal(
        <div className={`lightbox ${isClosing ? 'lightbox-closing' : ''}`} onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              <span></span>
              <span></span>
            </button>
            <Image
              src={items[enlargedImageIndex].image!}
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
