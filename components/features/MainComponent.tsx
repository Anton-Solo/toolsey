'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { LEAD_FEATURES_BLOCK, LEAD_TEAM_BLOCK, MAIN_FEATURES_BLOCK } from '@/constans/features';
import { ComponentType } from 'react';

// Define proper types for animation components
import { SVGProps } from 'react';

type AnimationComponent = ComponentType<SVGProps<SVGSVGElement>>;

// Type for animation modules that can export components in different ways
type AnimationModule = {
  default?: AnimationComponent;
  LeafAgg?: AnimationComponent;
  TrackAnim?: AnimationComponent;
  InstantLeadAnim?: AnimationComponent;
  ProReports?: AnimationComponent;
  TeamManagementAnim?: AnimationComponent;
  ReportsAnim?: AnimationComponent;
  ArchiveAnim?: AnimationComponent;
  CreateFormAnim?: AnimationComponent;
  MessagingAnim?: AnimationComponent;
  [key: string]: AnimationComponent | undefined;
};

// Helper function to safely extract animation component from module
const extractAnimationComponent = (mod: AnimationModule): AnimationComponent => {
  return (mod.default || mod.LeafAgg || mod.TrackAnim || mod.InstantLeadAnim || 
         mod.ProReports || mod.TeamManagementAnim || mod.ReportsAnim || 
         mod.ArchiveAnim || mod.CreateFormAnim || mod.MessagingAnim || mod) as AnimationComponent;
};

// lazy-load heavy UI components (client-only)
const FeaturesCard = dynamic(() => import('@/components/features/FeaturesCard'), { ssr: false });
const SideMenuAnim = dynamic(() => import('@/components/features/SidemenuAnim'), { ssr: false });

// map string keys to dynamic anim components (robust to default / named exports)
const animMap: Record<string, AnimationComponent> = {
  LeadAgg: dynamic(() => import('@/components/features/LeadAgg').then(extractAnimationComponent), { ssr: false }) as AnimationComponent,
  TrackAnim: dynamic(() => import('@/components/features/TrackAnim').then(extractAnimationComponent), { ssr: false }) as AnimationComponent,
  InstantLeadAnim: dynamic(() => import('@/components/features/InstantLeadAnim').then(extractAnimationComponent), { ssr: false }) as AnimationComponent,
  ProReports: dynamic(() => import('@/components/features/ProReportsAnim').then(extractAnimationComponent), { ssr: false }) as AnimationComponent,
  TeamManagementAnim: dynamic(() => import('@/components/features/TeamManagementAnim').then(extractAnimationComponent), { ssr: false }) as AnimationComponent,
  ReportsAnim: dynamic(() => import('@/components/features/ReportsAnim').then(extractAnimationComponent), { ssr: false }) as AnimationComponent,
  ArchiveAnim: dynamic(() => import('@/components/features/ArchiveAnim').then(extractAnimationComponent), { ssr: false }) as AnimationComponent,
  CreateFormAnim: dynamic(() => import('@/components/features/CreateFormAnim').then(extractAnimationComponent), { ssr: false }) as AnimationComponent,
  MessagingAnim: dynamic(() => import('@/components/features/MessagingAnim').then(extractAnimationComponent), { ssr: false }) as AnimationComponent,
};

export const MainComponent = () => {
  return (
    <>
        <section className="pt-[120px] pb-[60px]">
        <div className="container">
          <div className="flex flex-col items-center justify-center">
            <h1 className="h2 font-bold mb-4">Toolsey Features</h1>
            <p className="p-body-20 max-w-[638px] mx-auto text-center mb-8 text-accent">
              Built for home service pros. Powered by automation. Designed to close more jobs.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <section>
            <div className="container">
              {LEAD_FEATURES_BLOCK.map((card, index) => {
                // resolve Anim -> dynamic component (so FeaturesCard always receives a component or undefined)
                let AnimComponent: AnimationComponent | null = null;

                if (typeof card.Anim === 'string') {
                  AnimComponent = animMap[card.Anim as unknown as keyof typeof animMap] || null;
                }

                return (
                  <FeaturesCard
                    {...card}
                    Anim={AnimComponent || undefined}
                    key={card.id}
                    index={index}
                  />
                );
              })}
            </div>
          </section>
        </div>
      </section>

      <section className="py-[60px]">
        <div className="container">
          <div className="flex gap-8 lg:flex-row flex-col justify-between lg:items-center overflow-hidden linear-card py-16 lg:pl-16 pl-4 rounded-4xl">
            <div className="max-w-[584px] ">
              <p className="p-body-16 font-medium !text-standart-white mb-2">Lead Mapping</p>
              <h3 className="p-body-24 font-bold !text-standart-white mb-4">Visualize Your Leads. Maximize Your Reach.</h3>
              <p className="p-body-20 !text-standart-white mb-4">
                View all your leads on an interactive, color-coded map. Filter by status, product, rep, or date to identify clusters, optimize routes, and plan smarter campaigns.
              </p>
              <p className="p-body-20 !text-standart-white mb-8">
                <span className="font-bold">Why It Matters:</span> Reduce drive time. Target high-opportunity areas. Make your sales and marketing geographically strategic.
              </p>
              <button className="btn btn-white">Get started</button>
            </div>

            <div className="flex items-center lg:self-auto self-end shrink-1">
              <SideMenuAnim className="-mr-[115px] relative z-10" />
              <Image
                src="/images/mapleads.png"
                alt="Map Leads"
                width={440}
                height={328}
                className="-mr-2 lg:h-[308px] grow-0 max-sm:shrink-1 max-sm:w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <section>
            <div className="container">
              {LEAD_TEAM_BLOCK.map((card, index) => {
                // resolve Anim -> dynamic component (so FeaturesCard always receives a component or undefined)
                let AnimComponent: AnimationComponent | null = null;

                if (typeof card.Anim === 'string') {
                  AnimComponent = animMap[card.Anim as unknown as keyof typeof animMap] || null;
                }

                return (
                  <FeaturesCard
                    {...card}
                    Anim={AnimComponent || undefined}
                    key={card.id}
                    index={index}
                  />
                );
              })}
            </div>
          </section>
        </div>
      </section>

      <section className="py-[60px]">
        <div className="container">
          <div className="flex flex-wrap gap-8 justify-between">
            {MAIN_FEATURES_BLOCK.map(({ id, title, subtitle, description, whyItMatters, Anim }, index) => {
              let AnimComponent: AnimationComponent | null = null;

              if (typeof Anim === 'string') {
                AnimComponent = animMap[Anim as unknown as keyof typeof animMap] || null;
              }

              return (
                <div key={id} className="flex lg:flex-col flex-col-reverse items-center gap-4 max-w-[624px]">
                  {AnimComponent ? <AnimComponent className="max-sm:w-full max-sm:h-full" /> : null}
                  <div>
                    <p className="p-body-16 font-medium !text-primary mb-2">{title}</p>
                    <h3 className="p-body-24 font-bold mb-4">{subtitle}</h3>
                    <p className="p-body-20 mb-4">{description}</p>
                    <p className="p-body-20"><span className="font-bold">Why It Matters:</span> {whyItMatters}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-[60px]">
        <div className="container">
          <div className="flex gap-8 lg:flex-row flex-col justify-between lg:items-center overflow-hidden linear-card py-16 lg:pl-16 pl-4 rounded-4xl">
            <div className="max-w-[584px] lg:pr-0 pr-4">
              <p className="p-body-16 font-medium !text-standart-white mb-2">2-Way Texting</p>
              <h3 className="p-body-24 font-bold !text-standart-white mb-4">Text Like a Pro. Right Inside Toolsey.</h3>
              <p className="p-body-20 !text-standart-white mb-4">
                Send and receive texts directly in Toolsey. Use your company&apos;s local number, manage conversations in a global inbox or per lead, and keep every message archived.
              </p>
              <p className="p-body-20 !text-standart-white mb-8">
                <span className="font-bold">Why It Matters:</span> Texting is today&apos;s preferred channel. Stay fast, responsive, and organized—without jumping between platforms.
              </p>
              <button className="btn btn-white">Get started</button>
            </div>

            <div className="flex items-center lg:self-auto self-end shrink-1">
              <Image
                src="/images/text-like.png"
                alt="Texting UI"
                width={545}
                height={308}
                className="-mr-2 lg:h-[308px] grow-0 max-sm:shrink-1 max-sm:w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <section>
            <div className="container">
              {LEAD_TEAM_BLOCK.map((card, index) => {
                // resolve Anim -> dynamic component (so FeaturesCard always receives a component or undefined)
                let AnimComponent: AnimationComponent | null = null;

                if (typeof card.Anim === 'string') {
                  AnimComponent = animMap[card.Anim as unknown as keyof typeof animMap] || null;
                }

                return (
                  <FeaturesCard
                    {...card}
                    Anim={AnimComponent || undefined}
                    key={card.id}
                    index={index}
                  />
                );
              })}
            </div>
          </section>
        </div>
      </section>

      <section className="py-28">
        <div className="container text-center">
          <h2 className="h2 mb-4">Ready to grow your business?</h2>
          <p className="p-body-20 mb-6">Start using Toolsey today and turn every lead into a customer.</p>
          <div className="flex items-center justify-center gap-6 mb-4 text-[20px]">
            <button className="btn btn-primary">Learn more</button>
            <button className="btn btn-primary">See plans and pricing</button>
          </div>
          <p className="label">Simple setup. Instant results. No credit card required.</p>
        </div>
      </section>
    </>
  )
}