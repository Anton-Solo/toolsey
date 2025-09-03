"use client";

import { NAV_LINKS } from "@/constans";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const pathname = usePathname();

  const isActiveLink = (href: string) => {
    if (href === "/blog") {
      return pathname.startsWith("/blog");
    }
    return pathname === href;
  };

  const handleCloseMenu = () => {
    setIsExiting(true);
  };

  useEffect(() => {
    if (!isExiting) return;
    const timeout = setTimeout(() => {
      setIsExiting(false);
      setIsMenuOpen(false);
    }, 320);
    return () => clearTimeout(timeout);
  }, [isExiting]);

  return (
    <header className="bg-standart-white h-[88px] shadow-header">
      <div className="container">
        <div className="flex items-center justify-between h-full">
          <Link href="/">
            <img src="/icons/logo.svg" alt="Logo" width={153} height={32} />
          </Link>

          <nav className="hidden md:flex items-center gap-6 font-medium tracking-sm">
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
            <Link className="hidden md:block hover:opacity-70 transition-opacity duration-300" href="/login">Login</Link>
            <button className="btn btn-primary !h-[48px] !text-[16px] !px-4">Get started</button>
            <button
                type="button"
                aria-label="Open menu"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                onClick={() => setIsMenuOpen(true)}
                className="md:hidden inline-flex items-center justify-center h-10 w-10 -mr-2"
            >
            <img src="/icons/burger.svg" alt="Open menu" width={24} height={24} />
          </button>
          </div>
        </div>
      </div>

      {(isMenuOpen || isExiting) && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            aria-label="Close menu"
            onClick={handleCloseMenu}
            className={`absolute inset-0 bg-black/30 ${isExiting ? "animate-fade-out" : "animate-fade-in"}`}
          />
          <div id="mobile-menu" className={`absolute top-0 left-0 right-0 bg-standart-white shadow-header ${isExiting ? "animate-slide-up" : "animate-slide-down"}`}>
            <div className="container">
              <div className="flex items-center justify-between h-[72px]">
                <Link href="/">
                  <img src="/icons/logo.svg" alt="Logo" width={136} height={28} />
                </Link>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={handleCloseMenu}
                  className="inline-flex items-center justify-center h-10 w-10 -mr-2"
                >
                  <img src="/icons/burger.svg" alt="Close menu" width={24} height={24} />
                </button>
              </div>
            </div>
            <nav className="px-4 pb-6">
                <ul className="flex flex-col gap-2 font-medium tracking-sm">
                    {NAV_LINKS.map((link) => (
                        <li key={link.label}>
                            <Link
                            href={link.href}
                            className={`block py-2 transition-all duration-300 ${
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
                          href="/login" 
                          onClick={handleCloseMenu} 
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