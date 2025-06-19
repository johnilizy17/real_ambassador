// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  experimental: {
    esmExternals: false, // Helps resolve ESM imports
  },
  reactStrictMode: false,
};

module.exports = withPWA(nextConfig); // Wrap nextConfig with withPWA
