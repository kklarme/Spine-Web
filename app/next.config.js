/** @type {import('next').NextConfig} */
const { Language } = require('spine-api');
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: Language.English,
    localeDetection: true,
    locales: Object.values(Language),
  },
};

module.exports = nextConfig;
