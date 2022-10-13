export function isProduction() {
  return process.env.NODE_ENV === "production";
}

export function getBasePath() {
  return process.env.basePath;
}
