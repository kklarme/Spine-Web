/** @type {import('next').NextConfig} */
const { Language } = require('spine-api');
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: Language.English,
    localeDetection: true,
    locales: Object.values(Language),
  },
  async rewrites() {
    return [
      {
        source: '/news',
        destination: '/',
      },
      {
        source: '/api/spine/:path*',
        destination: 'https://clockwork-origins.com:19181/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
