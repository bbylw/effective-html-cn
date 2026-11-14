/** 文档区交互：复制 Markdown、侧栏筛选与 Ctrl/⌘+K、页内目录高亮。 */

function initCopyMarkdown(): void {
  const button = document.querySelector<HTMLButtonElement>('[data-copy-markdown]');
  if (!button) return;
  // 反馈气泡必须是按钮外的独立 live region：按钮子元素是呈现性的，读屏器不一定播报。
  const feedback = button.closest<HTMLElement>('[data-copy-feedback]');
  const tip = feedback?.querySelector<HTMLElement>('[data-copy-status]');
  if (!feedback || !tip) return;

  let timer = 0;
  let lastMessage = '';
  const report = (ok: boolean, message: string): void => {
    window.clearTimeout(timer);
    feedback.removeAttribute('data-copied');
    feedback.removeAttribute('data-failed');
    tip.textContent = '';
    // VoiceOver 会跳过同一区域中与上一条相同的消息，追加不发音的空格以便重复播报。
    let spoken = message;
    if (spoken === lastMessage) spoken += '\u00A0';
    lastMessage = spoken;
    void feedback.offsetWidth;
    feedback.setAttribute(ok ? 'data-copied' : 'data-failed', '');
    requestAnimationFrame(() => (tip.textContent = spoken));
    timer = window.setTimeout(() => {
      feedback.removeAttribute('data-copied');
      feedback.removeAttribute('data-failed');
      tip.textContent = '';
    }, 2000);
  };

  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.markdown ?? '');
      report(true, '已复制 Markdown');
    } catch {
      report(false, '复制失败，请检查剪贴板权限');
    }
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
  if (nav && window.matchMedia('(max-width: 53.75em)').matches) nav.open = false;
}

function initToc(): void {
  const sections = Array.from(document.querySelectorAll<HTMLElement>('.doc-section'));
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-toc-link]'));
  if (!sections.length || !links.length) return;

  // 视觉态用 :target-current / .target-current，语义态始终镜像到 aria-current。
  const setCurrent = (id: string | null): void => {
    links.forEach((link) => {
      const active = id !== null && link.dataset.tocLink === id;
      link.classList.toggle('target-current', active);
      link.setAttribute('aria-current', String(active));
    });
  };

  const native =
    CSS.supports('scroll-target-group: auto') && CSS.supports('selector(:target-current)');

  if (native) {
    const sync = (): void => {
      const current = document.querySelector<HTMLAnchorElement>('[data-toc] a:target-current');
      setCurrent(current?.dataset.tocLink ?? null);
    };
    sync();
    document.addEventListener('scrollend', sync);
    return;
  }

  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setCurrent(entry.target.id);
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
