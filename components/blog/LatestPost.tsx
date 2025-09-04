import Link from "next/link"
import { ArrowIcon } from "../icons/support/ArrowIcon"
import { PostCard } from "./PostCard"

export const LatestPost = () => {
    return (
        <section className="py-[60px] pb-[120px]">
            <div className="container">
                <div className="flex md:flex-nowrap flex-wrap justify-between items-center md:gap-8 gap-2 mb-8">
                    <h3 className="text-h1-sm leading-h1-sm tracking-sm font-bold">Lastest blog posts</h3>
                    <Link href="/blog" className="font-medium text-primary flex items-center gap-2">
                        View all blog
                        <ArrowIcon className="w-[10px] h-[5px] stroke-primary -rotate-90 mt-[2px]" />
                    </Link>
                </div>
                {/* <div className="flex flex-wrap gap-8 justify-center">
                    <PostCard />
                    <PostCard />
                    <PostCard />
                </div> */}
            </div>
        </section>
    )
}