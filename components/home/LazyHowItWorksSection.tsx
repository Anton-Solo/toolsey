'use client';

import Image from 'next/image';
import { HOW_WORKS } from '@/constans';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export const LazyHowItWorksSection = () => {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
    triggerOnce: true
  });

  return (
    <section 
      ref={ref}
      className={`mb-28 transition-all duration-700 ${
        isVisible 
          ? 'animate-fade-in-up opacity-100' 
          : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="container">
        <h2 className="h2 mb-4 text-center">See how Toolsey works in action</h2>
        <p className="p-body-20 mb-20 text-center max-w-[510px] mx-auto">
          Give yourself an unfair advantage with a system built to win more jobs. 
          Toolsey automation and assignment tools will drive speed to lead
        </p>
        <div className="flex flex-wrap lg:flex-nowrap lg:justify-between justify-center gap-8">
          <div className="max-w-[640px]">
            <h3 className="p-body-24 font-bold mb-6">
              Toolsey Mobile App: a thing of beauty
            </h3>
            <p className="p-body-20">Smart and easy to use — your sales team will be up and running in just a few minutes and instantly fall in love.</p>
            <div className="flex items-center flex-wrap gap-4 my-6">
              {HOW_WORKS.mobile_app.map(item => (
                <div 
                  key={item} 
                  className="flex items-center justify-center h-[42px] rounded-xl px-4 bg-secondary-foreground p-body-16 font-medium">
                  {item}
                </div>)
              )}
              <span className="p-body-16 font-medium !text-primary">...and much more!</span>
            </div>
            <button className="btn btn-primary">Get start free</button>
          </div>
          <Image
            src="/images/mobile-app.png"
            alt="mobile app"
            width={640}
            height={360}
            className="max-h-[360px]"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        </div>

        <div className="flex flex-wrap lg:flex-nowrap lg:justify-between justify-center gap-8 my-20">
          <div className="max-w-[640px]">
            <h3 className="p-body-24 font-bold mb-6">
              Your Command Center for All Sales Activity
            </h3>
            <p className="p-body-20">
              Powerful and easy to use — your admin&apos;s life just got a whole lot easier and more productive.
            </p>
            <div className="flex items-center flex-wrap gap-4 my-6">
              {HOW_WORKS.command_center.map(item => (
                <div 
                  key={item} 
                  className="flex items-center justify-center h-[42px] rounded-xl px-4 bg-secondary-foreground p-body-16 font-medium">
                  {item}
                </div>)
              )}
              <span className="p-body-16 font-medium !text-primary">...and much more!</span>
            </div>
            <button className="btn btn-primary">Get start free</button>
          </div>
          <Image
            src="/images/command-center.png"
            alt="command center"
            width={640}
            height={360}
            className="max-h-[360px]"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        </div>
      </div>
    </section>
  );
};
