import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Only set turbopack root locally to avoid conflicting lockfile issue
  ...(process.env.VERCEL
    ? {}
    : { turbopack: { root: process.cwd() } }),
};

export default nextConfig;
