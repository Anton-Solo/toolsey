'use client'

import Image from "next/image"
import Link from "next/link"
import { ArrowIcon } from "../icons/support/ArrowIcon"
import { BlogPost } from "@/types/blog.types"
import { useState } from "react"

interface PostCardProps {
    post: BlogPost;
}

export const PostCard = ({ post }: PostCardProps) => {
    const [imageError, setImageError] = useState(false);

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

    const getImageSrc = () => {
        if (imageError) {
            return "/images/test-image.png";
        }
        
        if (post.images.medium && 
            post.images.medium !== "https://devpro.toolsey.com/core/blog_img" && 
            post.images.medium.includes('.')) {
            return post.images.medium;
        }
        
        return "/images/test-image.png";
    };

    return (
        <div className="hover:shadow-lg rounded-3xl max-w-[416px] w-full linear-borders bg-standart-white transition-all duration-300 hover:-translate-y-2 flex flex-col">
            <Link href={`/blog/${post.slug}`} className="block w-full h-[208px] relative overflow-hidden rounded-t-3xl">
                <Image
                    src={getImageSrc()}
                    alt={post.title}
                    width={416}
                    height={208}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                    onError={() => setImageError(true)}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                />
            </Link>
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {post.categories.slice(0, 3).map((category, index) => (
                        <p key={index} className="rounded-[4px] py-1.5 px-2 bg-secondary-foreground text-sm">
                            {category}
                        </p>
                    ))}
                    {post.categories.length > 3 && (
                        <div className="relative group">
                            <p className="rounded-[4px] py-1.5 px-2 bg-secondary-foreground text-sm cursor-pointer">
                                ...
                            </p>
                            <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-10">
                                <div className="bg-gray-800 text-white text-sm rounded-lg p-3 shadow-lg whitespace-nowrap">
                                    <div className="flex flex-col gap-1">
                                        {post.categories.slice(3).map((category, index) => (
                                            <span key={index}>{category}</span>
                                        ))}
                                    </div>
                                    <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <Link href={`/blog/${post.slug}`} className="block p-body-20 font-bold mb-2 line-clamp-3 hover:text-primary transition-colors duration-300 flex-grow">
                    {post.title}
                </Link>
                <div className="mt-auto">
                    <div className="flex items-center gap-2 mb-6 text-accent-dark">
                        <p className="label">{formatDate(post.published)}</p>
                        <span className="bg-accent-dark w-[3px] h-[3px] rounded-full"></span>
                        <p className="label">{calculateReadTime(post.content)}</p>
                    </div>
                    <Link href={`/blog/${post.slug}`} className="flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300 group">
                        <span>Read more</span>
                        <ArrowIcon className="w-[10px] h-[5px] stroke-primary -rotate-90 mt-[2px] group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                </div>
            </div>
        </div>
    )
}