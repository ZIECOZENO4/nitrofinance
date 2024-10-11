/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: false, // Disable SWC minification
    webpack: (config, { isServer }) => {
      // Use import instead of require
      config.resolve.alias['@babel/runtime'] = import.meta.url.replace(/\/[^/]+$/, '') + '/node_modules/@babel/runtime';
      
      // Add any other custom webpack configurations here
      
      return config;
    },
    // Optionally, you can add experimental features if needed
    experimental: {
      // Example: esmExternals: true,
    },
  };
  
  export default nextConfig;