/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Removed experimental.esmExternals: false as it can cause issues in Next 16
};

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development', // Disable PWA in dev to avoid conflicts
});

module.exports = withPWA(nextConfig);
