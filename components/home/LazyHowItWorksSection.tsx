'use client';

import Image from 'next/image';
import { CALENDLY_URL, HOW_WORKS } from '@/constans';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Link from 'next/link';
import { VideoModal } from '../support/VideoModal';
import { useState } from 'react';

export const LazyHowItWorksSection = () => {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
    triggerOnce: true
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVideo, setModalVideo] = useState<{
    id: number;
    title: string;
    youtubeId: string;
    description: string;
  } | null>(null);

  const openAppVideoModal = () => {
    setModalVideo({
      id: 1,
      title: "Toolsey Mobile App Demo",
      youtubeId: "etRZSgaDfcs",
      description: "See how Toolsey mobile app works in action. Smart and easy to use — your sales team will be up and running in just a few minutes."
    });
    setIsModalOpen(true);
  };

  const openDesktopVideoModal = () => {
    setModalVideo({
      id: 2,
      title: "Toolsey Desktop Command Center Demo",
      youtubeId: "7yGApmXs37Q",
      description: "See how Toolsey desktop command center works. Powerful and easy to use — your admin's life just got a whole lot easier and more productive."
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalVideo(null);
  };

  return (
    <section 
      ref={ref}
      className={`mb-28 transition-all duration-700 relative z-50 ${
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
                <Link 
                  href="/features"
                  key={item} 
                  className="flex items-center justify-center h-[42px] rounded-xl px-4 bg-secondary-foreground p-body-16 font-medium hover:opacity-70 transition-opacity duration-300">
                  {item}
                </Link>)
              )}
              <Link href="/features" className="p-body-16 font-medium !text-primary hover:opacity-70 transition-opacity duration-300">...and much more!</Link>
            </div>
            <div className='flex flex-wrap items-center gap-4'>
              <a 
                href={CALENDLY_URL} 
                target="_blank" 
                rel="noopener noreferrer"  className="btn btn-primary">
                Learn more
              </a>
              <Link href="/pricing" className="btn btn-primary">See plans and pricing</Link>
            </div>
          </div>
          <div>
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
            <div className="flex items-center justify-center">
              <button 
                className="btn btn-primary mt-4"
                onClick={openAppVideoModal}
              >
                Watch app video
              </button>
            </div>
          </div>
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
                <Link 
                  href="/features"
                  key={item} 
                  className="flex items-center justify-center h-[42px] rounded-xl px-4 bg-secondary-foreground p-body-16 font-medium hover:opacity-70 transition-opacity duration-300">
                  {item}
                </Link>)
              )}
              <Link href="/features" className="p-body-16 font-medium !text-primary hover:opacity-70 transition-opacity duration-300">...and much more!</Link>
            </div>
            <div className='flex flex-wrap items-center gap-4'>
              <a 
                href={CALENDLY_URL} 
                target="_blank" 
                rel="noopener noreferrer"  className="btn btn-primary">
                Learn more
              </a>
              <Link href="/pricing" className="btn btn-primary">See plans and pricing</Link>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
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
            <div className="flex items-center justify-center">
              <button 
                className="btn btn-primary mt-4"
                onClick={openDesktopVideoModal}
              >
                Watch desktop video
              </button>
            </div>
          </div>
        </div>
      </div>

      {modalVideo && (
        <VideoModal
          isOpen={isModalOpen}
          onClose={closeModal}
          video={modalVideo}
        />
      )}
    </section>
  );
};
