const nextConfig = {
  experimental: {
    esmExternals: false, // This helps resolve ESM imports
    
  }, 
  reactStrictMode: false,
};

module.exports = nextConfig;
