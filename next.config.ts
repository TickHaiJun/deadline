import type { NextConfig } from "next";
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  /* config options here */
};


module.exports = withMDX({
  // 其他 Next.js 配置
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
});

export default nextConfig;
