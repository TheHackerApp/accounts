/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
  redirects: async () => [
    {
      source: '/settings',
      destination: '/settings/general',
      permanent: false,
    },
  ],
  webpack: (config) => {
    const extensionAlias = config.resolve.extensionAlias ?? {};
    extensionAlias['.graphql'] = ['.graphql.ts'];
    config.resolve.extensionAlias = extensionAlias;

    return config;
  },
};

export default nextConfig;
