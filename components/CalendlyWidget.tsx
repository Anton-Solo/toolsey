'use client';

import { useEffect, useRef } from 'react';
import { useCalendly } from '@/hooks/useCalendly';

interface CalendlyWidgetProps {
  url: string;
  prefill?: {
    name?: string;
    email?: string;
    phone?: string;
    customAnswers?: Record<string, string>;
  };
  utm?: {
    utmCampaign?: string;
    utmSource?: string;
    utmMedium?: string;
    utmContent?: string;
    utmTerm?: string;
  };
  height?: string;
  className?: string;
}

export const CalendlyWidget = ({ 
  url, 
  prefill, 
  utm, 
  height = '630px',
  className = '' 
}: CalendlyWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { createInlineWidget } = useCalendly();

  useEffect(() => {
    if (containerRef.current) {
      const options = {
        url,
        prefill,
        utm
      };
      
      // Clear previous widget content
      containerRef.current.innerHTML = '';
      
      // Create new inline widget
      createInlineWidget(containerRef.current, options);
    }
  }, [url, prefill, utm, createInlineWidget]);

  return (
    <div 
      ref={containerRef}
      className={`calendly-inline-widget ${className}`}
      style={{ 
        minWidth: '320px', 
        height: height,
        width: '100%'
      }}
    />
  );
};

// Example usage component for Discovery Call
export const DiscoveryCallWidget = ({ 
  name, 
  email, 
  phone 
}: { 
  name?: string; 
  email?: string; 
  phone?: string; 
}) => {
  return (
    <CalendlyWidget
      url="https://calendly.com/d/cwvy-bn4-8wr/toolsey-discovery-call"
      prefill={{
        name,
        email,
        phone
      }}
      utm={{
        utmSource: 'toolsey_website',
        utmMedium: 'inline_widget',
        utmCampaign: 'discovery_call',
        utmContent: 'homepage_widget'
      }}
      className="rounded-lg shadow-lg"
    />
  );
};
