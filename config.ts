const config = {
  server_url:
    process.env.NODE_ENV === 'production'
      ? 'https://maetdol.github.io/nextjs-ssg-md-blog'
      : 'http://localhost:3000',
} as const;

export default config;
