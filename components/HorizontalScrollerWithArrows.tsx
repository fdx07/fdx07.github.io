
import React, { useRef, useState, useEffect, useCallback } from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon.tsx';
import ChevronRightIcon from './icons/ChevronRightIcon.tsx';

interface HorizontalScrollerWithArrowsProps {
  children: React.ReactNode;
}

const HorizontalScrollerWithArrows: React.FC<HorizontalScrollerWithArrowsProps> = ({ children }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = useCallback(() => {
    const el = scrollContainerRef.current;
    if (el) {
      const currentScrollLeft = el.scrollLeft;
      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      
      setCanScrollLeft(currentScrollLeft > 5); // Add a small threshold to avoid floating point issues
      // Use a small tolerance to handle fractional pixel values or slight rendering inconsistencies
      setCanScrollRight(currentScrollLeft < maxScrollLeft - 5); // Add a small threshold
    }
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      checkScrollability(); 

      const handleScroll = () => checkScrollability();
      el.addEventListener('scroll', handleScroll, { passive: true });
      
      const resizeObserver = new ResizeObserver(checkScrollability);
      resizeObserver.observe(el);
      
      // Check scrollability when children change, as this affects scrollWidth
      // This is a common pattern when content is dynamic (e.g. list items loading)
      const mutationObserver = new MutationObserver(checkScrollability);
      mutationObserver.observe(el, { childList: true, subtree: true });


      return () => {
        el.removeEventListener('scroll', handleScroll);
        resizeObserver.unobserve(el);
        resizeObserver.disconnect();
        mutationObserver.disconnect();
      };
    }
  }, [checkScrollability, children]);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const childElements = Array.from(container.children) as HTMLElement[];
    if (childElements.length === 0) return;

    let targetElement: HTMLElement | undefined;
    const sL = container.scrollLeft;
    const cW = container.clientWidth;

    if (direction === 'right') {
      // Find the first child that is partially visible on the right edge
      targetElement = childElements.find(
        (child) => child.offsetLeft < sL + cW && child.offsetLeft + child.clientWidth > sL + cW + 5 // +5 threshold
      );
      // If no child is partially visible on the right, find the first child fully off-screen to the right
      if (!targetElement) {
        targetElement = childElements.find((child) => child.offsetLeft >= sL + cW - 5); // -5 threshold
      }
    } else { // direction === 'left'
      // Find the first child (from right to left) that is partially visible on the left edge
      targetElement = [...childElements].reverse().find(
        (child) => child.offsetLeft < sL - 5 && child.offsetLeft + child.clientWidth > sL -5 // -5 threshold
      );
      // If no child is partially visible on the left, find the rightmost child fully off-screen to the left
      if (!targetElement) {
        targetElement = [...childElements].reverse().find(
          (child) => child.offsetLeft + child.clientWidth <= sL + 5 // +5 threshold
        );
      }
    }

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  };

  return (
    <div className="relative group">
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4 scrollbar-hide"
      >
        {children}
      </div>

      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-background-800/70 hover:bg-background-800/90 text-brand-core rounded-full shadow-md transform transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-brand-core"
          aria-label="Scroll left"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-background-800/70 hover:bg-background-800/90 text-brand-core rounded-full shadow-md transform transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-brand-core"
          aria-label="Scroll right"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default HorizontalScrollerWithArrows;