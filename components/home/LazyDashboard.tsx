'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import dynamic from 'next/dynamic';
// import Image from 'next/image';

// const Dashboard = dynamic(() => import('./DashboardAnim').then(mod => ({ default: mod.Dashboard })), {
//   loading: () => (
//     <div className="relative z-10 max-w-[872px] h-max flex items-center justify-center min-h-[400px]">
//       <div className="animate-spin rounded-full relative z-10 max-h-[495px] w-full h-max border-b-2 border-primary"></div>
//     </div>
//   ),
//   ssr: false
// });

export const LazyDashboard = () => {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
    triggerOnce: true
  });

  return (
    <div 
      ref={ref}
      className={`relative transition-all duration-700 max-w-[872px] w-full ${
        isVisible 
          ? 'animate-fade-in-up opacity-100' 
          : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="absolute -left-[1px] z-10 h-full w-2 bg-primary-light"></div>
      <div className="absolute -right-[1px] z-10 h-full w-[2px] bg-primary-light"></div>
      <div className="absolute -top-[1px] z-10 h-2 w-full bg-primary-light"></div>
      <div className="absolute -bottom-[1px] z-10 h-2 w-full bg-primary-light"></div>
      <video src="/video/anim.mp4" className="w-full h-auto pointer-events-none" autoPlay loop muted playsInline />
      {/* <Dashboard className="relative z-10 h-max w-full"/> */}
      {/* <Image 
        src="/images/dashboard.png" 
        alt="Toolsey dashboard interface showing lead management features" 
        width={872} 
        height={490}
        className="w-full h-auto"
        loading="lazy"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 872px"
      /> */}
    </div>
  );
};
