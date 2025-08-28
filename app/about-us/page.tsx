import { MailIcon } from "@/components/icons/about/MailIcon";
import { MarkerIcon } from "@/components/icons/about/MarkerIcon";
import { PhoneIcon } from "@/components/icons/about/PhoneIcon";
import { InfoCard } from "@/components/InfoCard";
import { NUMBERS } from "@/constans/about";
import Image from "next/image";

export default function AboutUs() {
    return (
        <main>
            <section className="bg-primary-light py-32 relative">
                <div className="container">
                    <img src='/icons/blue-elipse.svg' alt='circle' className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none"/>
                    <img src='/icons/blue-small-elipse.svg' alt='circle' className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none"/>
                    <img src='/icons/blue-smallest-elipse.svg' alt='circle' className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none"/>
                    <div className="flex flex-col items-center justify-center">
                        <p className="p-body-16 !text-primary font-medium mb-4">About Us</p>
                        <h1 className="h2 font-bold mb-4">
                            Turning Leads into Revenue
                        </h1>
                        <p className="p-body-20 max-w-[638px] mx-auto text-center mb-8 text-accent">
                            Toolsey helps businesses grow by streamlining lead management and boosting conversion through smart automation and intuitive tools.
                        </p>
                        <div className="flex justify-center">
                            <button className="btn btn-primary">Discovery Call</button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container">
                    <h2 className="text-h1-sm leading-h1-sm text-center tracking-normal font-bold mb-12 text-standart-black">
                        Toolsey in Numbers:
                    </h2>
                    <div className="flex lg:flex-nowrap flex-wrap lg:justify-start justify-center gap-8">
                        {NUMBERS.map(({ id, label, text }) => (
                            <div key={id} className="flex max-w-[304px] w-full flex-col rounded-3xl items-center justify-center gap-4 bg-primary-light px-6 py-[40px]">
                                <span className="text-h2-sm leading-h2-sm font-bold text-primary">{label}</span>
                                <p className="p-body-16 font-semibold text-center">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-10">
                <div className="container">
                    <div className="flex lg:flex-nowrap flex-wrap lg:justify-between justify-center  items-center gap-4 mb-20">
                        <div className="max-w-[528px] h-[408px] rounded-4xl shrink-0">
                            <Image 
                                src="/images/about-toolsey.png" 
                                alt="About us" 
                                width={528} 
                                height={408} 
                                className="w-full h-full object-cover rounded-4xl"
                            />
                        </div>
                        <div className="max-w-[640px]">
                            <p className="p-body-24 font-bold mb-6">
                                We are just a bunch of hardworking, dedicated technology professionals that believe our success is achieved by serving you.
                            </p>
                            <p className="p-body-20">
                                We champion the entrepreneur, business owner, and those just making it happen! Here at Toolsey, we respect and honor that effort. It is our singular objective to make you more successful. 
                                <br/> <br/>
                                We operate at the tip of the spear helping you to convert sales leads into revenue. We bring real-world experience and exceptional technical expertise to the task at hand. 
                                <br/> <br/>
                                You will find the Toolsey service to be intuitive, practical, and highly effective. We call ourselves a “lead management platform” but what we really are is a “make you more money” platform
                            </p>
                        </div>
                    </div>
                    <div className="flex lg:flex-nowrap flex-wrap lg:justify-between justify-center items-center gap-4">
                        <div className="max-w-[528px] h-[408px] rounded-4xl shrink-0">
                            <Image 
                                src="/images/about-toolsey.png" 
                                alt="About us" 
                                width={528} 
                                height={408} 
                                className="w-full h-full object-cover rounded-4xl"
                            />
                        </div>
                        <div className="max-w-[640px]">
                            <p className="p-body-24 font-bold mb-6">
                                Visit or Call Us Anytime
                            </p>
                            <p className="p-body-20 mb-8">
                                We're here to help — whether it’s a quick Zoom or a face-to-face visit. Our team is ready to show you how Toolsey simplifies lead management and drives results. We always pick up the phone and love meeting clients in person.
                                <br/> <br/>
                                Let’s do something great together!
                            </p>
                            <ul className="p-body-20 font-semibold">
                                <li>
                                    <div className="flex items-center gap-2 mt-4">
                                        <MarkerIcon />
                                        <span>12175 Visionary Way, Suite 118, Fishers, IN 46038</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center gap-2 mt-4">
                                        <PhoneIcon />
                                        <a href="tel:800-810-0264" className="hover:text-primary transition-colors">800-810-0264</a>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center gap-2 mt-4">
                                        <MailIcon />
                                        <a href="mailto:hello@toolsey.com" className="hover:text-primary transition-colors">
                                            hello@toolsey.com
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container">
                    <InfoCard 
                        title="See How Toolsey Can Transform Your Sales"
                        text="Let us show you what Toolsey can do in a quick 20-minute demo — no pressure, just real results."
                        btnText="Discovery Call"
                    />
                </div>
            </section>
        </main>
    );
}