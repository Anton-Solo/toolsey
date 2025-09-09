import LatestPost from "@/components/blog/LatestPost";
import { WeeklyNews } from "@/components/blog/WeeklyNews";
import { ArrowIcon } from "@/components/icons/support/ArrowIcon";
import { ScrollToTop } from "@/components/ScrollToTop";
import { fetchBlogPostById } from "@/lib/api/blog";
import { BlogPost } from "@/types/blog.types";
import { splitHtmlContent } from "@/utils/contentSplitter";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PostPageProps {
    params: {
        id: string;
    };
}

export const revalidate = 300; // ISR: revalidate every 5 minutes
export const dynamicParams = true; // Generate pages on-demand for new posts

// Generate metadata for SEO
// export async function generateMetadata({ params }: PostPageProps) {
//     try {
//         const response = await fetchBlogPostById(parseInt(params.id));
//         const post: BlogPost = response.data;

//         return {
//             title: post.title,
//             description: post.summary || post.content.replace(/<[^>]*>/g, '').substring(0, 160),
//             openGraph: {
//                 title: post.title,
//                 description: post.summary || post.content.replace(/<[^>]*>/g, '').substring(0, 160),
//                 images: [
//                     {
//                         url: post.images.large || '/images/test-image.png',
//                         width: 1200,
//                         height: 630,
//                         alt: post.title,
//                     },
//                 ],
//                 type: 'article',
//                 publishedTime: post.published,
//             },
//             twitter: {
//                 card: 'summary_large_image',
//                 title: post.title,
//                 description: post.summary || post.content.replace(/<[^>]*>/g, '').substring(0, 160),
//                 images: [post.images.large || '/images/test-image.png'],
//             },
//         };
//     } catch (error) {
//         console.error('Failed to generate metadata:', error);
//         return {
//             title: 'Blog Post',
//             description: 'Read our latest blog post',
//         };
//     }
// }

export default async function Post({ params }: PostPageProps) {
    try {
        const response = await fetchBlogPostById(parseInt(params.id));
        const post: BlogPost = response.data;

        // Format date
        const formatDate = (dateString: string) => {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        };

        // Calculate read time (rough estimation: 200 words per minute)
        const calculateReadTime = (content: string) => {
            const strippedContent = content.replace(/<[^>]*>/g, '');
            const wordCount = strippedContent.split(/\s+/).length;
            const readTime = Math.ceil(wordCount / 200);
            return `${readTime} min read`;
        };

        // Extract images from content and remove them from text content
        const imagesInContent = post.content.match(/<img[^>]*>/gi) || [];
        const textContent = post.content.replace(/<img[^>]*>/gi, '');
        const { firstHalf, secondHalf } = splitHtmlContent(textContent, 0.6);

        return (
            <main className="bg-primary-light">
                <section className="py-[60px]">
                    <div className="container">
                        <Link href="/blog" className="flex items-center gap-2 lg:-mb-6 mb-4 text-primary font-medium hover:opacity-80 transition-opacity duration-300">
                            <ArrowIcon className="w-[10px] h-[5px] stroke-primary rotate-90 mt-[2px]" />
                            Back to blog
                        </Link>
                        <div className="max-w-[640px] w-full mx-auto">
                            {/* Main blog image */}
                            <Image 
                                src={post.images.large || "/images/test-image.png"}
                                alt={post.title} 
                                width={640} 
                                height={296} 
                                className="rounded-4xl mb-8"
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                            />
                            <h1 className="text-h1-sm leading-h1-sm tracking-sm font-bold mb-6">
                                {post.title}
                            </h1>

                            <div className="flex items-center gap-2 mb-6 flex-wrap">
                                {post.categories.map((category, index) => (
                                    <p key={index} className="rounded-[4px] py-1.5 px-2 bg-secondary-foreground text-sm">
                                        {category}
                                    </p>
                                ))}
                            </div>

                            <div className="flex items-center gap-2 mb-8 text-accent-dark">
                                <p className="label">{formatDate(post.published)}</p>
                                <span className="bg-accent-dark w-[3px] h-[3px] rounded-full"></span>
                                <p className="label">{calculateReadTime(post.content)}</p>
                            </div>

                            <div className="post">
                                {/* Display summary if available */}
                                {post.summary && (
                                    <div className="mb-8 p-6 bg-secondary-foreground/10 rounded-lg">
                                        <p className="text-lg font-medium text-accent-dark">{post.summary}</p>
                                    </div>
                                )}

                                {/* Show images from content if they exist */}
                                {imagesInContent.length > 0 && (
                                    <div className="mb-8">
                                        <div dangerouslySetInnerHTML={{ 
                                            __html: imagesInContent.join('') 
                                        }} />
                                    </div>
                                )}

                                {/* Show content based on whether it was split */}
                                {secondHalf ? (
                                    <>
                                        {/* First half of content */}
                                        <div dangerouslySetInnerHTML={{ __html: firstHalf }} />
                                        
                                        {/* WeeklyNews in the middle */}
                                        <div className="my-12">
                                            <WeeklyNews isPost={true} />
                                        </div>
                                        
                                        {/* Second half of content */}
                                        <div dangerouslySetInnerHTML={{ __html: secondHalf }} />
                                    </>
                                ) : (
                                    <>
                                        {/* Show full content if not split */}
                                        <div dangerouslySetInnerHTML={{ __html: textContent }} />
                                        
                                        {/* WeeklyNews at the end */}
                                        <div className="mt-12">
                                            <WeeklyNews isPost={true} />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                <LatestPost />
                <ScrollToTop />
            </main>
        )
    } catch (error) {
        console.error('Failed to fetch blog post:', error);
        notFound();
    }
}