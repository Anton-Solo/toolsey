"use client";

import { NAV_LINKS, PRO_TOOLSEY_URL, PRO_TOOLSEY_URL_SIGNUP } from "@/constans";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActiveLink = (href: string) => {
    if (href === "/blog") {
      return pathname.startsWith("/blog");
    }
    return pathname === href;
  };

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-standart-white h-[88px] shadow-header">
      <div className="container">
        <div className="flex items-center justify-between h-full">
          <Link href="/">
            <Image src="/icons/logo.svg" alt="Logo" width={153} height={32} priority />
          </Link>

          <nav className="hidden md:flex items-center lg:gap-6 gap-3 font-medium tracking-sm">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.label} 
                href={link.href} 
                className={`hover:opacity-70 transition-all duration-300 ${
                  isActiveLink(link.href) 
                    ? 'text-primary font-bold' 
                    : 'text-gray-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6 font-bold tracking-sm">
            <Link className="hidden md:block hover:opacity-70 transition-opacity duration-300" href={PRO_TOOLSEY_URL}>Login</Link>
            <Link href={PRO_TOOLSEY_URL_SIGNUP} className="btn btn-primary !h-[48px] !text-[16px] !px-4">Get started</Link>
            <button
                type="button"
                aria-label="Open menu"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                onClick={handleOpenMenu}
                className="md:hidden inline-flex items-center justify-center h-10 w-10 -mr-2"
            >
            <Image 
                src="/icons/burger.svg" 
                alt="Open mobile menu" 
                width={24} 
                height={24} 
                loading="lazy"
            />
          </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            aria-label="Close menu"
            onClick={handleCloseMenu}
            className="absolute inset-0 bg-black/30 animate-fade-in"
          />
          <div id="mobile-menu" className="absolute top-0 left-0 z-10 right-0 bg-standart-white shadow-header animate-slide-down">
            <div className="container">
              <div className="flex items-center justify-between h-[72px]">
                <Link href="/">
                  <Image 
                    src="/icons/logo.svg" 
                    alt="Toolsey logo" 
                    width={136} 
                    height={28} 
                    priority={false}
                    loading="lazy"
                  />
                </Link>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={handleCloseMenu}
                  className="inline-flex items-center justify-center h-10 w-10 -mr-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-6 h-6 text-primary">
                      <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"/>
                  </svg>
                </button>
              </div>
            </div>
            <nav className="px-4 pb-6">
                <ul className="flex flex-col gap-2 font-medium tracking-sm">
                    {NAV_LINKS.map((link) => (
                        <li key={link.label}>
                            <Link
                            href={link.href}
                            className={`block py-2 w-max transition-all duration-300 ${
                              isActiveLink(link.href)
                                ? 'text-primary font-bold'
                                : 'text-gray-900'
                            }`}
                            onClick={handleCloseMenu}
                            >
                            {link.label}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <Link 
                          href={PRO_TOOLSEY_URL}
                          className={`block py-2 transition-all duration-300 ${
                            isActiveLink("/login")
                              ? 'text-primary font-bold'
                              : 'text-gray-900'
                          }`}
                        >
                            Login
                        </Link>
                    </li>
                </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}