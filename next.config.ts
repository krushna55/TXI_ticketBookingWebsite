/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use 'images' configuration to allow external Supabase storage buckets
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "54325",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: 'https',
        hostname: 'jplpanawkbfwgpehspnm.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },{
        protocol: "https",
        hostname: "hrcxheiyttrbccjsngkr.supabase.co", // Consider using process.env.SUPABASE_HOSTNAME here
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    // These sizes are standard defaults; only keep them if you need specific custom widths
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  async rewrites() {
    return [
      {
        source: '/api/supabase-functions/:path*',
        destination: 'https://2kdq7w4z-54325.inc1.devtunnels.ms/functions/v1/:path*',
      },
    ];
  },

  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  // swcMinify: true, // Removed: Default in modern Next.js
};

module.exports = nextConfig;
