const BASE_PATH = "nextjs-ssg-md-blog";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracing: true,
  env:{
    basePath: ''
  }
};

module.exports = nextConfig;
