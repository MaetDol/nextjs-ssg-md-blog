const BASE_PATH = "nextjs-ssg-md-blog";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: `/${BASE_PATH}`,
  assetPrefix: `/${BASE_PATH}/`,
  env:{
    basePath: BASE_PATH
  }
};

module.exports = nextConfig;
