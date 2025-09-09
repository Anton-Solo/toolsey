'use client';

import { PricingPeriod } from '@/types/pricing.types';

interface PricingTabsProps {
  period: PricingPeriod;
  onPeriodChange: (period: PricingPeriod) => void;
  yearlyDiscount: number;
}

export const PricingTabs = ({ period, onPeriodChange, yearlyDiscount }: PricingTabsProps) => {
  return (
    <div className="flex items-center justify-center mb-12">
      <div className="relative bg-secondary-foreground rounded-[100px] p-2 flex">
        
        <button
          onClick={() => onPeriodChange('monthly')}
          className={`px-4 py-[4px] font-bold transition-all duration-300 cursor-pointer rounded-[100px] ${
            period === 'monthly' ? 'text-standart-white bg-primary' : 'text-standart-black hover:text-foreground'
          }`}
        >
          Monthly
        </button>
        
        <button
          onClick={() => onPeriodChange('yearly')}
          className={`px-4 py-[4px] font-bold transition-all duration-300 cursor-pointer rounded-[100px] ${
            period === 'yearly' ? 'text-standart-white bg-primary' : 'text-standart-black hover:text-foreground'
          }`}
        >
          Yearly ({yearlyDiscount}% saving)
        </button>
      </div>
    </div>
  );
};
