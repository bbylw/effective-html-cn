/**
 * 展厅交互。各成果组件只负责结构与样式，键盘行为统一在这里初始化一次。
 * 约定：外层 [data-tabs-scope] 内含一个 [data-tablist] 与若干 [data-panel]。
 */

function initTabs(): void {
  document.querySelectorAll<HTMLElement>('[data-tabs-scope]').forEach((scope) => {
    const list = scope.querySelector<HTMLElement>('[data-tablist]');
    if (!list) return;

    const tabs = Array.from(list.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
    // 展厅外层 scope 内部还嵌着各成果自己的 scope，只认直接属于本 scope 的 panel。
    const panels = Array.from(
      scope.querySelectorAll<HTMLElement>('[data-panel]'),
    ).filter((panel) => panel.closest('[data-tabs-scope]') === scope);
    if (!tabs.length || !panels.length) return;

    const activate = (tab: HTMLButtonElement, focus = false): void => {
      tabs.forEach((item) => {
        const active = item === tab;
        item.setAttribute('aria-selected', String(active));
        item.tabIndex = active ? 0 : -1;
      });
      panels.forEach((panel) => {
        panel.hidden = panel.dataset.panel !== tab.dataset.tab;
      });
      if (focus) tab.focus();
    };

    tabs.forEach((tab, index) => {
      tab.tabIndex = index === 0 ? 0 : -1;
      tab.addEventListener('click', () => activate(tab));
    });

    // 从指南跳到 /examples/#<slug> 时，直接打开对应技能。
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (hash) {
      const target = tabs.find((tab) => tab.dataset.tab === hash);
      if (target) activate(target);
    }

    const vertical = list.getAttribute('aria-orientation') === 'vertical';
    const previousKey = vertical ? 'ArrowUp' : 'ArrowLeft';
    const nextKey = vertical ? 'ArrowDown' : 'ArrowRight';

    list.addEventListener('keydown', (event: KeyboardEvent) => {
      const current = tabs.indexOf(document.activeElement as HTMLButtonElement);
      if (current < 0) return;

      let next = -1;
      if (event.key === nextKey) next = (current + 1) % tabs.length;
      else if (event.key === previousKey) next = (current - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;

      if (next >= 0) {
        event.preventDefault();
        activate(tabs[next], true);
      }
    });
  });
}

function initPrototype(): void {
  const form = document.querySelector<HTMLFormElement>('[data-prototype]');
  if (!form) return;

  const scope = form.closest<HTMLElement>('[data-prototype-scope]');
  const status = scope?.querySelector<HTMLElement>('[data-prototype-status]');
  const result = scope?.querySelector<HTMLElement>('[data-prototype-result]');
  const select = form.querySelector<HTMLSelectElement>('select');
  const rollback = form.querySelector<HTMLInputElement>('input[type="checkbox"]');
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const reset = scope?.querySelector<HTMLButtonElement>('[data-prototype-reset]');
  if (!status || !result || !select || !rollback || !submit) return;

  let timer = 0;

  const say = (message: string, state: string): void => {
    status.textContent = message;
    status.dataset.state = state;
    result.hidden = true;
  };

  const syncEnabled = (): void => {
    submit.disabled = !select.value || submit.dataset.busy === 'true';
  };

  select.addEventListener('change', () => {
    syncEnabled();
    if (select.value) say(`已选择「${select.selectedOptions[0]?.textContent ?? ''}」，可以发起审批。`, 'ready');
    else say('尚未选择发布环境。', 'empty');
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!select.value) return;

    submit.dataset.busy = 'true';
    submit.disabled = true;
    submit.textContent = '提交中…';
    say('正在等待审批服务（加载中）。', 'loading');

    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      submit.dataset.busy = 'false';
      submit.textContent = '发起审批';
      syncEnabled();

      if (select.value === 'production' && !rollback.checked) {
        say('未通过：生产发布需要勾选「已确认回滚方案」，勾选后可重试。', 'error');
        rollback.focus();
        return;
      }

      say('审批已提交，编号 #2481。', 'success');
      result.hidden = false;
      result.querySelector<HTMLElement>('[data-prototype-number]')!.textContent =
        select.value === 'production' ? '生产环境 · #2481' : '预发环境 · #2481';
    }, 700);
  });

  reset?.addEventListener('click', () => {
    window.clearTimeout(timer);
    form.reset();
    submit.dataset.busy = 'false';
    submit.textContent = '发起审批';
    result.hidden = true;
    syncEnabled();
    say('已重置，尚未选择发布环境。', 'empty');
    select.focus();
  });

  syncEnabled();
}

initTabs();
initPrototype();
