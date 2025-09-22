import React from 'react';
import Skeleton, { SkeletonImage, SkeletonText } from '../ui/Skeleton';

export const HeroSectionSkeleton: React.FC = () => (
  <section className="pt-20 pb-10">
    <div className="container">
      <div className="flex lg:flex-nowrap flex-wrap items-center lg:justify-between justify-center gap-4">
        <div className="max-w-[410px] w-full">
          <Skeleton height={72} width="100%" className="mb-4" />
          <Skeleton height={24} width="80%" />
        </div>
        <div className="w-full max-w-[400px]">
          <Skeleton height={400} width="100%" rounded />
        </div>
      </div>
    </div>
  </section>
);

export const BrandsSliderSkeleton: React.FC = () => (
  <section className="py-28 overflow-hidden">
    <div className="container">
      <Skeleton height={32} width="60%" className="mx-auto mb-12" />
      <div className="flex gap-8 overflow-hidden">
        {Array.from({ length: 8 }, (_, index) => (
          <Skeleton
            key={index}
            width={120}
            height={60}
            className="flex-shrink-0"
          />
        ))}
      </div>
    </div>
  </section>
);

export const AdvantagesSectionSkeleton: React.FC = () => (
  <section className="pb-28">
    <div className="container">
      <Skeleton height={56} width="60%" className="mx-auto mb-4" />
      <Skeleton height={24} width="80%" className="mx-auto mb-20" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="text-center p-6">
            <Skeleton width={64} height={64} rounded className="mx-auto mb-4" />
            <Skeleton height={24} width="80%" className="mx-auto mb-3" />
            <SkeletonText lines={3} lastLineWidth="90%" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const DashboardSectionSkeleton: React.FC = () => (
  <section className="py-28">
    <div className="container">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        <SkeletonImage width={665} height={400} className="lg:-mr-[220px] -mb-[50%] lg:mb-0 max-w-[665px] w-full" />
        <SkeletonImage width={872} height={490} className="max-w-[872px] w-full" />
      </div>
    </div>
  </section>
);

export const TestimonialsSkeleton: React.FC = () => (
  <section className="pb-36">
    <div className="container">
      <Skeleton height={56} width="40%" className="mx-auto mb-4" />
      <Skeleton height={24} width="80%" className="mx-auto mb-12" />
      <div className="flex gap-6 overflow-hidden">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="flex-shrink-0 w-80 bg-white p-6 rounded-lg shadow-sm">
            <SkeletonText lines={4} lastLineWidth="70%" className="mb-4" />
            <div className="flex items-center gap-3">
              <Skeleton width={48} height={48} rounded />
              <div>
                <Skeleton height={20} width="120px" className="mb-1" />
                <Skeleton height={16} width="80px" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const PricingCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
    <Skeleton height={32} width="60%" className="mb-4" />
    <Skeleton height={48} width="40%" className="mb-6" />
    <SkeletonText lines={4} lastLineWidth="80%" className="mb-6" />
    <Skeleton height={48} width="100%" rounded className="mb-4" />
    <Skeleton height={16} width="70%" className="mx-auto" />
  </div>
);

export const PricingSectionSkeleton: React.FC = () => (
  <section className="py-28">
    <div className="container">
      <Skeleton height={56} width="50%" className="mx-auto mb-4" />
      <Skeleton height={24} width="80%" className="mx-auto mb-12" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }, (_, index) => (
          <PricingCardSkeleton key={index} />
        ))}
      </div>
    </div>
  </section>
);
