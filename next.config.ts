import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    API_TOKEN: process.env.API_TOKEN,
    NEXT_PUBLIC_API_TOKEN: process.env.NEXT_PUBLIC_API_TOKEN,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    VERCEL_URL: process.env.VERCEL_URL,
    API_BASE_URL: process.env.API_BASE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "devpro.toolsey.com",
        port: "",
        pathname: "/core/blog_img/**",
      },
      {
        protocol: "https",
        hostname: "pro.toolsey.com",
        port: "",
        pathname: "/core/blog_img/**",
      },
      {
        protocol: "https",
        hostname: "web-dev.toolsey.net",
        port: "",
        pathname: "/core/blog_img/**",
      },
      {
        protocol: "https",
        hostname: "toolsey.com",
        port: "",
        pathname: "/core/blog_img/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        port: "",
        pathname: "/vi/**",
      },
    ],
  },
};

export default nextConfig;

