import { Filters } from "@/components/blog/Filters";
import { PostCard } from "@/components/blog/PostCard";
import { WeeklyNews } from "@/components/blog/WeeklyNews";
import { Pagination } from "@/components/blog/Pagination";
import { fetchBlogCategories, fetchBlogPosts } from "@/lib/api/blog";
import React, { Suspense } from "react";

export const revalidate = 300;

interface BlogPageProps {
    searchParams: Promise<{
        page?: string;
        category?: string;
        searchText?: string;
        sort?: string;
        
    }>;
}

export default async function Blog({ searchParams }: BlogPageProps) {
    const params = await searchParams;
    
    const currentPage = parseInt(params.page || '1');
    const category = params.category;
    const searchText = params.searchText;
    const sort = params.sort;

    try {
        const blogData = await fetchBlogPosts({
            page: currentPage,
            perPage: 12,
            category: category,
            sort: sort,
            searchText: searchText,
        });

        const posts = blogData.data;
        const meta = blogData.meta;

        const allCategories = await fetchBlogCategories();
        const categories = allCategories.data;

        return (
            <main className="bg-primary-light sm:pt-[120px] pt-[60px] pb-[60px]">
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
                        <Filters availableCategories={categories} />
                    </div>
                </section>

                <section className="">
                    <div className="container">
                        <div className="flex flex-wrap gap-8 max-lg:justify-center">
                            <Suspense fallback={
                                <div className="flex flex-wrap gap-8 max-lg:justify-center w-full">
                                    {Array.from({ length: 12 }).map((_, index) => (
                                        <div key={index} className="max-w-[416px] w-full">
                                            <div className="bg-gray-200 rounded-t-3xl w-full h-[208px] animate-pulse"></div>
                                            <div className="p-6 bg-standart-white rounded-b-3xl">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="bg-gray-200 h-6 w-16 rounded animate-pulse"></div>
                                                    <div className="bg-gray-200 h-6 w-20 rounded animate-pulse"></div>
                                                </div>
                                                <div className="bg-gray-200 h-6 w-full rounded mb-2 animate-pulse"></div>
                                                <div className="bg-gray-200 h-4 w-3/4 rounded mb-6 animate-pulse"></div>
                                                <div className="bg-gray-200 h-4 w-24 rounded animate-pulse"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }>
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
            <main className="bg-primary-light sm:pt-[120px] pt-[60px] pb-[60px]">
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