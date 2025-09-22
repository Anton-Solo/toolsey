'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { LEAD_FEATURES_BLOCK } from '@/constans/features';
import { ComponentType } from 'react';
import { SVGProps } from 'react';
import { Skeleton } from '@/components/ui/Skeleton';
import FeaturesCard from './FeaturesCard';

// import LeadAgg from '@/components/features/LeadAgg';

type AnimationComponent = ComponentType<SVGProps<SVGSVGElement>>;

type AnimationModule = {
  default?: AnimationComponent;
  TrackAnim?: AnimationComponent;
  InstantLeadAnim?: AnimationComponent;
  [key: string]: AnimationComponent | undefined;
};

const extractAnimationComponent = (mod: AnimationModule): AnimationComponent => {
  return (mod.default || mod.TrackAnim || mod.InstantLeadAnim || mod) as AnimationComponent;
};

const animMap: Record<string, AnimationComponent> = {
  // LeadAgg: LeadAgg,
  TrackAnim: dynamic(() => import('@/components/features/TrackAnim').then(extractAnimationComponent), { 
    ssr: false, 
    loading: () => <Skeleton height={200} width="100%" rounded /> 
  }) as AnimationComponent,
  // InstantLeadAnim: dynamic(() => import('@/components/features/InstantLeadAnim').then(extractAnimationComponent), { 
  //   ssr: false, 
  //   loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded" /> 
  // }) as AnimationComponent,
};

export const LazyLeadFeaturesSection = () => {
  return (
    <section>
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
                <Image 
                  src={imageUrl} 
                  alt={card.title} 
                  width={624} 
                  height={408}
                  className="max-sm:w-full max-sm:h-full"
                  priority={index < 1} 
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
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
