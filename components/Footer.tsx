'use client';

import Image from "next/image";
import Link from "next/link";
import { FOOTER_ADDRESS, FOOTER_NAV_LINKS, SOCIAL_LINKS } from "@/constans";
import { usePathname } from "next/navigation";

export default function Footer() {
    const year = new Date().getFullYear();
    const pathname = usePathname();
    const isBlue = pathname === "/about-us";

    return (
        <footer className={`${isBlue ? 'bg-primary-light' : 'bg-standart-white'} pt-10 pb-6`}>
            <div className="container">
                <div className="flex flex-wrap justify-between mb-10 tracking-sm text-accent gap-6">
                    <div className="flex flex-col gap-6 max-w-[332px]">
                        <Image 
                            src="/icons/logo.svg"
                            alt="logo"
                            width={230}
                            height={48}
                        />
                        <p className="text-accent">
                            Toolsey was designed to organize and automate your sales process. 
                            We have one objective to help you make more money!
                        </p>
                        <div className="flex items-center gap-3">
                            {SOCIAL_LINKS.map(({ href, Icon }) => (
                                <a 
                                    key={href} 
                                    aria-label={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={href} 
                                    className="transition-opacity hover:opacity-70"
                                >
                                    <Icon />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-6 justify-between">
                        <div className="flex gap-9">
                            <ul className="flex flex-col gap-2">
                                <li className="font-bold mb-1">
                                    Explore
                                </li>
                                {FOOTER_NAV_LINKS.map(({ href, label}) => (
                                    <li key={href}>
                                        <Link className='hover:opacity-70 transition-opacity duration-300' href={href}>{label}</Link>
                                    </li>
                                ))}
                            </ul>
                            <ul className="flex flex-col gap-2 max-w-[166px]">
                                <li className="font-bold mb-1">
                                    Contact us
                                </li>
                                {FOOTER_ADDRESS.map(({ id, label}) => (
                                    <li key={id}>
                                        {label}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="font-bold mb-1">
                                Download app
                            </p>
                            <ul className="flex items-center gap-4">
                                <Image 
                                    src='/icons/ios-app.svg'
                                    alt="ios app"
                                    width={135}
                                    height={40}
                                    className="h-[40px]"
                                />
                                <Image 
                                    src='/icons/google-app.svg'
                                    alt="ios app"
                                    width={135}
                                    height={40}
                                    className="h-[40px]"
                                />
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4 text-accent text-sm tracking-normal">
                    <p>© {year} Toolsey. All Rights Reserved.</p>
                    <div className="flex items-center gap-6 tracking-h1 underline">
                        <Link href="/">
                            Privacy Policy
                        </Link>
                        <Link href="/">
                            Terms & Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}