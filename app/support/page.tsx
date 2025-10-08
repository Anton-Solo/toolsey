import { ChatIcon } from "@/components/icons/support/ChatIcon";
import { FAQItem } from "@/components/support/FAQItem";
import { VideoPlayer } from "@/components/support/VideoPlayer";
import { COMMON_QUESTIONS } from "@/constans/ support";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support & How-To Videos | Toolsey Lead Management",
  description: "Get help fast: step-by-step videos, FAQs, and live support. Learn to add teammates, integrate your CRM, set notifications, and manage leads in Toolsey.",
};

export default function Support() {
    return (
        <main className="bg-primary-light">
            <div className="container">
                <section className="pt-20 pb-16">
                    <h1 className="h2 text-center text-foreground mb-6">We&apos;ve got a video for that</h1>
                    <p className="p-body-20 max-w-[554px] mx-auto text-center mb-8">From adding team members to setting up an integration we have a video for that.</p>
                    <div className="bg-card-bg rounded-4xl p-4 w-full">
                        <VideoPlayer />
                    </div>
                </section>

                <section className="py-[60px]">
                    <h2 className="h2 text-center text-foreground mb-12">Still need help?</h2>
                    <div className="flex lg:flex-nowrap flex-wrap lg:justify-between justify-center lg:gap-[10px] gap-8">
                        <div className="p-[40px] rounded-4xl bg-standart-white max-w-[640px] w-full">
                            <div className="flex justify-center mb-6">
                                <ChatIcon />
                            </div>
                            <h3 className="p-body-24 font-bold mb-4 text-foreground max-w-[210px] mx-auto text-center">
                                Chat with our Well Trained AI Expert
                            </h3>
                            <p className="p-body-16 text-accent mb-6 text-center">Available 24/7</p>
                            <div className="flex justify-center">
                                <button className="btn btn-primary">Chat with us</button>
                            </div>
                        </div>
                        <div className="p-[40px] rounded-4xl bg-standart-white max-w-[640px] w-full">
                            <div className="flex justify-center mb-6">
                                <ChatIcon />
                            </div>
                            <h3 className="p-body-24 font-bold mb-4 text-foreground max-w-[210px] mx-auto text-center">
                                Customer care
                            </h3>
                            <p className="p-body-16 text-accent mb-6 text-center">
                                Speak with a real human
                                <br />
                                Mon-Fri, 8am-5pm
                            </p>
                            <div className="flex justify-center">
                                <button className="btn btn-primary">Call (800) 810 0264</button>
                            </div>
                        </div>
                    </div>
                </section>

                 <section className="pt-[60px] pb-[120px]">
                    <div className="container">
                        <h2 className="h2 text-center text-foreground mb-12">Common Questions</h2>
                        <div className="max-w-[736px] mx-auto">
                            {COMMON_QUESTIONS.map(({ id, question, answer }) => (
                                <div key={id} className={`mb-6 ${id === COMMON_QUESTIONS.length ? '' : 'last:mb-0'}`}>
                                    <FAQItem question={question} answer={answer} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}