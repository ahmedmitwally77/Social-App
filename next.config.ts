import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //https://linked-posts.routemisr.com/uploads/default-profile.png
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "linked-posts.routemisr.com",
        port: "",
        pathname: "/uploads/**",
      }
    ]
  }
};

export default nextConfig;
