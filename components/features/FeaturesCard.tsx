import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const FeaturesCard = ({ id, title, subtitle, description, whyItMatters, Anim, index }: { id: number, title: string; subtitle: string; description: string; whyItMatters: string; Anim?: React.ComponentType<React.SVGProps<SVGSVGElement>> | React.ReactNode, index:number }) => {
    const { ref, isVisible } = useScrollAnimation({
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
        triggerOnce: true
    });

    return (
        <div 
            ref={ref}
            key={id} 
            className={`flex items-center lg:justify-between justify-center gap-4 lg:py-[60px] py-14 ${index % 2 !== 0 ? 'lg:flex-row-reverse flex-row' : 'flex-row' } lg:flex-nowrap flex-wrap transition-all duration-700 ${
                isVisible 
                    ? 'animate-slide-up opacity-100' 
                    : 'opacity-0 translate-y-8'
            }`}
        >
            <div className="max-w-[608px] shrink-1">
                <p className="p-body-16 font-medium !text-primary mb-2">{title}</p>
                <h3 className="p-body-24 font-bold mb-4">{subtitle}</h3>
                <p className="p-body-20 mb-4">{description}</p>
                <p className="p-body-20"><span className="font-bold">Why It Matters:</span> {whyItMatters}</p>
            </div>
            {Anim && (
                React.isValidElement(Anim) ? 
                    Anim : 
                    typeof Anim === 'function' ? 
                        <Anim className="max-sm:w-full max-sm:h-full"/> : 
                        null
            )}
        </div>
    )
}

export default FeaturesCard;