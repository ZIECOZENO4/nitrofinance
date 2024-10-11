/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: false, // Disable SWC minification
    webpack: (config, { isServer }) => {
      // Resolve @babel/runtime
      config.resolve.alias['@babel/runtime'] = require.resolve('@babel/runtime');
  
      // Add any other custom webpack configurations here
      
      return config;
    },
    // Optionally, you can add experimental features if needed
    experimental: {
      // Example: esmExternals: true,
    },
  };
  
  export default nextConfig;