//import type { NextConfig } from "next";
import { NextConfig } from "next/dist/types";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    ppr: `incremental`,
  },
};

export default nextConfig;
