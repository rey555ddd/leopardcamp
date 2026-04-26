/**
 * Cloudflare Pages Functions — Middleware
 * 敏感路徑強制 404（資安 audit P2 #7、補 SPA fallback 的洞）
 */

// 🔒 資安 audit P2 #7（2026-04-26）：
// CF Pages 對「destination 不存在的路徑」會 ignore _redirects、
// SPA fallback 會把 /.env /.git/HEAD /wrangler.toml 等回 200 + index.html。
// 改用 middleware 直接攔截、回真正的 404。
const SENSITIVE_PATHS = [
  /^\/\.env(\.|$)/,
  /^\/\.git(\/|$)/,
  /^\/\.dev\.vars$/,
  /^\/\.npmrc$/,
  /^\/\.prettierrc$/,
  /^\/wrangler\.toml$/,
  /^\/package(-lock)?\.json$/,
  /^\/pnpm-lock\.yaml$/,
  /^\/yarn\.lock$/,
  /^\/tsconfig(\..*)?\.json$/,
  /^\/vite\.config\.(ts|js)$/,
  /^\/Dockerfile$/i,
  /^\/docker-compose\..*$/i,
  /^\/schema\.sql$/,
];

export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  if (SENSITIVE_PATHS.some((re) => re.test(url.pathname))) {
    return new Response('Not Found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain', 'X-Robots-Tag': 'noindex' },
    });
  }
  return context.next();
};
