import { LatestPost } from "@/components/blog/LatestPost";
import { WeeklyNews } from "@/components/blog/WeeklyNews";
import { ArrowIcon } from "@/components/icons/support/ArrowIcon";
import { ScrollToTop } from "@/components/ScrollToTop";
import Image from "next/image";
import Link from "next/link";

export default function Post() {
    return (
        <main className="bg-primary-light">
            <section className="py-[60px]">
                <div className="container">
                    <Link href="/blog" className="flex items-center gap-2 lg:-mb-6 mb-4 text-primary font-medium hover:opacity-80 transition-opacity duration-300">
                        <ArrowIcon className="w-[10px] h-[5px] stroke-primary rotate-90 mt-[2px]" />
                        Back to blog
                    </Link>
                    <div className="max-w-[640px] w-full mx-auto">
                        <Image 
                            src="/images/test-image.png" 
                            alt="Post Image" 
                            width={640} 
                            height={296} 
                            className="rounded-4xl mb-8"
                        />
                        <h1 className="text-h1-sm leading-h1-sm tracking-sm font-bold mb-6">
                            Ways to Respond to Leads Faster and Win More Jobs
                        </h1>

                        <div className="flex items-center gap-2 mb-6">
                            <p className="rounded-[4px] py-1.5 px-2 bg-secondary-foreground text-sm">
                                Automation
                            </p>
                            <p className="rounded-[4px] py-1.5 px-2 bg-secondary-foreground text-sm">
                                Automation
                            </p>
                        </div>

                        <div className="flex items-center gap-2 mb-8 text-accent-dark">
                            <p className="label">August 1, 2025</p>
                            <span className="bg-accent-dark w-[3px] h-[3px] rounded-full"></span>
                            <p className="label">4 min read</p>
                        </div>

                        <div className="post">
                            <p>
                                In today&apos;s competitive home services market, the speed at which you respond to new leads can be the difference between winning the job or losing it to a faster competitor. Consumers expect quick responses—and contractors who deliver are more likely to earn trust and close the deal.
                            </p>

                            <h3>1. Use a Centralized Lead Inbox</h3>

                            <p className="p-body-16 !font-bold !mb-2">Top benefits of a centralized inbox:</p>

                            <ul>
                                <li>All leads in one place</li>
                                <li>No more missed messages</li>
                                <li>Faster routing to the right person</li>
                                <li>Better tracking and analytics</li>
                            </ul>

                            <blockquote>
                                <span>&quot;</span>
                                <div>
                                    <p>
                                        Speed is the new currency of business. The faster you respond, the more deals you win.
                                    </p>
                                    <p>— <b>Mark Cuban</b>, Entrepreneur & Investor</p>
                                </div>
                            </blockquote>

                            <WeeklyNews isPost={true} />
                        </div>
                    </div>
                </div>
            </section>

            <LatestPost />
            <ScrollToTop />
        </main>
    )
}