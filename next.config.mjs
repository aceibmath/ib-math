/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true }, // ← dezactivează ESLint în build
};

export default nextConfig;
