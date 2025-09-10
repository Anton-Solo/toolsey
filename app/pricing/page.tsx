import { LazyPricingSection } from '@/components/pricing/LazyPricingSection';
import { CALENDLY_URL } from '@/constans';

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