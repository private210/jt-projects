import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "i.pinimg.com", // Pinterest
      "images.unsplash.com", // Unsplash
      "res.cloudinary.com", // Cloudinary
      "lh3.googleusercontent.com", // Google Images
    ],
  },
};

export default nextConfig;
