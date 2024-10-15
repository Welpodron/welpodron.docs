// next.config.js
const { withContentlayer } = require('next-contentlayer2');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
};

module.exports = withContentlayer(nextConfig);
