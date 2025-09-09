'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import dynamic from 'next/dynamic';

const PricingSection = dynamic(() => import('./PricingSection').then(mod => ({ default: mod.PricingSection })), {
  loading: () => (
      <div className="container">
        <div className="text-center mb-16">
          <div className="animate-pulse bg-gray-200 h-16 w-64 mx-auto rounded mb-4"></div>
          <div className="animate-pulse bg-gray-200 h-6 w-96 mx-auto rounded"></div>
        </div>
        <div className="flex justify-center mb-12">
          <div className="animate-pulse bg-gray-200 h-12 w-80 rounded-xl"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="animate-pulse bg-gray-200 h-96 rounded-3xl"></div>
          ))}
        </div>
      </div>
  ),
  ssr: false
});

interface LazyPricingSectionProps {
  disableLazyLoading?: boolean;
}

export const LazyPricingSection = ({ disableLazyLoading = false }: LazyPricingSectionProps) => {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '200px',
    triggerOnce: true,
    // disabled: disableLazyLoading
  });

  return (
    <div 
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible || disableLazyLoading
          ? 'animate-fade-in-up opacity-100' 
          : 'opacity-0 translate-y-8'
      }`}
    >
      <PricingSection />
    </div>
  );
};
