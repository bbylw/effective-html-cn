/**
 * 指南内容。
 * 结构参考官网 /docs 导航，内容由官方指南要点与上游 8 份 SKILL.md 的契约编译而成，
 * 不逐字翻译原文。每篇都会自动生成一份可复制的 Markdown，方便直接交给智能体。
 */

export interface DocSection {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  callout?: { label: string; text: string };
}

export interface DocLink {
  title: string;
  note: string;
  url: string;
}

export interface Doc {
  /** guide 对应 /docs/，其余对应 /docs/<slug>/ */
  slug: string;
  title: string;
  group: string;
  summary: string;
  lead: string[];
  sections: DocSection[];
  example?: { label: string; note: string; href: string };
  sourceLinks?: DocLink[];
  /** 对应的上游技能目录名 */
  skillSlug?: string;
}

const ex = (slug: string, label: string, note: string) => ({
  label,
  note,
  href: `/examples/#${slug}`,
});

export const docs: Doc[] = [
  {
    slug: 'guide',
    group: '开始',
    title: 'Effective HTML 指南',
    summary: '一份关于线框图、模型、原型、示意图、演示稿与其他 HTML 成果的简短指南。',
    lead: [
      '智能体可以制作线框图、静态模型、可交互原型、示意图、演示稿和小型界面。它们常常比一段很长的提示词或一份 Markdown 文件更容易理解。',
      '这是一份关于这些用途的简短指南。你不需要先安装技能，也不必遵循固定流程。把示例当作参考，直接向智能体索要你需要的那件成果。',
    ],
    sections: [
      {
        id: 'browse-examples',
        title: '浏览示例',
        paragraphs: [
          '本站收录了八个技能各自会产出的成果，全部可以直接打开、切换、用键盘操作，不是截图。',
          '指南的其余部分按问题组织：为什么用 HTML、大图小字、一页纸、设计成果、选择保真度，以及线框图、原型、示意图、演示稿与计划。',
        ],
        callout: {
          label: '从成果开始',
          text: '与其读一段用途说明，不如打开一件成果看它到底怎么工作。',
        },
      },
      {
        id: 'sources',
        title: '这份指南参考了什么',
        paragraphs: ['这些材料是 Effective HTML 与上游技能集的共同来源，方便你继续往下读。'],
      },
      {
        id: 'where-to-start',
        title: '从哪一篇开始',
        bullets: [
          '不确定该不该用 HTML：读「为什么用 HTML」。',
          '结构还没定：读「线框图」；流程要能点通：读「原型」。',
          '关系比文字重要：读「示意图」；承诺不能被改掉：读「计划」。',
          '想给队友快速讲清一件事：读「大图小字」或「一页纸」。',
          '拿不准该做多细：读「选择保真度」。',
        ],
      },
      {
        id: 'install',
        title: '安装技能集',
        paragraphs: [
          '当你希望智能体把这些参考资料当作可复用的工作流使用时，安装整个技能集。三种环境任选其一；也可以用 --skill 只装其中一个。',
        ],
      },
    ],
    sourceLinks: [
      {
        title: 'The unreasonable effectiveness of HTML',
        note: 'Thariq Shihipar · Anthropic',
        url: 'https://claude.com/blog/using-claude-code-the-unreasonable-effectiveness-of-html',
      },
      {
        title: 'HTML effectiveness examples',
        note: '二十件可检查的 HTML 成果',
        url: 'https://thariqs.github.io/html-effectiveness/',
      },
      {
        title: 'Understanding is the new bottleneck',
        note: 'Geoffrey Litt',
        url: 'https://www.geoffreylitt.com/2026/07/02/understanding-is-the-new-bottleneck',
      },
      {
        title: 'Frontend Slides',
        note: 'GitHub 仓库',
        url: 'https://github.com/zarazhangrui/frontend-slides',
      },
      {
        title: 'Visual Explainer',
        note: 'Nico Bailon · 可视 HTML 智能体技能',
        url: 'https://github.com/nicobailon/visual-explainer',
      },
    ],
    example: { label: '打开成果目录', note: '八件可交互成果', href: '/examples/' },
  },
  {
    slug: 'why-html',
    group: '开始',
    title: '为什么用 HTML',
    summary: 'Markdown 适合线性说明；当理解成本来自结构、状态或关系时，HTML 更合适。',
    lead: [
      '大多数说明用 Markdown 就够了。真正费力的时候，往往不是文字不够多，而是读者要在脑内还原一张图、一条流程或一组状态。',
      'HTML 可以直接把这些东西摆出来：并排的方案、能点的流程、稳定位置的节点、宽窄不同的布局。评审者不必先想象，就能指出问题。',
    ],
    sections: [
      {
        id: 'when',
        title: '什么时候值得换成 HTML',
        bullets: [
          '需要比较两个或三个设计方向，而不是读一段描述。',
          '需要切换状态、触发反馈、走一遍失败与恢复。',
          '内容本身就是关系、时序、拓扑或层级。',
          '要交给别人检查、批注、指方向，而不只是阅读。',
          '响应式结构本身就是评审问题。',
        ],
      },
      {
        id: 'what-it-adds',
        title: 'HTML 能补上什么',
        paragraphs: [
          '看见结构：布局、层级与断点选择直接可见。测试行为：状态、反馈与产品边界可以真的操作一遍。直接交付：协作者拿到的是一件能打开的成果，而不是一段需要转述的文字。',
        ],
        callout: {
          label: '判断标准',
          text: '如果换一种载体后，评审者能问出不一样的问题，这次替换就是值得的。',
        },
      },
      {
        id: 'when-not',
        title: '什么时候别用',
        bullets: [
          '内容本身就是线性的说明或清单，Markdown 更快。',
          '没有需要比较、切换或检查的东西，只是把段落搬进卡片。',
          '为了显得精致而加装饰、动画或点了没反应的控件。',
        ],
      },
    ],
    example: ex('html', '请求路由示例', '宽泛请求该交给哪个技能'),
  },
  {
    slug: 'choosing-fidelity',
    group: '开始',
    title: '选择保真度',
    summary: '低保真线框、静态模型与可跑原型不是精细程度的滑动条，而是三种不同的评审问题。',
    lead: [
      '先问这次要评审什么，再决定做到多细。结构没定时，精致的视觉会把讨论带偏；需要验证交互时，一张静态图又答不了问题。',
      '同一个请求可以在不同阶段产出不同保真度的成果。尽量保持核心内容与结构一致，让差异只来自保真度本身。',
    ],
    sections: [
      {
        id: 'modes',
        title: '三种模式',
        bullets: [
          '线框：回答信息层级、导航、分组与桌面到移动的重排。刻意保持未完成。',
          '模型（mockup）：回答视觉层级、排版、配色与产品契合度。大多静态。',
          '原型（prototype）：回答导航、输入、状态变化、反馈与恢复。必须真的能跑。',
        ],
      },
      {
        id: 'rules',
        title: '别做错的事',
        bullets: [
          '不要为了显得完整，给静态模型硬加交互。',
          '不要把换色、微调卡片间距当成不同的结构方向。',
          '不要跨模式偷偷改内容，否则比较结果不可信。',
        ],
        callout: {
          label: '来自 SKILL.md',
          text: 'mockup 是 html-prototype 里的静态保真模式，不是一个独立技能。',
        },
      },
    ],
    example: ex('html-wireframe', '两个结构方向', '同一份内容，两种布局'),
  },
  {
    slug: 'big-pics-little-words',
    group: '表达',
    title: '大图小字',
    summary: '用大幅视觉和极少的文字解释当下主题，同时保留关键细节。',
    lead: [
      '当读者第一次接触一个主题时，一张组织得当的大图往往比三段解释更快。文字只负责补上图里说不出的关键细节。',
      '少字不等于省事：细节不能因为排版干净就被删掉，术语也不能因为看着专业就留下来。',
    ],
    sections: [
      {
        id: 'contract',
        title: '这份技能的要求',
        bullets: [
          '大幅视觉承担解释，文字只补关键细节。',
          '措辞简洁、不用术语，假设读者第一次接触。',
          '视觉只在真有帮助时才加，不用装饰凑数。',
          '把关键数字与条件留在图下，不因「少字」而丢失。',
        ],
      },
      {
        id: 'avoid',
        title: '常见偏差',
        paragraphs: [
          '最容易出现的是「图很大但没信息」：用通用插画填满版面，读者看完仍然不知道谁依赖谁。另一个极端是把整段说明压成几个词，把约束和例外全都丢了。',
        ],
      },
    ],
    skillSlug: 'big-pics-little-words',
    example: ex('big-pics-little-words', '大图小字示例', '一份成果，三个人，一个决定'),
  },
  {
    slug: 'one-pager',
    group: '表达',
    title: '一页纸',
    summary: '一个 HTML 页面，尽早把想法交给队友，或为他们复盘已完成的工作。',
    lead: [
      '读者是第一次接触这件事的人，而且只有一分钟。一页纸要让他立刻知道：发生了什么、谁受影响、需要他判断什么。',
      '它常在想法还很早的时候使用，用来换第一反应；也可以在工作结束后用来复盘。两种情况都不该写成一份完整报告。',
    ],
    sections: [
      {
        id: 'contract',
        title: '这份技能的要求',
        bullets: [
          '一页之内让只有一分钟的同事看懂。',
          '大图小字，但不隐瞒关键细节。',
          '不用怪异隐喻，直说要对方判断什么。',
          '用真实姓名、数量与日期，不写占位文案。',
        ],
      },
      {
        id: 'shape',
        title: '页面里该有什么',
        paragraphs: [
          '标题说清主张；中间一块大幅图示承担解释；下面列三到五条真实要点；最后一句明确写出需要读者给出的判断或决定。',
        ],
      },
    ],
    skillSlug: 'one-pager',
    example: ex('one-pager', '一页纸提案', '需要你判断：值不值得试用'),
  },
  {
    slug: 'designing-artifacts',
    group: '表达',
    title: '设计成果',
    summary: '为任何 HTML 成果提供贴合主题的创意方向，同时避免套用固定的视觉风格。',
    lead: [
      '这份技能不规定一套可复用的配色或卡片系统。它要求先看清主题、受众和项目既有的设计语言，再决定这一件成果该长什么样。',
      '把设计当成落笔前的一份计划，而不是写完页面后再补一层装饰。',
    ],
    sections: [
      {
        id: 'plan-first',
        title: '先写设计计划',
        paragraphs: [
          '在写代码之前，先定下 4–6 个有名字的颜色、覆盖两种以上角色的字体、以及一句能说清组织方式的布局主张。之后每个颜色与字号都要能追回这份计划。',
        ],
      },
      {
        id: 'rules',
        title: '硬规则',
        bullets: [
          '先找项目既有设计系统（AGENTS.md、DESIGN.md、token 或现有组件），有就沿用。',
          '不链接 Google Fonts 等字体 CDN，改用内嵌字体或系统字体栈。',
          '明暗两套主题同等对待，组件只消费变量，不在媒体查询里改样式。',
          '间距交给 flex / grid 的 gap；宽内容放进独立滚动容器。',
          '编号、标签、分隔线只在顺序或分组真实存在时使用。',
        ],
        callout: {
          label: '原创性检查',
          text: '换个主题若同一套视觉仍然成立，说明方向太通用，要重做。',
        },
      },
    ],
    skillSlug: 'design-artifact',
    example: ex('design-artifact', '设计计划卡', '先定 token，再写页面'),
  },
  {
    slug: 'wireframes',
    group: '成果',
    title: '线框图',
    summary: '用 HTML 线框图比较布局、层级、导航与响应式结构。',
    lead: [
      '线框图展示一页或一个流程如何组织，而不呈现成品设计。智能体可以把同一份需求变成几个 HTML 线框，让你在桌面和窄屏分别打开比较。',
      '它应该帮评审者决定「什么该在屏幕上、任务该怎么走」，而不是引发一场关于配色的讨论。',
    ],
    sections: [
      {
        id: 'question',
        title: '结构能否在表面完成之前被判断',
        paragraphs: [
          '三个观察点：层级——最重要的决定与阻塞项是否主导页面；边界——主操作与辅助操作是否明显分开；重排——窄屏下内容顺序是否保持不变。',
        ],
      },
      {
        id: 'what-it-shows',
        title: '线框能展示什么',
        bullets: [
          '内容层级与密度。',
          '导航与页面结构。',
          '响应式布局。',
          '同一份内容的多种组织方式。',
          '控件的顺序与分组。',
        ],
      },
      {
        id: 'keep-focus',
        title: '把注意力留在结构上',
        bullets: [
          '灰阶、系统字、朴素边框，刻意保持未完成。',
          '用真实标签和代表性内容，不用匿名方块或 lorem ipsum。',
          '结构未定时给 2–3 个真正不同的方向，配一个键盘可操作的切换器。',
          '只加有助于评审的行为；不做动画、持久化或模拟接口。',
          '单个自包含 HTML 文件，宽窄都验证，页面无意外横向溢出。',
        ],
      },
    ],
    skillSlug: 'html-wireframe',
    example: ex('html-wireframe', '两个结构方向', '侧栏概览与分步流程'),
  },
  {
    slug: 'prototypes',
    group: '成果',
    title: '原型',
    summary: '用一条真的能跑通的流程，测试状态、反馈、恢复与产品边界。',
    lead: [
      '原型不是「看起来更像产品」的静态图，而是把重要的行为问题变得可测试。选择最小的一段可信流程，把状态走完，比铺开一整个假产品更有价值。',
      '先分清模式：只评审视觉层级时用静态 mockup；评审导航、输入、状态变化或恢复时才做 prototype。',
    ],
    sections: [
      {
        id: 'states',
        title: '动手前先列状态',
        bullets: [
          '加载、空、错误、成功、禁用、窄屏。',
          '业务特有的状态，例如「等待第二人确认」。',
          '看似异步的操作，通常要能走加载 → 成功 / 失败 → 恢复。',
          '被禁用的操作要说清为什么禁用。',
        ],
      },
      {
        id: 'complete',
        title: '让交互完整',
        bullets: [
          '用原生控件，键盘能走完整个建模流程。',
          '焦点始终可见；有意义的状态变化后要安排焦点。',
          '对话框有可访问名称、包含焦点、Esc 关闭并恢复焦点。',
          '错误信息与对应控件关联，并说明怎么修复。',
          '状态不只靠颜色表达，要有文字与语义。',
        ],
        callout: {
          label: '边界要诚实',
          text: '属于真实系统的动作不要假装在原型里完成，写清哪里会由产品接管。',
        },
      },
      {
        id: 'contract',
        title: '构建契约',
        paragraphs: [
          '单个自包含 HTML 文件，不需要构建、登录、实时接口或外部服务；响应式组合而不是缩小一张桌面画布；深度与正确性优先于假装覆盖很多页面。',
        ],
      },
    ],
    skillSlug: 'html-prototype',
    example: ex('html-prototype', '可跑的审批流程', '未通过 → 重试 → 成功'),
  },
  {
    slug: 'diagrams',
    group: '成果',
    title: '示意图',
    summary: '用最小的视觉模型，把关系讲得比散文清楚。',
    lead: [
      '先确定读者要回答的问题，再选择图形形式。不是所有关系都该画成一样的方框加箭头，也不是因为是图就必须用 SVG。',
      '标签、分组、方向与连线先清楚，再考虑交互和视觉处理。',
    ],
    sections: [
      {
        id: 'models',
        title: '先选模型',
        bullets: [
          '拓扑：组件与连接；时序：按时间排列的消息。',
          '流程：步骤、分支与交接；状态：转移与条件。',
          '层级：包含或归属；时间线：随时间的变化。',
          '矩阵：重复出现的关系；量化视图：当数值大小重要时。',
        ],
      },
      {
        id: 'rendering',
        title: '再选渲染方式',
        paragraphs: [
          'HTML + CSS、SVG、Canvas 或 WebGL 按信息量与规模选择。保持节点位置稳定，减少边交叉和含糊的箭头；刻意很宽的画布放进可平移或可滚动的容器。',
        ],
        bullets: [
          '只在有助于回答问题时加入排序、筛选、路径追踪或缩放。',
          '重要的意义不能只靠动画或颜色单独承载。',
          '提供可访问的文本替代；控件可键盘操作并尊重减少动效偏好。',
        ],
      },
    ],
    skillSlug: 'html-diagram',
    example: ex('html-diagram', '两种关系模型', '拓扑与时序，渲染方式不同'),
  },
  {
    slug: 'decks',
    group: '成果',
    title: '演示稿',
    summary: '浏览器原生的短演示，用方向键翻页，不需要导出步骤。',
    lead: [
      '一次会议规模的故事可以直接做成 HTML：一页一个主张，按真实顺序排列，用键盘前进后退。',
      '它仍然是自包含的文件，打开就能讲；不需要先导出成图片或 PDF。',
    ],
    sections: [
      {
        id: 'shape',
        title: '组织方式',
        bullets: [
          '一页只放一个主张，配一张能说明它的图或表。',
          '保留源材料的顺序与术语，不为凑页数增加空页。',
          '方向键、Home / End 与可见的页码让导航可预期。',
          '宽窄都要能读；不要靠缩放整张桌面画布来适配。',
        ],
      },
      {
        id: 'motion',
        title: '动效的位置',
        paragraphs: [
          '切页动效只在帮助理解连续性或顺序时使用。若去掉动画不损失任何含义，就去掉它；并始终尊重系统的减少动效偏好。',
        ],
      },
    ],
    example: ex('one-pager', '一页纸示例', '单页叙事的最小形态'),
  },
  {
    slug: 'plans',
    group: '成果',
    title: '计划',
    summary: '把源材料变成可以检查、可以执行的计划，且不丢原有承诺。',
    lead: [
      '计划的价值在于可追溯：谁负责什么、先后次序、依赖与验收条件，都能对照源材料核对。',
      '改进语法和结构是允许的，把一份实施计划膨胀成战略仪表盘则不是。',
    ],
    sections: [
      {
        id: 'what-it-needs',
        title: '先决定计划需要什么',
        bullets: [
          '阶段或顺序；状态与决策点。',
          '负责人与协作者；依赖与风险。',
          '验收检查；尚未解决的问题。',
          '源材料没给出的时间线、进度百分比或仪表盘摘要，不要凭空添加。',
        ],
      },
      {
        id: 'traceability',
        title: '保持可追溯',
        bullets: [
          '保留源材料的范围、顺序、承诺与术语。',
          '把已定决策、假设、待解问题分开写。',
          '精确的映射、比较与重复字段交给表格。',
          '只在确实让顺序更好懂时才画流程或时间线。',
          '长段落保持可读，不必强行塞进卡片。',
        ],
      },
      {
        id: 'contract',
        title: '构建契约',
        paragraphs: [
          '单个响应式、可访问的自包含 HTML 文件；使用语义化标题、列表、表格与地标；导航与折叠可键盘操作；检查没有承诺在重排中消失。',
        ],
      },
    ],
    skillSlug: 'html-plan',
    example: ex('html-plan', '可追溯的发布计划', '阶段、负责人、依赖与待解问题'),
  },
];

export const docGroups: { label: string; slugs: string[] }[] = [
  { label: '开始', slugs: ['guide', 'why-html', 'choosing-fidelity'] },
  { label: '表达', slugs: ['big-pics-little-words', 'one-pager', 'designing-artifacts'] },
  { label: '成果', slugs: ['wireframes', 'prototypes', 'diagrams', 'decks', 'plans'] },
];

export function getDoc(slug: string): Doc | undefined {
  return docs.find((doc) => doc.slug === slug);
}

export function docHref(slug: string): string {
  return slug === 'guide' ? '/docs/' : `/docs/${slug}/`;
}

/** 从结构化内容生成可复制的 Markdown，避免手写两份内容产生漂移。 */
export function docMarkdown(doc: Doc): string {
  const lines: string[] = [`# ${doc.title}`, '', doc.summary, ''];
  for (const paragraph of doc.lead) lines.push(paragraph, '');
  for (const section of doc.sections) {
    lines.push(`## ${section.title}`, '');
    for (const paragraph of section.paragraphs ?? []) lines.push(paragraph, '');
    for (const bullet of section.bullets ?? []) lines.push(`- ${bullet}`);
    if (section.bullets?.length) lines.push('');
    if (section.callout) lines.push(`> ${section.callout.label}：${section.callout.text}`, '');
  }
  if (doc.sourceLinks?.length) {
    lines.push('## 参考来源', '');
    for (const link of doc.sourceLinks) lines.push(`- [${link.title}](${link.url}) — ${link.note}`);
    lines.push('');
  }
  if (doc.example) lines.push(`## 相关成果`, '', `- ${doc.example.label}：${doc.example.note}（${doc.example.href}）`, '');
  return `${lines.join('\n').trim()}\n`;
}
