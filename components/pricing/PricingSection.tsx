'use client';

import { useState } from 'react';
import { PricingPeriod } from '@/types/pricing.types';
import { PRICING_DATA } from '@/constans/pricing';
import { PricingTabs } from './PricingTabs';
import { PricingCard } from './PricingCard';

export const PricingSection = () => {
  const [period, setPeriod] = useState<PricingPeriod>('monthly');

  return (
    <section>
      <div className="container">
        <PricingTabs
          period={period}
          onPeriodChange={setPeriod}
          yearlyDiscount={PRICING_DATA.yearlyDiscount}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {PRICING_DATA.plans.map((plan) => (
            <div key={plan.id} className="flex justify-center">
              <PricingCard
                plan={plan}
                period={period}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
