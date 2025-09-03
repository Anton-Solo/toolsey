import Image from "next/image"
import Link from "next/link"
import { ArrowIcon } from "../icons/support/ArrowIcon"

export const PostCard = () => {
    return (
        <div className="hover:shadow-lg rounded-3xl max-w-[416px] w-full linear-borders bg-standart-white">
            <Link href="/blog/post-1" className="block w-full h-[208px]">
                <Image
                    src="/images/test-image.png"
                    alt="Post Card Image"
                    width={416}
                    height={208}
                    className="rounded-t-3xl object-cover w-full h-full"
                />
            </Link>
            <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                    <p className="rounded-[4px] py-1.5 px-2 bg-secondary-foreground text-sm">
                        Automation
                    </p>
                </div>
                <Link href="/blog/post-1" className="block p-body-20 font-bold mb-2">
                    Automating Lead Assignment: Tools and Best Practices
                </Link>
                <div className="flex items-center gap-2 mb-6 text-accent-dark">
                    <p className="label">August 1, 2025</p>
                    <span className="bg-accent-dark w-[3px] h-[3px] rounded-full"></span>
                    <p className="label">4 min read</p>
                </div>
                <Link href="/blog/post-1" className="flex items-center gap-2 text-primary font-medium">
                    <span>Read more</span>
                    <ArrowIcon className="w-[10px] h-[5px] stroke-primary -rotate-90 mt-[2px]" />
                </Link>
            </div>
        </div>
    )
}