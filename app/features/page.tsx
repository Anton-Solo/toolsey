import { FeaturesCard } from "@/components/features/FeaturesCard";
import { SideMenuAnim } from "@/components/features/SidemenuAnim";
import { LEAD_FEATURES_BLOCK, LEAD_TEAM_BLOCK, MAIN_FEATURES_BLOCK } from "@/constans/features";
import Image from "next/image";

export default function Features() {
    return (
        <main className="bg-primary-light">
            <section className="pt-[120px] pb-[60px]">
                <div className="container">
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="h2 font-bold mb-4">
                            Toolsey Features
                        </h1>
                        <p className="p-body-20 max-w-[638px] mx-auto text-center mb-8 text-accent">
                            Built for home service pros. Powered by automation. Designed to close more jobs.
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <div className="container">
                    {LEAD_FEATURES_BLOCK.map((card, index) => (
                        <FeaturesCard {...card} key={card.id} index={index}/>
                    ))}
                </div>
            </section>

            <section className="py-[60px]">
                <div className="container">
                    <div className="flex gap-8 lg:flex-row flex-col justify-between lg:items-center overflow-hidden linear-card py-16 lg:pl-16 pl-4 rounded-4xl">
                        <div className="max-w-[584px] ">
                            <p className="p-body-16 font-medium !text-standart-white mb-2">Lead Mapping</p>
                            <h3 className="p-body-24 font-bold !text-standart-white mb-4">Visualize Your Leads. Maximize Your Reach.</h3>
                            <p className="p-body-20 !text-standart-white mb-4">View all your leads on an interactive, color-coded map. Filter by status, product, rep, or date to identify clusters, optimize routes, and plan smarter campaigns.</p>
                            <p className="p-body-20 !text-standart-white mb-8"><span className="font-bold">Why It Matters:</span> Reduce drive time. Target high-opportunity areas. Make your sales and marketing geographically strategic.</p>
                            <button className="btn btn-white">Get started</button>
                        </div>
                        <div className="flex items-center lg:self-auto self-end shrink-1">
                            <SideMenuAnim className="-mr-[115px] relative z-10"/>
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

            <section className="py-[60px]">
                <div className="container">
                    <div className="flex flex-wrap gap-8 justify-between">
                        {MAIN_FEATURES_BLOCK.map(({ id, title, subtitle, description, whyItMatters, Anim }, index) => (
                            <div key={id} className="flex lg:flex-col flex-col-reverse items-center gap-4 max-w-[624px]">
                                <Anim className="max-sm:w-full max-sm:h-full"/>
                                <div className="">
                                    <p className="p-body-16 font-medium !text-primary mb-2">{title}</p>
                                    <h3 className="p-body-24 font-bold mb-4">{subtitle}</h3>
                                    <p className="p-body-20 mb-4">{description}</p>
                                    <p className="p-body-20"><span className="font-bold">Why It Matters:</span> {whyItMatters}</p>
                                </div>
                                
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-[60px]">
                <div className="container">
                    <div className="flex gap-8 lg:flex-row flex-col justify-between lg:items-center overflow-hidden linear-card py-16 lg:pl-16 pl-4 rounded-4xl">
                        <div className="max-w-[584px] lg:pr-0 pr-4">
                            <p className="p-body-16 font-medium !text-standart-white mb-2">2-Way Texting</p>
                            <h3 className="p-body-24 font-bold !text-standart-white mb-4">Text Like a Pro. Right Inside Toolsey.</h3>
                            <p className="p-body-20 !text-standart-white mb-4">Send and receive texts directly in Toolsey. Use your company’s local number, manage conversations in a global inbox or per lead, and keep every message archived.</p>
                            <p className="p-body-20 !text-standart-white mb-8"><span className="font-bold">Why It Matters:</span> exting is today’s preferred channel. Stay fast, responsive, and organized—without jumping between platforms.</p>
                            <button className="btn btn-white">Get started</button>
                        </div>
                        <div className="flex items-center lg:self-auto self-end shrink-1">
                            <Image 
                                src="/images/text-like.png"
                                alt="Map Leads"
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
                    {LEAD_TEAM_BLOCK.map((card, index) => (
                        <FeaturesCard {...card} key={card.id} index={index}/>
                    ))}
                </div>
            </section>

            <section className="py-28">
                <div className="container text-center">
                <h2 className="h2 mb-4">
                    Ready to grow your business?
                </h2>
                <p className="p-body-20 mb-6">Start using Toolsey today and turn every lead into a customer.</p>
                <div className="flex items-center justify-center gap-6 mb-4 text-[20px]">
                    <button className="btn btn-primary">Learn more</button>
                    <button className="btn btn-primary">See plans and pricing</button>
                </div>
                <p className="label">Simple setup. Instant results. No credit card required.</p>
                </div>
            </section>
        </main>
    )
}