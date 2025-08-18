/** @types {import('next').NextConfig} */
const nextConfig = {
  basePath: '/MorviePanel',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
