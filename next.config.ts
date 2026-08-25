import type { NextConfig } from "next";

const CSP = [
  "default-src 'self'",
  // Next.js requires unsafe-eval/unsafe-inline for client-side hydration
  "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://connect.facebook.net https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https: blob:",
  "media-src 'self' https://www.youtube-nocookie.com https://www.youtube.com",
  "frame-src 'self' https://www.youtube-nocookie.com https://www.youtube.com https://youtube.com https://*.youtube.com https://maps.google.com https://www.google.com https://www.facebook.com",
  "connect-src 'self' https://api.mercadopago.com https://www.facebook.com https://connect.facebook.net https://*.supabase.co https://api.sanity.io https://*.sanity.io",
  "form-action 'self' https://www.facebook.com",
  "frame-ancestors 'none'",
].join("; ");

// X-Frame-Options se eliminó: frame-ancestors 'none' en el CSP ya cubre la
// protección contra clickjacking, y evita el conflicto con los iframes
// externos (YouTube, Maps) que sí queremos poder embeber via frame-src.
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  { key: "Content-Security-Policy", value: CSP },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
      {
        // Página estática con ISR (revalidate: 3600) — permite que el CDN
        // sirva la respuesta cacheada y la revalide en background.
        source: "/configurador",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
