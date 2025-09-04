/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance
  reactStrictMode: true,
  swcMinify: true,
  
  // WSL2 Hot Reload Fix
  webpack: (config, { dev, isServer }) => {
    // Fix for HMR in WSL2
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000, // Check for changes every second
        aggregateTimeout: 300, // Delay before rebuilding
        ignored: /node_modules/,
      }
    }
    return config
  },
  
  // Images otimizadas
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'supabase.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 300,
  },
  
  // Experimental features for Next.js 14
  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js'],
  },
  
  // Headers de segurança
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  
  // Bundle analyzer apenas para builds de produção
  ...(process.env.NODE_ENV === 'production' && process.env.ANALYZE === 'true' && {
    webpack: (config, { isServer }) => {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true,
        })
      )
      return config
    },
  }),
}

module.exports = nextConfig