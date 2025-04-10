/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'fiverr-res.cloudinary.com',
        port: '',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
