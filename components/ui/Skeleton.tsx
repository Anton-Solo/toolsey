import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
  animate?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  width,
  height,
  rounded = false,
  animate = true
}) => {
  const baseClasses = 'bg-gray-200';
  const animateClasses = animate ? 'animate-pulse' : '';
  const roundedClasses = rounded ? 'rounded' : '';
  
  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={`${baseClasses} ${animateClasses} ${roundedClasses} ${className}`}
      style={style}
      aria-label="Loading..."
    />
  );
};

export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`p-4 border border-gray-200 rounded-lg ${className}`}>
    <Skeleton height={20} width="60%" className="mb-2" />
    <Skeleton height={16} width="100%" className="mb-2" />
    <Skeleton height={16} width="80%" className="mb-4" />
    <Skeleton height={40} width="100%" rounded />
  </div>
);

export const SkeletonText: React.FC<{ 
  lines?: number; 
  className?: string;
  lastLineWidth?: string;
}> = ({ lines = 3, className = '', lastLineWidth = '60%' }) => (
  <div className={className}>
    {Array.from({ length: lines }, (_, index) => (
      <Skeleton
        key={index}
        height={16}
        width={index === lines - 1 ? lastLineWidth : '100%'}
        className="mb-2"
      />
    ))}
  </div>
);

export const SkeletonImage: React.FC<{ 
  width?: number; 
  height?: number; 
  className?: string;
}> = ({ width = 300, height = 200, className = '' }) => (
  <Skeleton
    width={width}
    height={height}
    rounded
    className={className}
  />
);

export const SkeletonButton: React.FC<{ 
  width?: string; 
  height?: string; 
  className?: string;
}> = ({ width = '120px', height = '40px', className = '' }) => (
  <Skeleton
    width={width}
    height={height}
    rounded
    className={className}
  />
);

export const SkeletonAvatar: React.FC<{ 
  size?: number; 
  className?: string;
}> = ({ size = 40, className = '' }) => (
  <Skeleton
    width={size}
    height={size}
    rounded
    className={`rounded-full ${className}`}
  />
);

export default Skeleton;
