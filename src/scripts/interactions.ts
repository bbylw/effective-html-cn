/**
 * 展厅交互。各成果组件只负责结构与样式，键盘行为统一在这里初始化一次。
 * 约定：外层 [data-tabs-scope] 内含一个 [data-tablist] 与若干 [data-panel]。
 */

/** 只滚最近的滚动容器，避免切换 tab 时把整页带走。container 是较新的选项。 */
const revealTab = (tab: HTMLElement): void => {
  const options: ScrollIntoViewOptions & { container?: string } = {
    block: 'nearest',
    inline: 'nearest',
    container: 'nearest',
  };
  tab.scrollIntoView(options);
};

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
        // until-found 让未选中面板仍可被页内查找命中；不支持该值的浏览器
        // 会把它当作普通布尔 hidden，行为自动降级为不可查找。
        if (panel.dataset.panel === tab.dataset.tab) panel.removeAttribute('hidden');
        else panel.setAttribute('hidden', 'until-found');
      });
      revealTab(tab);
      if (focus) tab.focus();
    };

    tabs.forEach((tab, index) => {
      tab.tabIndex = index === 0 ? 0 : -1;
      tab.addEventListener('click', () => activate(tab));
    });

    // 页内查找命中隐藏面板时，浏览器在展开前触发 beforematch，同步选中态。
    panels.forEach((panel) => {
      panel.addEventListener('beforematch', () => {
        const target = tabs.find((tab) => tab.dataset.tab === panel.dataset.panel);
        if (target) activate(target);
      });
    });

    // 从指南跳到 /examples/#<slug> 时直接打开对应技能；同页内改 hash 也要跟随。
    const openFromHash = (): void => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      if (!hash) return;
      const target = tabs.find((tab) => tab.dataset.tab === hash);
      if (target) activate(target);
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);

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
  const error = scope?.querySelector<HTMLElement>('[data-prototype-error]');
  const select = form.querySelector<HTMLSelectElement>('select');
  const rollback = form.querySelector<HTMLInputElement>('input[type="checkbox"]');
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const reset = scope?.querySelector<HTMLButtonElement>('[data-prototype-reset]');
  if (!status || !result || !error || !select || !rollback || !submit) return;

  let timer = 0;

  // 视觉错误文本、aria-invalid 与 aria-describedby 必须同一时刻出现/消失：
  // 错误文本若一直挂在 aria-describedby 上，隐藏时也会被读屏器念出来。
  const setFieldError = (invalid: boolean): void => {
    rollback.setAttribute('aria-invalid', String(invalid));
    if (invalid && rollback.dataset.error) {
      rollback.setAttribute('aria-describedby', rollback.dataset.error);
    } else {
      rollback.removeAttribute('aria-describedby');
    }
    error.hidden = !invalid;
  };

  const say = (message: string, state: string): void => {
    status.textContent = message;
    status.dataset.state = state;
    result.hidden = true;
  };

  const syncEnabled = (): void => {
    submit.disabled = !select.value || submit.dataset.busy === 'true';
  };

  select.addEventListener('change', () => {
    setFieldError(false);
    syncEnabled();
    if (select.value) say(`已选择「${select.selectedOptions[0]?.textContent ?? ''}」，可以发起审批。`, 'ready');
    else say('尚未选择发布环境。', 'empty');
  });

  // 用户勾上回滚方案后立即清掉错误态，不必等到下次提交。
  rollback.addEventListener('change', () => {
    if (rollback.checked) setFieldError(false);
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
        setFieldError(true);
        say('未通过：生产发布需要勾选「已确认回滚方案」，勾选后可重试。', 'error');
        // 提交失败时把焦点移到出错控件，让读屏器直接念出它的错误说明。
        rollback.focus();
        return;
      }

      setFieldError(false);
      say('审批已提交，编号 #2481。', 'success');
      result.hidden = false;
      result.querySelector<HTMLElement>('[data-prototype-number]')!.textContent =
        select.value === 'production' ? '生产环境 · #2481' : '预发环境 · #2481';
    }, 700);
  });

  reset?.addEventListener('click', () => {
    window.clearTimeout(timer);
    form.reset();
    setFieldError(false);
    submit.dataset.busy = 'false';
    submit.textContent = '发起审批';
    result.hidden = true;
    syncEnabled();
    say('已重置，尚未选择发布环境。', 'empty');
    select.focus();
  });

  // 初始就写 aria-invalid="false"，避免 Firefox / Safari 把空的必填项提前判为无效。
  setFieldError(false);
  syncEnabled();
}

initTabs();
initPrototype();
