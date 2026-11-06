import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const lines = ['User-agent: *', 'Allow: /'];

  // 仅在配置了本站正式域名（而非 Astro 的 localhost 回退）时声明 sitemap。
  const publicSite =
    site && !['localhost', '127.0.0.1', '[::1]'].includes(site.hostname) ? site : null;
  if (publicSite) {
    lines.push(`Sitemap: ${new URL('sitemap-index.xml', publicSite).href}`);
  }

  return new Response(`${lines.join('\n')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
