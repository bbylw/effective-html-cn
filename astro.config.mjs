import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// 部署时用 SITE_URL 指定本站的绝对地址。未配置时不输出 canonical、也不生成
// sitemap，避免把中文介绍页错误地归到上游英文站 www.effectivehtml.com 名下。
// GitHub Pages 项目页部署在 /<repo>/ 子路径下，用 SITE_BASE 指定；本地与根域名部署时留空。
const site = process.env.SITE_URL?.trim() || undefined;
const siteBase = process.env.SITE_BASE?.trim() || '/';

export default defineConfig({
  site,
  base: siteBase,
  trailingSlash: 'always',
  // 只排除 404 页本身。不能写成 !page.includes('404')：自定义域名里可能带 404
  // （例如 w404.nyc.mn），那样会把整站的 URL 全部误过滤掉。
  integrations: site
    ? [sitemap({ filter: (page) => !/\/404(?:\.html)?\/?$/.test(new URL(page).pathname) })]
    : [],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});
