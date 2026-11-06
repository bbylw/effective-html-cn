/**
 * 技能参考数据。
 * 用途措辞严格对应仓库 README 的技能表，不做扩写；
 * artifact / question / contract 三列依据上游 8 份 SKILL.md 提炼。
 */

export type DemoKey =
  | 'router'
  | 'bigpics'
  | 'onepager'
  | 'direction'
  | 'wireframe'
  | 'prototype'
  | 'plan'
  | 'diagram';

export interface Skill {
  /** 技能目录名，同时用于拼接仓库路径 */
  slug: string;
  /** 适用场景（README 原文） */
  use: string;
  /** 上游来源说明 */
  origin?: string;
  /** 这件成果的形态 */
  artifact: string;
  /** 成果要帮评审者回答的问题 */
  question: string;
  /** 从 SKILL.md 提炼的核心契约 */
  contract: string[];
  /** 展厅成果组件标识 */
  demo: DemoKey;
}

export interface SkillGroup {
  /** 分组序号，显示为 01 / 02 … */
  index: string;
  label: string;
  /** 该组在整条工作流中的位置说明 */
  role: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    index: '01',
    label: '入口',
    role: '分配工作',
    skills: [
      {
        slug: 'html',
        use: '处理范围较广的 HTML 请求、混合型成果、报告、说明文档、演示文稿、落地页和工具，并在需要时转交给专用技能',
        artifact: '请求路由图',
        question: '这个请求该交给哪个技能？',
        contract: [
          '先按最窄的技能路由，只有宽泛请求才留在这里',
          '落笔前定下受众、形态、语域、保真度、交互五件事',
          '换个主题若同样成立，说明方向太通用，必须重做',
        ],
        demo: 'router',
      },
    ],
  },
  {
    index: '02',
    label: '解释与呈现',
    role: '把主题讲清楚',
    skills: [
      {
        slug: 'big-pics-little-words',
        use: '用大幅视觉元素和精简文字在 HTML 中解释当前主题，同时保留关键细节',
        origin: '复制自 bro',
        artifact: '大图小字解释页',
        question: '不看长文，能一眼看懂吗？',
        contract: [
          '大幅视觉承担解释，文字只补关键细节',
          '措辞简洁、不用术语，假设读者第一次接触',
          '视觉只在真有帮助时才加，不用装饰凑数',
        ],
        demo: 'bigpics',
      },
      {
        slug: 'one-pager',
        use: '制作单页：一个 HTML 页面，用大幅图片和精简文字，尽早与队友分享想法，或为他们回顾已完成的工作',
        origin: '复制自 bro',
        artifact: '一页纸提案',
        question: '一分钟能判断要不要做吗？',
        contract: [
          '一页之内让只有一分钟的同事看懂',
          '大图小字，但不隐瞒关键细节',
          '不用怪异隐喻，直说要对方判断什么',
        ],
        demo: 'onepager',
      },
      {
        slug: 'design-artifact',
        use: '为任何 HTML 成果提供贴合主题的创意方向，同时避免套用固定的视觉风格',
        artifact: '设计计划卡',
        question: '视觉方向是从主题里长出来的吗？',
        contract: [
          '先找项目既有设计系统，有就沿用',
          '先写设计计划：4–6 个有名字的颜色、2 种以上字体、一句布局主张',
          '不链接字体 CDN，明暗两套主题同等对待',
        ],
        demo: 'direction',
      },
    ],
  },
  {
    index: '03',
    label: '结构与行为',
    role: '测试与实现',
    skills: [
      {
        slug: 'html-wireframe',
        use: '用低保真布局方案测试内容、层级、导航、流程和响应式结构',
        artifact: '两个结构方向',
        question: '内容层级和导航该是哪一种？',
        contract: [
          '刻意保持未完成：灰阶、系统字、朴素边框',
          '结构未定时给 2–3 个真正不同的方向，用键盘可切换',
          '用真实标签，低保真不是允许用匿名占位块',
        ],
        demo: 'wireframe',
      },
      {
        slug: 'html-prototype',
        use: '创建包含真实状态、交互、键盘支持和响应式行为的可用原型',
        artifact: '可跑的审批流程',
        question: '这条流程真的走得通吗？',
        contract: [
          '先分保真模式：静态 mockup 还是可跑的 prototype',
          '动手前列出状态：加载、空、错误、成功、禁用、窄屏',
          '键盘走完整流程，状态不能只靠颜色表达',
        ],
        demo: 'prototype',
      },
    ],
  },
  {
    index: '04',
    label: '计划与图',
    role: '固定需求与关系',
    skills: [
      {
        slug: 'html-plan',
        use: '创建计划、路线图、发布安排和实施步骤，同时保留源材料中的既定要求',
        artifact: '可追溯的发布计划',
        question: '源材料里的承诺有没有丢？',
        contract: [
          '保留源材料的范围、顺序、承诺与术语',
          '把已定决策、假设、待解问题分开写',
          '时间线和依赖只在真实存在时才画',
        ],
        demo: 'plan',
      },
      {
        slug: 'html-diagram',
        use: '创建架构图、时序图、流程图、状态图、层级图、时间线图和系统图',
        artifact: '可切换的关系模型',
        question: '关系用哪种模型才说得清？',
        contract: [
          '先选模型：拓扑、时序、流程、状态、层级、时间线、矩阵',
          '再选渲染方式，不因为「是图」就默认用 SVG',
          '意义不能只靠动画或颜色单独承载',
        ],
        demo: 'diagram',
      },
    ],
  },
];

export const skillCount: number = skillGroups.reduce((n, g) => n + g.skills.length, 0);

/** 展厅用的扁平技能列表，顺序与 README 表格一致 */
export const allSkills: Skill[] = skillGroups.flatMap((group) => group.skills);

export const repoUrl = 'https://github.com/plannotator/effective-html';

export function skillUrl(slug: string): string {
  return `${repoUrl}/blob/main/skills/${slug}/SKILL.md`;
}

export interface BuildContract {
  label: string;
  detail: string;
  /** 本站如何体现，或为何不适用于介绍站 */
  note: string;
}

/** 共性 Build contract：逐条来自上游 SKILL.md，不是我们的发挥 */
export const buildContracts: BuildContract[] = [
  {
    label: '一个自包含 HTML 文件',
    detail: 'CSS 与 JavaScript 内联，双击即可打开，不需要构建步骤、服务器或网络。',
    note: '技能产物必须如此；本站是 Astro 介绍页，不是成果文件，展厅里演示的是产物的形态。',
  },
  {
    label: '真实内容，不用占位符',
    detail: '不用 lorem ipsum、假数据、装饰性统计或点了没反应的控件。',
    note: '展厅八件成果都用真实标签、真实状态；每个按钮都有确切效果。',
  },
  {
    label: '内容决定结构',
    detail: '顺序按序读，比较便于扫读，界面暴露状态与动作，图让关系可读。',
    note: '对照台用同一份内容切换载体，结构随形态变化，而不是套同一套卡片。',
  },
  {
    label: '键盘能走完整个流程',
    detail: '原生控件、可见焦点、方向键切换、对话框 Esc 关闭并恢复焦点。',
    note: '对照台、展厅、线框方向、原型流程都支持键盘操作。',
  },
  {
    label: '不链接字体 CDN',
    detail: 'design-artifact 明确禁止 Google Fonts 等外部字体，改用内嵌字体或系统字体栈。',
    note: '本站已移除 Google Fonts，改用本地系统字体栈。',
  },
  {
    label: '宽窄都要验证',
    detail: '桌面与窄屏都打开，检查阅读顺序、换行、溢出、焦点与每条点击路径。',
    note: '本页在 1440px 与 390px 实测，宽内容放在独立滚动容器里。',
  },
  {
    label: '没有意外的横向溢出',
    detail: '刻意很宽的内容放进可滚动或可平移的容器，不把滚动泄漏给页面主体。',
    note: '代码、图与表格各自限宽；390px 视口下文档宽度等于视口宽度。',
  },
  {
    label: '状态不只靠颜色表达',
    detail: '加载、空、错误、成功、禁用都要有文字与语义，不能只换个颜色。',
    note: '原型成果用状态文字与 aria-live 播报，不依赖单一色相。',
  },
];

/** 技能如何协作：README「技能如何协作」一节，逐条对应 */
export const collaboration: string[] = [
  '视觉方向来自对话、项目、受众和主题。',
  'design-artifact 提供可复用的设计流程，但不规定重复使用的视觉风格。',
  '线框图刻意保持未完成感，让评审者专注于结构。',
  '原型实现一条可信的流程及其相关状态。',
  '计划保留源材料中的既定要求。',
  '示意图会选择适合所表达关系的视觉模型和渲染方式。',
  '每项成果都应具备响应式布局和无障碍支持，能够独立运行，并在浏览器中完成验证。',
];

export interface InstallMethod {
  id: string;
  name: string;
  note: string;
  lines: string[];
}

export const installMethods: InstallMethod[] = [
  {
    id: 'skills',
    name: '安装技能集',
    note: '希望智能体把这些参考资料作为可复用的工作流时，安装整个技能集。',
    lines: ['npx skills add plannotator/effective-html'],
  },
  {
    id: 'claude',
    name: 'Claude Code 插件',
    note: '通过插件市场添加并安装。',
    lines: [
      '/plugin marketplace add plannotator/effective-html',
      '/plugin install plannotator-effective-html@effective-html',
    ],
  },
  {
    id: 'codex',
    name: 'Codex 插件',
    note: '同样走插件市场，命令前缀不同。',
    lines: [
      'codex plugin marketplace add plannotator/effective-html',
      'codex plugin add plannotator-effective-html@effective-html',
    ],
  },
];

/** 单技能安装示例，从 README 中摘录 */
export const singleInstall: string[] = [
  'npx skills add plannotator/effective-html --list',
  'npx skills add plannotator/effective-html --skill big-pics-little-words',
  'npx skills add plannotator/effective-html --skill one-pager',
  'npx skills add plannotator/effective-html --skill design-artifact',
  'npx skills add plannotator/effective-html --skill html-wireframe',
  'npx skills add plannotator/effective-html --skill html-prototype',
];

export interface Companion {
  name: string;
  action: string;
  url: string;
  note?: string;
}

export const companions: Companion[] = [
  {
    name: 'Plannotator',
    action: '渲染并标注本地 HTML',
    url: 'https://github.com/backnotprop/plannotator',
    note: '本项目由它渲染标注',
  },
  {
    name: 'tot',
    action: '为 HTML 文件创建可分享的链接',
    url: 'https://github.com/plannotator/tot',
  },
  {
    name: 'Effective HTML 指南',
    action: '不安装也能直接阅读的完整说明',
    url: 'https://www.effectivehtml.com/',
    note: '把它当作参考资料即可',
  },
  {
    name: 'The unreasonable effectiveness of HTML',
    action: '本项目的灵感来源',
    url: 'https://thariqs.github.io/html-effectiveness',
    note: 'Thariq Shihipar',
  },
];
