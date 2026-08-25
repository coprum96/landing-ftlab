import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/:locale/research",
        destination: "/:locale/research/human",
        permanent: false,
      },
      {
        source: "/:locale/agentic-ai",
        destination: "/:locale/research/agentic-ai",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
