'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { MAIN_FEATURES_BLOCK } from '@/constans/features';
import { ComponentType } from 'react';
import { SVGProps } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

type AnimationComponent = ComponentType<SVGProps<SVGSVGElement>>;

type AnimationModule = {
  default?: AnimationComponent;
  ProReports?: AnimationComponent;
  CreateFormAnim?: AnimationComponent;
  MessagingAnim?: AnimationComponent;
  [key: string]: AnimationComponent | undefined;
};

const extractAnimationComponent = (mod: AnimationModule): AnimationComponent => {
  return (mod.default || mod.ProReports || mod.CreateFormAnim || mod.MessagingAnim || mod) as AnimationComponent;
};

const animMap: Record<string, AnimationComponent> = {
  ProReports: dynamic(() => import('@/components/features/ProReportsAnim').then(extractAnimationComponent), { 
    ssr: false, 
    loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded" /> 
  }) as AnimationComponent,
  CreateFormAnim: dynamic(() => import('@/components/features/CreateFormAnim').then(extractAnimationComponent), { 
    ssr: false, 
    loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded" /> 
  }) as AnimationComponent,
  MessagingAnim: dynamic(() => import('@/components/features/MessagingAnim').then(extractAnimationComponent), { 
    ssr: false, 
    loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded" /> 
  }) as AnimationComponent,
};

export const LazyMainFeaturesSection = () => {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
    triggerOnce: true
  });

  return (
    <section 
      ref={ref}
      className={`py-[60px] transition-all duration-700 ${
        isVisible 
          ? 'animate-fade-in-up opacity-100' 
          : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="container">
        <div className="flex flex-wrap gap-x-8 lg:gap-y-16 justify-between">
          {MAIN_FEATURES_BLOCK.map(({ id, title, subtitle, description, whyItMatters, Anim }, index) => {
            let AnimComponent: AnimationComponent | null = null;
            let imageUrl: string | null = null;
          
            if (typeof Anim === 'string') {
              if (Anim.startsWith('/images/') || Anim.endsWith('.png') || Anim.endsWith('.jpg')) {
                imageUrl = Anim;
              } else {
                AnimComponent = animMap[Anim as unknown as keyof typeof animMap] || null;
              }
            }

            return (
              <div key={id} className="flex lg:flex-col flex-col-reverse items-center gap-4 max-w-[624px] max-lg:py-14">
                {AnimComponent ? (
                  <AnimComponent className="max-sm:w-full max-sm:h-full" /> 
                ) : imageUrl ? (
                  <Image src={imageUrl} alt={title} width={624} height={408} />
                ) : null}
                <div>
                  <p className="p-body-16 font-medium !text-primary mb-2">{title}</p>
                  <h3 className="p-body-24 font-bold mb-4">{subtitle}</h3>
                  <p className="p-body-20 mb-4">{description}</p>
                  <p className="p-body-20"><span className="font-bold">Why It Matters:</span> {whyItMatters}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
