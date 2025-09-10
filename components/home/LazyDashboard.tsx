'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
// import dynamic from 'next/dynamic';
import Image from 'next/image';

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
      className={`transition-all duration-700 max-w-[872px] w-full ${
        isVisible 
          ? 'animate-fade-in-up opacity-100' 
          : 'opacity-0 translate-y-8'
      }`}
    >
      {/* <Dashboard className="relative z-10 h-max w-full"/> */}
      <Image src="/images/dashboard.png" alt="dashboard" width={872} height={490} />
    </div>
  );
};
