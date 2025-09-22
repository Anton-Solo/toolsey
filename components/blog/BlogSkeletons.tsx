import React from 'react';
import Skeleton, { SkeletonImage, SkeletonText } from '../ui/Skeleton';


export const BlogPostSkeleton: React.FC = () => (
  <article className="bg-white rounded-lg shadow-sm overflow-hidden">
    <SkeletonImage width={400} height={250} className="w-full" />
    <div className="p-6">
      <div className="flex items-center gap-2 mb-3">
        <Skeleton width={80} height={20} rounded />
        <Skeleton width={60} height={16} rounded />
      </div>
      <Skeleton height={24} width="90%" className="mb-3" />
      <SkeletonText lines={3} lastLineWidth="70%" className="mb-4" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton width={32} height={32} rounded />
          <Skeleton width={100} height={16} />
        </div>
        <Skeleton width={80} height={16} />
      </div>
    </div>
  </article>
);

export const BlogListSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }, (_, index) => (
      <BlogPostSkeleton key={index} />
    ))}
  </div>
);

export const BlogFiltersSkeleton: React.FC = () => (
  <div className="flex flex-col sm:flex-row gap-4 mb-8">
    <Skeleton height={48} width="100%" className="sm:w-80" rounded />
    <Skeleton height={48} width="100%" className="sm:w-48" rounded />
    <Skeleton height={48} width="100%" className="sm:w-48" rounded />
  </div>
);

export const BlogPaginationSkeleton: React.FC = () => (
  <div className="flex justify-center items-center gap-2 mt-8">
    <Skeleton width={40} height={40} rounded />
    <Skeleton width={40} height={40} rounded />
    <Skeleton width={40} height={40} rounded />
    <Skeleton width={40} height={40} rounded />
    <Skeleton width={40} height={40} rounded />
  </div>
);
