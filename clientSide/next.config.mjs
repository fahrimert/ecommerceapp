/** @type {import('next').NextConfig} */
const nextConfig = {

    images : {
        domains: ['res.cloudinary.com'],
        disableStaticImages: true
        
       },
   
       webpack: {
            externals: {
              sharp: 'commonjs sharp'
            }
       }
};


export default nextConfig;
