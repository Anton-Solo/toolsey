'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const SideMenuAnim = dynamic(() => import('@/components/features/SidemenuAnim'), { 
  ssr: false, 
  loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded" /> 
});

export const LazyLeadMappingSection = () => {
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
        <div className="flex gap-8 lg:flex-row flex-col justify-between lg:items-center overflow-hidden linear-card py-16 lg:pl-16 pl-4 rounded-4xl">
          <div className="max-w-[584px] ">
            <p className="p-body-16 font-medium !text-standart-white mb-2">Lead Mapping</p>
            <h3 className="p-body-24 font-bold !text-standart-white mb-4">Visualize Your Leads. Maximize Your Reach.</h3>
            <p className="p-body-20 !text-standart-white mb-4">
              View all your leads on an interactive, color-coded map. Filter by status, product, rep, or date to identify clusters, optimize routes, and plan smarter campaigns.
            </p>
            <p className="p-body-20 !text-standart-white mb-8">
              <span className="font-bold">Why It Matters:</span> Reduce drive time. Target high-opportunity areas. Make your sales and marketing geographically strategic.
            </p>
            <button className="btn btn-white">Get started</button>
          </div>

          <div className="flex items-center lg:self-auto self-end shrink-1">
            <SideMenuAnim className="-mr-[115px] relative z-10" />
            <Image
              src="/images/mapleads.png"
              alt="Map Leads"
              width={440}
              height={328}
              className="-mr-2 lg:h-[308px] grow-0 max-sm:shrink-1 max-sm:w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
