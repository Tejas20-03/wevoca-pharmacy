/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  images: {
    minimumCacheTTL: 120,
    deviceSizes: [320, 360, 420, 480, 575, 767, 991, 1280, 1400, 1600, 1920],
    domains: [
      "dvago-assets.s3.ap-southeast-1.amazonaws.com",
      "service-unitedpharma.cloubuzz.com",
      "apidb.dvago.pk",
      "unitedpharma-assets.s3.ap-southeast-1.amazonaws.com",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: `/blogs/blog/:blogSlug`,
        destination: "/blogs",
        permanent: true,
      },
      {
        source: `/blog`,
        destination: "/blogs",
        permanent: true,
      },
      {
        source: `/products/:productslug`,
        destination: "/p/:productslug",
        permanent: true,
      },
      {
        source: `/product/:productslug`,
        destination: "/p/:productslug",
        permanent: true,
      },
      {
        source: `/collection/:collectionSlug*`,
        destination: "/col/:collectionSlug*",
        permanent: true,
      },
      {
        source: `/collections/:collectionSlug*`,
        destination: "/cat/:collectionSlug*",
        permanent: true,
      },
      {
        source: `/collections/:collectionSlug*/:collectionSlug*`,
        destination: "/cat/:collectionSlug*",
        permanent: true,
      },
      {
        source: `/collections/:collectionSlug*/:collectionSlug*`,
        destination: "/col/:collectionSlug*",
        permanent: true,
      },
      {
        source: `/category/:collectionSlug*`,
        destination: "/cat/:collectionSlug*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
