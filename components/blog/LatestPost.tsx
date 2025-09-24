import Link from "next/link"
import { ArrowIcon } from "../icons/support/ArrowIcon"
import { PostCard } from "./PostCard"
import { fetchBlogPosts } from "@/lib/api/blog"

export default async function LatestPost({excluded_ids}: {excluded_ids: number[]}) {
    const posts = await fetchBlogPosts({
        perPage: 3,
        excluded_ids: excluded_ids,
    })

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
                <div className="flex flex-wrap gap-8 justify-center">
                    {posts.data.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </section>
    )
}