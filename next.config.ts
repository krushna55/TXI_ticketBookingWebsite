const nextConfig = {
  experimental: {
    cpus: 1,
    // Add these optimizations
    workerThreads: false,
    optimizeCss: true, // If you have CSS to optimize
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "54325", // ← add the port
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "jplpanawkbfwgpehspnm.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    // Add image optimization
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Reduce bundle size by enabling compression
  compress: true,
  // Disable powered by header
  poweredByHeader: false,
  // Generate source maps only in development
  productionBrowserSourceMaps: false,
  // Optimize bundle
  swcMinify: true,
};

export default nextConfig;
