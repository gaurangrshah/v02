/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'camo.githubusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'cdn.hashnode.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
