import { Filters } from "@/components/blog/Filters";
import { PostCard } from "@/components/blog/PostCard";
import { WeeklyNews } from "@/components/blog/WeeklyNews";

export default function Blog() {
    return (
        <main className="bg-primary-light pt-[120px] pb-[60px]">
            <section className=" pb-[60px]">
                <div className="container">
                    <h1 className="h2 font-bold mb-4 text-center">The Toolsey Blog</h1>
                    <p className="p-body-20 max-w-[436px] mx-auto text-center text-accent">
                        Lead faster. Sell smarter. Stay ahead with expert insights and product tips.
                    </p>
                </div>
            </section>

            <section className="pb-8">
                <div className="container">
                    <Filters />
                </div>
            </section>

            <section className="">
                <div className="container">
                    <div className="flex flex-wrap gap-8 justify-center">
                        <PostCard />
                        <PostCard />
                        <PostCard />
                        <PostCard />
                        <PostCard />
                        <PostCard />
                    </div>
                </div>
            </section>

            <section className="py-[60px]">
                <div className="container">
                    <WeeklyNews />
                </div>
            </section>

            <section className="">
                <div className="container">
                    <div className="flex flex-wrap gap-8 justify-center">
                        <PostCard />
                        <PostCard />
                        <PostCard />
                        <PostCard />
                        <PostCard />
                        <PostCard />
                    </div>
                </div>
            </section>
        </main>
    )
}