/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,        // Helps catch issues in development
    swcMinify: true,              // Enables faster builds with SWC compiler
    images: {
      domains: ['example.com'],   // Add allowed image domains here (optional)
    },
    experimental: {
      appDir: false,              // Use true if you're targeting App Router structure
    }
  };
  
  module.exports = nextConfig;