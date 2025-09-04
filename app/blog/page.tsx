import { Filters } from "@/components/blog/Filters";
import { PostCard } from "@/components/blog/PostCard";
import { WeeklyNews } from "@/components/blog/WeeklyNews";
import { Pagination } from "@/components/blog/Pagination";
import { fetchBlogPosts } from "@/lib/api/blog";
import React, { Suspense } from "react";

// Modern Next.js App Router configuration
export const revalidate = 300; // ISR: revalidate every 5 minutes

interface BlogPageProps {
    searchParams: {
        page?: string;
        category?: string;
        search?: string;
        sort?: string;
    };
}

export default async function Blog({ searchParams }: BlogPageProps) {
    const currentPage = parseInt(searchParams.page || '1');
    const category = searchParams.category;
    const search = searchParams.search;
    const sort = searchParams.sort;

    try {
        const blogData = await fetchBlogPosts({
            page: currentPage,
            per_page: 12,
            category: category,
            // Note: Add search and sort parameters to API function if supported by backend
        });

        const posts = blogData.data;
        const meta = blogData.meta;

        // Extract unique categories for filters
        const allCategories = posts.reduce((acc: string[], post) => {
            post.categories.forEach(cat => {
                if (!acc.includes(cat)) {
                    acc.push(cat);
                }
            });
            return acc;
        }, []);
        console.log(meta)

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
                        <Filters availableCategories={allCategories} />
                    </div>
                </section>

                <section className="">
                    <div className="container">
                        <div className="flex flex-wrap gap-8 max-lg:justify-center">
                            <Suspense fallback={<div className="text-center">Loading posts...</div>}>
                                {posts.length > 0 ? (
                                    posts.map((post, index) => {
                                        if (index === 8) {
                                            return (
                                                <React.Fragment key={post.id}>
                                                    <PostCard post={post} />
                                                    <section className="py-[60px] w-full">
                                                        <WeeklyNews />
                                                    </section>
                                                </React.Fragment>
                                            )
                                        }
                                        return (
                                            <PostCard key={post.id} post={post} />
                                        )
                                    })
                                ) : (
                                    <div className="text-center text-accent">
                                        <p>No posts found</p>
                                    </div>
                                )}
                            </Suspense>
                        </div>

                        {posts.length < 9 && (
                            <section className="py-[60px]">
                                <WeeklyNews />
                            </section>
                        )}

                        {/* Pagination */}
                        <Pagination meta={meta} />
                    </div>
                </section>
            </main>
        )
    } catch (error) {
        console.error('Failed to fetch blog posts:', error);
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
                        <div className="text-center text-red-600">
                            <p>Failed to load blog posts. Please try again later.</p>
                        </div>
                    </div>
                </section>
            </main>
        );
    }
}