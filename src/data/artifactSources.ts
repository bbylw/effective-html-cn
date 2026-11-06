import type { DemoKey } from './skills';

/**
 * 展厅「查看结构」里展示的 HTML 要点，均为对应成果组件的真实结构节选。
 * 这里刻意只给骨架：技能产物应该是单个自包含 HTML 文件，而不是一整页源码。
 */
export const artifactSources: Record<DemoKey, string> = {
  router: `<ol class="route">
  <li><span>结构还没定？</span><a href="#wireframe">html-wireframe</a></li>
  <li><span>流程要能点通？</span><a href="#prototype">html-prototype</a></li>
  <li><span>关系比文字重要？</span><a href="#diagram">html-diagram</a></li>
  <li><span>以上都不是</span><strong>留在本技能</strong></li>
</ol>`,

  bigpics: `<figure>
  <svg viewBox="0 0 480 220" role="img" aria-label="一份成果传给三位评审者">
    <!-- 节点与连线由内容决定，不用装饰图形 -->
  </svg>
  <figcaption>一份成果，三个人，一个决定</figcaption>
</figure>
<p class="detail">关键细节写在图下，不因「少字」而丢失。</p>`,

  onepager: `<article>
  <h1>把周报变成一页 HTML</h1>
  <figure><!-- 大幅图示 --></figure>
  <ul>
    <li>谁受影响：每周写周报的 12 个人</li>
    <li>要省下什么：重复复制的 20 分钟</li>
  </ul>
  <p>需要你判断：值不值得在下周试用一次？</p>
</article>`,

  direction: `/* 先写计划，再写页面 */
:root {
  --paper: #faf7f2;
  --ink: #17140f;
  --accent: #b2331a;
  --font-display: serif;
  --font-body: system-ui, sans-serif;
}
/* 布局：一条竖向评审动线；宽内容放进独立滚动容器 */`,

  wireframe: `<fieldset>
  <legend>结构方向</legend>
  <button aria-pressed="true">A 侧栏概览</button>
  <button aria-pressed="false">B 分步流程</button>
</fieldset>
<section data-direction="A">
  <nav>发布清单 / 评审人 / 阻塞项</nav>
  <main>待评审：结算页改版</main>
</section>
<section data-direction="B" hidden>…</section>`,

  prototype: `<form>
  <label for="env">发布环境</label>
  <select id="env"><option>预发</option><option>生产</option></select>
  <label><input type="checkbox" /> 已确认回滚方案</label>
  <button type="submit" disabled>发起审批</button>
</form>
<p role="status" aria-live="polite">尚未选择发布环境</p>`,

  plan: `<table>
  <thead><tr><th>阶段</th><th>负责人</th><th>依赖</th></tr></thead>
  <tbody>
    <tr><td>评审稿</td><td>设计</td><td>—</td></tr>
    <tr><td>灰度</td><td>后端</td><td>评审通过</td></tr>
  </tbody>
</table>
<section><h3>已定决策</h3>…</section>
<section><h3>待解问题</h3>…</section>`,

  diagram: `<fieldset>
  <legend>关系模型</legend>
  <button data-model="topology" aria-pressed="true">拓扑</button>
  <button data-model="sequence" aria-pressed="false">时序</button>
</fieldset>
<div data-panel="topology">组件与连接</div>
<div data-panel="sequence" hidden>按时间排列的消息</div>`,
};
