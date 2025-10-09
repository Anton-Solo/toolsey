'use client';

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { CALENDLY_URL } from '@/constans';

export const LazyTextingSection = () => {
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
          <div className="max-w-[584px] lg:pr-0 pr-4">
            <p className="text-3xl font-medium !text-standart-white mb-2">2-Way Texting</p>
            <h3 className="p-body-24 font-bold !text-standart-white mb-4">Text Like a Pro. Right Inside Toolsey.</h3>
            <p className="p-body-20 !text-standart-white mb-4">
              Send and receive texts directly in Toolsey. Use your company&apos;s local number, manage conversations in a global inbox or per lead, and keep every message archived.
            </p>
            <p className="p-body-20 !text-standart-white mb-8">
              <span className="font-bold">Why It Matters:</span> Texting is today&apos;s preferred channel. Stay fast, responsive, and organized—without jumping between platforms.
            </p>
            <a 
              href={CALENDLY_URL} 
              target="_blank" 
              rel="noopener noreferrer"  
              className="btn btn-white"
            >
              Get started
            </a>
          </div>

          <div className="flex items-center lg:self-auto self-end shrink-1">
            <Image
              src="/images/text-like.png"
              alt="Texting UI"
              width={545}
              height={308}
              className="-mr-2 lg:h-[308px] grow-0 max-sm:shrink-1 max-sm:w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
