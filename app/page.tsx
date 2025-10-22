import { BrandsSlider } from "@/components/home/BrandsSlider";
import { FormBlock } from "@/components/home/FormBlock";
import { TestimonialsSlider } from "@/components/home/TestimonialsSlider";
import { LazyDashboard } from "@/components/home/LazyDashboard";
import { IntegrationAnim } from "@/components/home/IntegrationAnim";
import { InfoCard } from "@/components/InfoCard";
import { LazyConsolidatingAnim } from "@/components/home/LazyConsolidatingAnim";
import { AnimatedAdvantagesSection } from "@/components/home/AnimatedAdvantagesSection";
import { AnimatedDashboardSection } from "@/components/home/AnimatedDashboardSection";
import { LazyLeadResponseSection } from "@/components/home/LazyLeadResponseSection";
import { LazyHowItWorksSection } from "@/components/home/LazyHowItWorksSection";
import Link from "next/link";
import { CALENDLY_URL } from "@/constans";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lead Management & Sales Tools for Contractors | Toolsey",
  description: "All-in-one lead management for contractors—aggregate leads, auto-assign, text customers, and close faster for $79/mo. See Toolsey in action; book a demo.",
};

export default function Home() {
  return (
    <main className="bg-primary-light">
      <section className="pt-20 pb-10">
        <div className="container">
          <div className="flex lg:flex-nowrap flex-wrap items-center lg:justify-between justify-center gap-4">
            <div className="max-w-[436px]">
              <h1 className="h1 mb-4">Sales team software for only $79/mo</h1>
              <p className="p-body-24 mb-6">Includes 5 Users so only $15/mo per User!</p>
              <p className="p-body-20">Powerful sales tools to win more deals.</p>
            </div>
            <FormBlock />
          </div>
        </div>
      </section> 

      <section className="py-28 overflow-hidden">
        <div className="container">
          <h4 className="text-foreground text-2xl mb-12 text-center">
            Trusted by <span className="font-medium">10,000+</span> Contactors and Home Service Pros
          </h4>
        </div>
        <BrandsSlider />
      </section>

      <section className="pb-28">
        <div className="container">
          <h2 className="h2 mb-4 text-center">Empower your team to sell more!</h2>
          <p className="p-body-20 mb-20 text-center max-w-[640px] mx-auto">
            Toolsey is an affordable, 
            yet powerful platform to drive more sales with tools 
            that are easy to use yet incredibly effective.
          </p>
          <AnimatedAdvantagesSection />
        </div>
      </section>

      <AnimatedDashboardSection />

      <LazyLeadResponseSection />

      <section className="mb-20">
        <div className="container">
          <h2 className="h2 mb-4 text-center max-w-[984px] mx-auto">Consolidating information is the key to efficiency and sanity!</h2>
          <p className="p-body-20 text-center max-w-[560px] mx-auto mb-20">Toolsey will aggregate and organize all of your lead sources and sales activity into one place.</p>
            
          <div className="flex flex-col lg:flex-row items-center justify-center">
            <LazyConsolidatingAnim className="lg:-mr-[220px] -mb-[50%] lg:mb-0 max-w-[665px] w-full"/>
            <LazyDashboard />
          </div>
        </div>
      </section>

      <LazyHowItWorksSection />

      <section className="mb-28">
        <div className="container">
            <InfoCard 
              isImage={true}
              title={"Yes, we know it's ridiculous starting at only $79/mo for 5 users"}
              text={"We make it up in volume, Toolsey is enjoyed by over 10,000+ contractors and home service pros."}
              btnText={"New customer offer"}
              btnHref='/pricing'
              extraTxt="No contracts required and flexible plans allows Toolsey to deliver the best deal to contractors and home service pros in the industry"
            />
        </div>
      </section>


      <section className="pb-36">
        <div className="container">
          <h2 className="h2 text-center mb-4">
            Testimonials
          </h2>
          <p className="p-body-20 text-center max-w-[638px] mx-auto mb-12">
            Give yourself an unfair advantage with a system built to win more jobs. Toolsey automation and assignment tools will drive speed to lead
          </p>
        </div>
        <TestimonialsSlider />
      </section>

      <section>
        <div className="container">
          <div className="flex items-center lg:flex-nowrap flex-wrap lg:justify-between justify-center linear-card w-full lg:h-[480px] relative rounded-[48px] lg:pl-16 pt-16 lg:pt-0 overflow-hidden">
              <div className="lg:px-0 px-4">
                <h2 className="h2 text-standart-white mb-4 max-w-[720px] lg:text-left text-center">
                  Integrations that power your business
                </h2>
                <p className="p-body-20 !text-standart-white max-w-[600px] lg:mx-0 lg:text-left text-center mx-auto">
                  Don’t see an integration you need? Reach out to us we often times add new ones for customers or already have it in the works. 
                </p>
                <div className="lg:block flex justify-center">
                  <a 
                    href={CALENDLY_URL} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-white my-6"
                  >
                      Let’s talk integrations
                  </a>
                </div>
              </div>
              <IntegrationAnim className="self-end"/>
          </div>
        </div>
      </section>

      <section className="py-28">
        <div className="container text-center">
          <h2 className="h2 mb-4">
            Ready to grow your business?
          </h2>
          <p className="p-body-20 mb-6">Start using Toolsey today and turn every lead into a customer.</p>
          <div className="flex items-center justify-center max-sm:flex-wrap gap-6 mb-4 text-[20px]">
            <Link href="/pricing" className="btn btn-primary max-sm:w-full">Explore pricing</Link>
            <a 
              href={CALENDLY_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary max-sm:w-full">
                Discovery call
            </a>
          </div>
          <p className="label">Simple setup. Instant results. No credit card required.</p>
        </div>
      </section>
    </main>
  );
}
