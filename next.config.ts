import withBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

let apiOrigin: string | null = null;

if (apiUrl) {
  try {
    apiOrigin = new URL(apiUrl).origin;
  } catch (error) {
    console.warn("[security] Invalid NEXT_PUBLIC_API_URL provided, falling back to 'self' only on connect-src");
  }
}

const connectSources = ["*"];

if (apiOrigin) {
  connectSources.push(apiOrigin);
}

const ContentSecurityPolicy = `
  default-src 'self';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'self';
  object-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  font-src 'self';
  connect-src ${connectSources.join(" ")};
  frame-src 'self';
  media-src 'none';
  upgrade-insecure-requests;
`;

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

// Ativa bundle analyzer se ANALYZE=true
const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Security headers applied to every route
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default withAnalyzer(nextConfig);
