'use client';

import dynamic from 'next/dynamic';
import { LEAD_TEAM_BLOCK } from '@/constans/features';
import { ComponentType } from 'react';
import { SVGProps } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

type AnimationComponent = ComponentType<SVGProps<SVGSVGElement>>;

type AnimationModule = {
  default?: AnimationComponent;
  TeamManagementAnim?: AnimationComponent;
  ReportsAnim?: AnimationComponent;
  ArchiveAnim?: AnimationComponent;
  [key: string]: AnimationComponent | undefined;
};

const extractAnimationComponent = (mod: AnimationModule): AnimationComponent => {
  return (mod.default || mod.TeamManagementAnim || mod.ReportsAnim || mod.ArchiveAnim || mod) as AnimationComponent;
};

const FeaturesCard = dynamic(() => import('@/components/features/FeaturesCard'), { 
  ssr: false, 
  loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded" /> 
});

const animMap: Record<string, AnimationComponent> = {
  TeamManagementAnim: dynamic(() => import('@/components/features/TeamManagementAnim').then(extractAnimationComponent), { 
    ssr: false, 
    loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded" /> 
  }) as AnimationComponent,
  ReportsAnim: dynamic(() => import('@/components/features/ReportsAnim').then(extractAnimationComponent), { 
    ssr: false, 
    loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded" /> 
  }) as AnimationComponent,
  ArchiveAnim: dynamic(() => import('@/components/features/ArchiveAnim').then(extractAnimationComponent), { 
    ssr: false, 
    loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded" /> 
  }) as AnimationComponent,
};

export const LazyLeadTeamSection = () => {
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
            {LEAD_TEAM_BLOCK.map((card, index) => {
              let AnimComponent: AnimationComponent | null = null;

              if (typeof card.Anim === 'string') {
                AnimComponent = animMap[card.Anim as unknown as keyof typeof animMap] || null;
              }

              return (
                <FeaturesCard
                  {...card}
                  Anim={AnimComponent || undefined}
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
