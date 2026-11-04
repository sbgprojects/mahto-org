import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "assets.harrytang.xyz" },
    ],
  },
  // /capabl.in is the shareable URL for the Capabl site (served from /capabl).
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/capabl.in", destination: "/capabl" },
        { source: "/harrytang.xyz", destination: "/harrytang" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
