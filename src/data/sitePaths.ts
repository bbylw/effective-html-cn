/**
 * 站内路径统一入口。
 *
 * GitHub Pages 项目页部署在 /<repo>/ 子路径下（由 SITE_BASE 配置 Astro 的 base）。
 * Astro 会自动给 CSS/JS 等构建资源加 base 前缀，但手写的 href/src 不会，
 * 所以所有站内链接与静态资源都必须经过 siteHref()，否则部署后会指向域名根目录。
 */
const base: string = import.meta.env.BASE_URL || '/';

/** 把站内绝对路径（如 `/docs/`）转换为带部署 base 的地址。 */
export function siteHref(path = '/'): string {
  return `${base}${path.replace(/^\/+/, '')}`;
}
