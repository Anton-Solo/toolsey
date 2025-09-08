'use client';

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export const LazyLeadResponseSection = () => {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
    triggerOnce: true
  });

  return (
    <section 
      ref={ref}
      className={`bg-primary pt-24 mb-28 overflow-hidden transition-all duration-700 ${
        isVisible 
          ? 'animate-fade-in-up opacity-100' 
          : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="container">
        <h2 className="h2 text-standart-white text-center mx-auto mb-4">
          Lead response times
        </h2>
        <p className="p-body-20 !text-standart-white max-w-[648] mx-auto text-center mb-16">
          Speed to lead is everything when it comes to winning more deals. Toolsey was built to give you an unfair advantage! 
        </p>
        <div className="flex lg:flex-row flex-col justify-center lg:gap-8 relative">
          <div className="lg:mb-[100px] -mb-[80px] lg:block flex items-center justify-center flex-col">
            <div className="relative w-[554px] h-[296px] lg:-mb-[150px] -mb-[55px] animate-gentle-float">
              <Image
                src="/icons/elipse78.svg"
                alt="elipse 78"
                width={554}
                height={296}
                className="absolute top-0 left-0 w-full h-full z-10"
                loading="lazy"
              />
              <p className="absolute top-1/2 left-[70px] -translate-y-1/2 font-bold text-[20px] tracking-sm max-w-[352px] text-standart-white">
                <span className="text-[40px] tracking-normal opacity-80">78%</span> of customers pick the first company to respond
              </p>
            </div>
            <div className="relative w-[505px] h-[393px] animate-gentle-float-more">
              <Image
                src="/icons/elipse87.svg"
                alt="elipse 87"
                width={505}
                height={393}
                className="absolute top-0 left-0 w-full h-full z-10"
                loading="lazy"
              />
              <p className="absolute top-1/2 left-[70px] -translate-y-1/2 font-bold text-[20px] tracking-sm max-w-[352px] text-standart-white">
                <span className="text-[40px] tracking-normal opacity-80">87%</span> higher contact rate with automated routing
              </p>
            </div>
          </div>
          <div className="absolute z-20 bottom-0 left-1/2 -translate-x-1/2 w-[536px] h-[536px]">
            <Image
              src="/images/lead.png"
              alt="lead response times"
              width={536}
              height={536}
              className="max-w-full h-full"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
          </div>
          <div className="lg:block flex items-center justify-center flex-col max-lg:mb-[500px]">
            <div className="relative w-[554px] h-[296px] lg:-mb-[80px] -mb-[60px] animate-gentle-float">
              <Image
                src="/icons/elipse391.svg"
                alt="elipse 391"
                width={578}
                height={251}
                className="absolute top-0 left-0 w-full h-full z-10"
                loading="lazy"
              />
              <p className="absolute top-[40%] right-[70px] -translate-y-1/2 font-bold text-[20px] tracking-sm max-w-[352px] text-standart-white">
                <span className="text-[40px] tracking-normal opacity-80">391%</span> higher conversion if you respond within one minute
              </p>
            </div>
            <div className="relative w-[529px] h-[324px] animate-gentle-float-more">
              <Image
                src="/icons/elipse7.svg"
                alt="elipse 7"
                width={529}
                height={324}
                className="absolute top-0 left-0 w-full h-full z-10"
                loading="lazy"
              />
              <p className="absolute top-1/2 right-[10px] -translate-y-1/2 font-bold text-[20px] tracking-sm max-w-[352px] text-standart-white">
                <span className="text-[40px] tracking-normal opacity-80">Only 7%</span> of the companies reply within 5 minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
