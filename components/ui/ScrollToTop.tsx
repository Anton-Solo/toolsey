'use client';

import { useState, useEffect } from 'react';

interface ScrollToTopProps {
    showAfter?: number; 
    className?: string;
}

export const ScrollToTop = ({ showAfter = 300, className = "" }: ScrollToTopProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > showAfter) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, [showAfter]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`
                fixed bottom-[100px] right-7 z-50
                w-12 h-12 
                bg-primary text-white
                rounded-full shadow-lg
                flex items-center justify-center
                transition-all duration-300 ease-in-out
                hover:bg-primary/90 hover:scale-110
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}
                ${className}
            `}
            aria-label="Scroll to top"
        >
            <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 10l7-7m0 0l7 7m-7-7v18" 
                />
            </svg>
        </button>
    );
};
