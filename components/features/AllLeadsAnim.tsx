'use client';

import Lottie from 'lottie-react';
import animationData from '@/public/animations/all-leads.json';

interface AllLeadsAnimProps {
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

const AllLeadsAnim = ({ 
  className = '', 
  loop = true, 
  autoplay = true 
}: AllLeadsAnimProps) => {
  return (
    <div className={`relative ${className}`}>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/bg-lead.png)' }}
      />
      <div className="relative z-10">
        <Lottie
          animationData={animationData}
          loop={loop}
          autoplay={autoplay}
          className="h-full w-full"
        />
      </div>
    </div>
  );
};

export default AllLeadsAnim;
