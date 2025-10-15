import { PricingData } from '@/types/pricing.types';

export const PRICING_DATA: PricingData = {
  yearlyDiscount: 20,
  plans: [
    {
      id: 'lite',
      name: 'Lite',
      price: {
        monthly: 0,
        yearly: 0,
      },
      currency: '$',
      period: 'mo',
      features: [
        { id: 'users-1', text: '1 User', included: true },
        { id: 'integrations-1', text: '1 Integration access', included: true },
        { id: 'reports', text: 'Inspection Report', included: true },
      ],
      ctaText: 'Try today',
      ctaHref: '/signup?plan=lite',
    },
    {
      id: 'basic',
      name: 'Basic',
      price: {
        monthly: 79,
        yearly: 79,
      },
      currency: '$',
      period: 'mo',
      features: [
        { id: 'users-5', text: '5 Users included ($20 per additional user/mo)', included: true },
        { id: 'integrations-unlimited', text: 'Unlimited Integrations (35+ integrations available)', included: true },
        { id: 'reports', text: 'Inspection Report', included: true },
        { id: 'assignment', text: 'Lead Assignment Automation (optional)', included: true },
        { id: 'mapping', text: 'Lead Mapping', included: true },
        { id: 'tracking', text: 'Lead Tracking', included: true },
        { id: 'communication', text: 'Automated Email and Text Communication', included: true },
        { id: 'photos', text: 'Photo Management', included: true },
        { id: 'lead-reports', text: 'Lead Reports', included: true },
        { id: 'support', text: 'Live Support', included: true },
        { id: 'training', text: 'Zoom Training', included: true },
      ],
      ctaText: 'Try today',
      ctaHref: '/signup?plan=basic',
    },
    {
      id: 'premium',
      name: 'Premium',
      isPopular: true,
      description: 'MOST POPULAR',
      price: {
        monthly: 129,
        yearly: 129,
      },
      currency: '$',
      period: 'mo',
      features: [
        { id: 'everything-basic', text: 'Everything in Basic Plus', included: true },
        { id: 'users-10', text: '10 Users included', included: true },
        { id: 'forms', text: 'Digital forms', included: true },
        { id: 'enrichment', text: 'Lead enrichment reports (lead details)', included: true },
        { id: 'estimating', text: 'Project estimating module', included: true },
        { id: 'insurance', text: 'Insurance profit checker', included: true },
        { id: 'custom-forms', text: 'Custom form builder support (3 hours included)', included: true },
      ],
      ctaText: 'Try today',
      ctaHref: '/signup?plan=premium',
    },
  ],
};
