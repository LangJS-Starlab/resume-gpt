/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverActions: true,
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.html$/,
      loader: 'raw-loader',
    })

    return config
  },
}

export default nextConfig
