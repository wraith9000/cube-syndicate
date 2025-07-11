/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['cube-syndicate.vercel.app'],
    unoptimized: true
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp3|wav|ogg)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/audio/[name][ext]',
      },
    });
    return config;
  },
}

module.exports = nextConfig 