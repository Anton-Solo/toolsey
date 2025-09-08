'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { LEAD_FEATURES_BLOCK } from '@/constans/features';
import { ComponentType } from 'react';
import { SVGProps } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

type AnimationComponent = ComponentType<SVGProps<SVGSVGElement>>;

type AnimationModule = {
  default?: AnimationComponent;
  LeadAgg?: AnimationComponent;
  TrackAnim?: AnimationComponent;
  InstantLeadAnim?: AnimationComponent;
  [key: string]: AnimationComponent | undefined;
};

const extractAnimationComponent = (mod: AnimationModule): AnimationComponent => {
  return (mod.default || mod.LeadAgg || mod.TrackAnim || mod.InstantLeadAnim || mod) as AnimationComponent;
};

const FeaturesCard = dynamic(() => import('@/components/features/FeaturesCard'), { 
  ssr: false, 
  loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded" /> 
});

const animMap: Record<string, AnimationComponent> = {
  LeadAgg: dynamic(() => import('@/components/features/LeadAgg').then(extractAnimationComponent), { 
    ssr: false, 
    loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded" /> 
  }) as AnimationComponent,
  TrackAnim: dynamic(() => import('@/components/features/TrackAnim').then(extractAnimationComponent), { 
    ssr: false, 
    loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded" /> 
  }) as AnimationComponent,
  InstantLeadAnim: dynamic(() => import('@/components/features/InstantLeadAnim').then(extractAnimationComponent), { 
    ssr: false, 
    loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded" /> 
  }) as AnimationComponent,
};

export const LazyLeadFeaturesSection = () => {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
    triggerOnce: true
  });

  return (
    <section 
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible 
          ? 'animate-fade-in-up opacity-100' 
          : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="container">
        <section>
          <div className="container">
            {LEAD_FEATURES_BLOCK.map((card, index) => {
              let AnimComponent: AnimationComponent | null = null;
              let imageUrl: string | null = null;

              if (typeof card.Anim === 'string') {
                if (card.Anim.startsWith('/images/') || card.Anim.endsWith('.png') || card.Anim.endsWith('.jpg')) {
                  imageUrl = card.Anim;
                } else {
                  AnimComponent = animMap[card.Anim as unknown as keyof typeof animMap] || null;
                }
              }

              const animContent = AnimComponent ? (
                <AnimComponent className="max-sm:w-full max-sm:h-full" />
              ) : imageUrl ? (
                <Image src={imageUrl} alt={card.title} width={624} height={408} />
              ) : null;

              return (
                <FeaturesCard
                  {...card}
                  Anim={animContent}
                  key={card.id}
                  index={index}
                />
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
};
