'use client';

import { AdvantageCard } from "@/components/home/AdvantageCard";
import { ADVANTAGES } from "@/constans";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const AnimatedAdvantagesSection = () => {
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation();

  const getAnimationClass = (index: number) => {
    if (!cardsVisible) return 'cards-hidden';
    
    const delayClasses = [
      'animate-fade-in-up',
      'animate-fade-in-up-delay-1',
      'animate-fade-in-up-delay-2',
      'animate-fade-in-up-delay-3',
      'animate-fade-in-up-delay-4',
      'animate-fade-in-up-delay-5'
    ];
    
    return delayClasses[index] || 'animate-fade-in-up';
  };

  return (
    <div 
      ref={cardsRef}
      className="flex lg:justify-start justify-center flex-wrap gap-x-8 gap-y-12"
    >
      {ADVANTAGES.map((advantage, index) => (
        <div
          key={advantage.id}
          className={'opacity-0 ' + getAnimationClass(index)}
        >
          <AdvantageCard {...advantage} />
        </div>
      ))}
    </div>
  );
};
