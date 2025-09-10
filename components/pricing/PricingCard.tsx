'use client';

import { PRO_TOOLSEY_URL } from '@/constans';
import { PricingPlan, PricingPeriod } from '@/types/pricing.types';

interface PricingCardProps {
  plan: PricingPlan;
  period: PricingPeriod;
}

export const PricingCard = ({ plan, period }: PricingCardProps) => {
  const currentPrice = plan.price[period];

  return (
    <div className="relative w-full max-w-[416px] p-6 md:p-8 rounded-3xl bg-standart-white transition-all duration-200 border border-transparent hover:shadow-lg hover:border-primary">
      {plan.isPopular && (
        <div className="absolute right-0 top-0 bg-[#FF640A] text-standart-white px-4 py-2 rounded-tr-3xl rounded-bl-3xl text-sm font-bold">
          {plan.description}
        </div>
      )}

      <h3 className="p-body-24 font-medium text-center text-foreground mb-2">{plan.name}</h3>

      <div className="mb-6">
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-2xl text-accent-dark">
            {plan.currency}
          </span>
          <span className="h2 font-bold text-standart-black">{currentPrice}</span>
          <span className="text-standart-black font-bold">/{plan.period}</span>
        </div>
      </div>

      <a
        href={PRO_TOOLSEY_URL}
        className="btn btn-primary w-full mb-8"
      >
        {plan.ctaText}
      </a>

      <ul className="space-y-3 mb-8">
        {plan.features.map((feature) => (
          <li key={feature.id} className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 mt-0.5">
              {feature.included ? (
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <span className={`text-sm ${feature.included ? 'text-foreground' : 'text-accent-dark'}`}>
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      {plan.additionalInfo && (
        <p className="text-xs text-accent-dark mt-3 text-center">
          {plan.additionalInfo}
        </p>
      )}
    </div>
  );
};
