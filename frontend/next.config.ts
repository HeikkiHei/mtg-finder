import type { NextConfig } from 'next'

const backendUrl = process.env.BACKEND_URL ?? 'http://localhost:3001'

const nextConfig: NextConfig = {
  // Proxy API calls to the backend so the browser always talks to the same
  // origin it loaded from. This makes the app work over localhost, a LAN IP
  // (e.g. a phone on the same network), or a deployment — without hardcoding
  // the backend host in client code or relying on CORS.
  async rewrites() {
    return [{ source: '/api/:path*', destination: `${backendUrl}/api/:path*` }]
  }
}

export default nextConfig
