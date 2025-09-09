export interface PricingFeature {
  id: string;
  text: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  description?: string;
  price: {
    monthly: number;
    yearly: number;
  };
  currency: string;
  period: string;
  isPopular?: boolean;
  features: PricingFeature[];
  ctaText: string;
  ctaHref: string;
  additionalInfo?: string;
}

export type PricingPeriod = 'monthly' | 'yearly';

export interface PricingData {
  plans: PricingPlan[];
  yearlyDiscount: number; // percentage
}
