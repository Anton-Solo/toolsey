'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Lazy load ConsolidatingAnim component

const ConsolidatingAnim = dynamic(() => import("./ConsolidatingAnim").then(mod => ({ default: mod.ConsolidatingAnim })), {
  ssr: false
});

interface LazyConsolidatingAnimProps {
  className?: string;
  disableLazyLoading?: boolean; // For testing or when immediate loading is needed
}

export const LazyConsolidatingAnim = ({ className, disableLazyLoading = false }: LazyConsolidatingAnimProps) => {
  const [isVisible, setIsVisible] = useState(disableLazyLoading);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip intersection observer if lazy loading is disabled
    if (disableLazyLoading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px', // Start loading 200px before element comes into view for better UX
        threshold: 0.1
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible, disableLazyLoading]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div ref={ref} className={className}>
      {isVisible ? (
        <div onLoad={handleLoad}>
          <ConsolidatingAnim className={className} />
        </div>
      ) : (
        // Skeleton placeholder with same dimensions
        <div className="lg:-mr-[220px] -mb-[325px] lg:mb-0 max-w-[665px] h-[677px] flex items-center justify-center relative">
          <div className="animate-pulse">
            {/* Skeleton circles */}
            <div className="relative w-[400px] h-[400px]">
              <div className="absolute inset-0 border-2 border-gray-200 rounded-full"></div>
              <div className="absolute inset-8 border-2 border-gray-100 rounded-full"></div>
              
              {/* Skeleton icons */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-12 h-12 bg-gray-200 rounded-full"
                  style={{
                    top: `${50 + 35 * Math.cos((i * Math.PI * 2) / 8)}%`,
                    left: `${50 + 35 * Math.sin((i * Math.PI * 2) / 8)}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              ))}
            </div>
            
            {/* Loading spinner in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-[#0078AD] border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
