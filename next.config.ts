const nextConfig = {
  output: 'standalone',
  experimental: {
    cpus: 1, // reduce from default (usually = CPU core count)
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jplpanawkbfwgpehspnm.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
