'use client';

import { useEffect, useCallback } from 'react';

interface CalendlyOptions {
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
}

export const useCalendly = () => {
  // Load Calendly script
  useEffect(() => {
    if (typeof window !== 'undefined' && !document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = () => {
        console.log('Calendly script loaded');
      };
      document.head.appendChild(script);
    }
  }, []);

  const openPopup = useCallback((options: CalendlyOptions) => {
    if (typeof window !== 'undefined' && (window as any).Calendly) {
      const { url, prefill = {}, utm = {} } = options;
      
      // Build URL parameters
      const params = new URLSearchParams();
      
      if (prefill.name) params.set('name', prefill.name);
      if (prefill.email) params.set('email', prefill.email);
      if (prefill.phone) params.set('a1', prefill.phone); // Custom field for phone
      
      // Add UTM parameters
      if (utm.utmCampaign) params.set('utm_campaign', utm.utmCampaign);
      if (utm.utmSource) params.set('utm_source', utm.utmSource);
      if (utm.utmMedium) params.set('utm_medium', utm.utmMedium);
      if (utm.utmContent) params.set('utm_content', utm.utmContent);
      if (utm.utmTerm) params.set('utm_term', utm.utmTerm);

      // Add custom answers
      if (prefill.customAnswers) {
        Object.entries(prefill.customAnswers).forEach(([key, value], index) => {
          params.set(`a${index + 2}`, value); // a1 is reserved for phone
        });
      }

      const fullUrl = params.toString() ? `${url}?${params.toString()}` : url;

      (window as any).Calendly.initPopupWidget({
        url: fullUrl
      });
    } else {
      console.warn('Calendly widget not loaded, falling back to direct link');
      openDirectLink(options);
    }
  }, []);

  const openDirectLink = useCallback((options: CalendlyOptions) => {
    const { url, prefill = {}, utm = {} } = options;
    
    const params = new URLSearchParams();
    
    if (prefill.name) params.set('name', prefill.name);
    if (prefill.email) params.set('email', prefill.email);
    if (prefill.phone) params.set('a1', prefill.phone);
    
    // Add UTM parameters
    if (utm.utmCampaign) params.set('utm_campaign', utm.utmCampaign);
    if (utm.utmSource) params.set('utm_source', utm.utmSource);
    if (utm.utmMedium) params.set('utm_medium', utm.utmMedium);
    if (utm.utmContent) params.set('utm_content', utm.utmContent);
    if (utm.utmTerm) params.set('utm_term', utm.utmTerm);

    // Add custom answers
    if (prefill.customAnswers) {
      Object.entries(prefill.customAnswers).forEach(([key, value], index) => {
        params.set(`a${index + 2}`, value);
      });
    }

    const fullUrl = params.toString() ? `${url}?${params.toString()}` : url;
    window.open(fullUrl, '_blank');
  }, []);

  const createInlineWidget = useCallback((containerElement: HTMLElement, options: CalendlyOptions) => {
    if (typeof window !== 'undefined' && (window as any).Calendly) {
      const { url, prefill = {}, utm = {} } = options;
      
      const params = new URLSearchParams();
      
      if (prefill.name) params.set('name', prefill.name);
      if (prefill.email) params.set('email', prefill.email);
      if (prefill.phone) params.set('a1', prefill.phone);
      
      // Add UTM parameters
      if (utm.utmCampaign) params.set('utm_campaign', utm.utmCampaign);
      if (utm.utmSource) params.set('utm_source', utm.utmSource);
      if (utm.utmMedium) params.set('utm_medium', utm.utmMedium);
      if (utm.utmContent) params.set('utm_content', utm.utmContent);
      if (utm.utmTerm) params.set('utm_term', utm.utmTerm);

      // Add custom answers
      if (prefill.customAnswers) {
        Object.entries(prefill.customAnswers).forEach(([key, value], index) => {
          params.set(`a${index + 2}`, value);
        });
      }

      const fullUrl = params.toString() ? `${url}?${params.toString()}` : url;

      (window as any).Calendly.initInlineWidget({
        url: fullUrl,
        parentElement: containerElement
      });
    }
  }, []);

  return {
    openPopup,
    openDirectLink,
    createInlineWidget
  };
};
