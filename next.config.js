/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    PGHOST: 'ep-bold-forest-336221.us-east-2.aws.neon.tech',
    PGDATABASE: 'neondb',
    PGUSER: 'bilal.faisal31',
    PGPASSWORD: 'a2OqFxYh9cbT'
  }
}

module.exports = nextConfig
