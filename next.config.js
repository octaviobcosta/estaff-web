/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance
  reactStrictMode: true,
  swcMinify: true,
  
  // Enhanced Hot Reload Configuration (only when not using Turbopack)
  ...(process.env.NODE_ENV === 'development' && !process.argv.includes('--turbo') && {
    webpack: (config, { dev, isServer }) => {
      // Optimized HMR for fast development
      if (dev && !isServer) {
        config.watchOptions = {
          poll: 500, // Faster polling - check every 500ms
          aggregateTimeout: 200, // Faster rebuild - 200ms delay
          ignored: [
            /node_modules/,
            /.next/,
            /out/,
            /.git/,
            /coverage/,
            /\.env/
          ],
        }
        
        // Fast refresh optimization
        config.cache = {
          type: 'memory',
        }
        
        // Enhanced hot module replacement
        config.optimization = {
          ...config.optimization,
          removeAvailableModules: false,
          removeEmptyChunks: false,
          splitChunks: false,
        }
      }
      return config
    },
  }),
  
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
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
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
    bundleAnalyzer: {
      enabled: true,
      openAnalyzer: true,
    },
  }),
}

module.exports = nextConfig