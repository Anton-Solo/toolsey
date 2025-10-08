'use client';

// import { useState } from 'react';
// import { PricingPeriod } from '@/types/pricing.types';
import { PRICING_DATA } from '@/constans/pricing';
import { PricingCard } from './PricingCard';

export const PricingSection = () => {
  // const [period, setPeriod] = useState<PricingPeriod>('monthly');

  return (
    <section>
      <div className="container">
        {/* <PricingTabs
          period={period}
          onPeriodChange={setPeriod}
          yearlyDiscount={PRICING_DATA.yearlyDiscount}
        /> */}
        <p className="text-center text-foreground font-semibold text-xl mb-8">
          No contract required
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {PRICING_DATA.plans.map((plan) => (
            <div key={plan.id} className="flex justify-center">
              <PricingCard
                plan={plan}
                period="monthly"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
