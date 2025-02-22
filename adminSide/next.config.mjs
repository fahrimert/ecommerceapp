/** @type {import('next').NextConfig} */
const nextConfig = {
   async rewrites() {
      return [
        {
            source: '/api',
            destination: '/api',
        },
        {
          source: '/ducks',
          destination: 'https://random-d.uk/api/random',
        },
      ];
    },

   images : {
    domains: ['res.cloudinary.com'],
    disableStaticImages: true

   },
   typescript: {
   
      ignoreBuildErrors: true,
    },
   eslint: {
      ignoreDuringBuilds: true,
   
  },
};

export default nextConfig;
