/** 文档区交互：复制 Markdown、侧栏筛选与 Ctrl/⌘+K、页内目录高亮。 */

function initCopyMarkdown(): void {
  const button = document.querySelector<HTMLButtonElement>('[data-copy-markdown]');
  if (!button) return;
  const status = button.querySelector<HTMLElement>('[data-copy-status]');

  button.addEventListener('click', async () => {
    const text = button.dataset.markdown ?? '';
    try {
      await navigator.clipboard.writeText(text);
      if (status) status.textContent = '已复制';
    } catch {
      if (status) status.textContent = '复制失败，请检查剪贴板权限';
      return;
    }
    window.setTimeout(() => {
      if (status) status.textContent = '复制 Markdown';
    }, 1800);
  });
}

function initDocsFilter(): void {
  const input = document.querySelector<HTMLInputElement>('[data-docs-filter]');
  if (!input) return;

  const items = Array.from(document.querySelectorAll<HTMLElement>('[data-docs-item]'));
  const groups = Array.from(document.querySelectorAll<HTMLElement>('[data-docs-group]'));

  const apply = (): void => {
    const query = input.value.trim().toLowerCase();
    items.forEach((item) => {
      item.hidden = query !== '' && !(item.dataset.search ?? '').toLowerCase().includes(query);
    });
    groups.forEach((group) => {
      group.hidden = Array.from(group.querySelectorAll<HTMLElement>('[data-docs-item]')).every(
        (item) => item.hidden,
      );
    });
  };

  input.addEventListener('input', apply);
  document.addEventListener('keydown', (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      const nav = document.querySelector<HTMLDetailsElement>('[data-docs-nav]');
      if (nav) nav.open = true;
      input.focus();
      input.select();
    }
    if (event.key === 'Escape' && document.activeElement === input) {
      input.value = '';
      apply();
      input.blur();
    }
  });
}

function initDocsNav(): void {
  const nav = document.querySelector<HTMLDetailsElement>('[data-docs-nav]');
  if (nav && window.matchMedia('(max-width: 860px)').matches) nav.open = false;
}

function initToc(): void {
  const sections = Array.from(document.querySelectorAll<HTMLElement>('.doc-section'));
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-toc-link]'));
  if (!sections.length || !links.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        links.forEach((link) => {
          link.dataset.active = String(link.dataset.tocLink === entry.target.id);
        });
      }
    },
    { rootMargin: '-90px 0px -65% 0px', threshold: 0 },
  );
  sections.forEach((section) => observer.observe(section));
}

initCopyMarkdown();
initDocsFilter();
initDocsNav();
initToc();
