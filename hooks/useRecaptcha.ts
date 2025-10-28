'use client';

import { useEffect, useCallback, useRef } from 'react';

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute(widgetId?: number): void;
      execute(siteKey: string, options: { action: string }): Promise<string>;
      render: (container: string | HTMLElement, parameters: {
        sitekey: string;
        callback: (token: string) => void;
        size?: 'invisible' | 'normal' | 'compact';
        badge?: 'bottomright' | 'bottomleft' | 'inline';
      }) => number;
      reset: (widgetId?: number) => void;
    };
  }
}

export const useRecaptcha = (containerId: string = 'recaptcha-container') => {
  const widgetIdRef = useRef<number | null>(null);
  const callbackRef = useRef<((token: string) => void) | null>(null);

  useEffect(() => {
    return () => {
      if (widgetIdRef.current !== null && window.grecaptcha) {
        try {
          window.grecaptcha.reset(widgetIdRef.current);
        } catch (e) {
          console.error('Error resetting recaptcha:', e);
        }
      }
    };
  }, []);

  const executeRecaptcha = useCallback(
    (callback: (token: string) => void): void => {
      if (!window.grecaptcha) {
        console.error('reCAPTCHA not loaded');
        return;
      }

      callbackRef.current = callback;

      window.grecaptcha.ready(() => {
        if (widgetIdRef.current === null) {
          const recaptchaContainer = document.getElementById(containerId);
          if (recaptchaContainer) {
            try {
              widgetIdRef.current = window.grecaptcha.render(recaptchaContainer, {
                sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
                callback: (token: string) => {
                  if (callbackRef.current) {
                    callbackRef.current(token);
                  }
                },
                size: 'invisible',
                badge: 'bottomright'
              });
            } catch (error) {
              console.error('Error creating reCAPTCHA widget:', error);
            }
          }
        }

        if (widgetIdRef.current !== null) {
          window.grecaptcha.execute(widgetIdRef.current);
        }
      });
    },
    [containerId]
  );

  const resetRecaptcha = useCallback(() => {
    if (widgetIdRef.current !== null && window.grecaptcha) {
      window.grecaptcha.reset(widgetIdRef.current);
    }
  }, []);

  return {
    executeRecaptcha,
    resetRecaptcha,
    siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  };
};

