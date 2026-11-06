import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// 部署时用 SITE_URL 指定本站的绝对地址。未配置时不输出 canonical、也不生成
// sitemap，避免把中文介绍页错误地归到上游英文站 www.effectivehtml.com 名下。
const site = process.env.SITE_URL?.trim() || undefined;

export default defineConfig({
  site,
  trailingSlash: 'always',
  integrations: site ? [sitemap({ filter: (page) => !page.includes('404') })] : [],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});
