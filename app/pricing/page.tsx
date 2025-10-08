import { LazyPricingSection } from '@/components/pricing/LazyPricingSection';
import { CALENDLY_URL } from '@/constans';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing—Lead Management Software for Contractors | Toolsey",
  description: "Simple, transparent pricing for Toolsey lead management. Pick a plan, scale your team, and start closing more jobs—no long contracts. Book a discovery call.",
};

export default function Pricing() {
    return (
        <main className='bg-primary-light pb-[120px] pt-[72px]'>
            <section>
                <div className="container">
                    <h1 className="h2 font-bold mb-8 text-center">Pricing</h1>
                </div>
            </section>

            <LazyPricingSection />

            <section className='pt-16'>
                <div className="container">
                    <div className="flex items-center justify-center">
                        <a 
                        href={CALENDLY_URL} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-primary mx-auto block">
                            Schedule your Discovery Call!
                        </a>
                    </div>
                </div>
            </section>
        </main>
    )
};