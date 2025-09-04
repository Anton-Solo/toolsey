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

    // Get image source with fallback
    const getImageSrc = () => {
        if (imageError) {
            return "/images/test-image.png";
        }
        
        // Check if the medium image URL is valid
        if (post.images.medium && 
            post.images.medium !== "https://devpro.toolsey.com/core/blog_img" && 
            post.images.medium.includes('.')) {
            return post.images.medium;
        }
        
        return "/images/test-image.png";
    };

    return (
        <div className="hover:shadow-lg rounded-3xl max-w-[416px] w-full linear-borders bg-standart-white">
            <Link href={`/blog/${post.id}`} className="block w-full h-[208px]">
                <Image
                    src={getImageSrc()}
                    alt={post.title}
                    width={416}
                    height={208}
                    className="rounded-t-3xl object-cover w-full h-full"
                    onError={() => setImageError(true)}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
            </Link>
            <div className="p-6">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {post.categories.map((category, index) => (
                        <p key={index} className="rounded-[4px] py-1.5 px-2 bg-secondary-foreground text-sm">
                            {category}
                        </p>
                    ))}
                </div>
                <Link href={`/blog/${post.id}`} className="block p-body-20 font-bold mb-2">
                    {post.title}
                </Link>
                <div className="flex items-center gap-2 mb-6 text-accent-dark">
                    <p className="label">{formatDate(post.published)}</p>
                    <span className="bg-accent-dark w-[3px] h-[3px] rounded-full"></span>
                    <p className="label">{calculateReadTime(post.content)}</p>
                </div>
                <Link href={`/blog/${post.id}`} className="flex items-center gap-2 text-primary font-medium">
                    <span>Read more</span>
                    <ArrowIcon className="w-[10px] h-[5px] stroke-primary -rotate-90 mt-[2px]" />
                </Link>
            </div>
        </div>
    )
}