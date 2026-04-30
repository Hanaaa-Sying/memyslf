# 网站改动记录 · Status Log

---

## 2026-04-30（当前）

### Hero 布局对齐
- 将照片画廊从 `hero-inner` 外移入 `hero-left` 内部，使左右两列真正等高
- 移除 `.hero-left::after` 伪元素装饰线，改为真实 DOM 元素 `.hero-divider`（便于控制间距）
- 给 `.hero-left` 加 `display: flex; flex-direction: column`，使内容从上到下排列
- 给 `.hero-cards` 加 `padding-top: calc(clamp(2.4rem,5vw,3.6rem) * 1.725 + 22px)`，使"我的简历"框上边对齐左侧 tagline
- 给 `.hero-cards` 加 `justify-content: space-between`，使"最近在思考"框底部对齐画廊底部
- 左右列间距从默认值调整为 `gap: 100px`
- 移动端响应式：在 `max-width: 768px` 下重置 `hero-cards` 的 `padding-top: 0`

### 图片部署问题修复
- 将 gallery 三张图的 `onerror` 改为：隐藏破损 img，同时给父 `<figure>` 加 `.img-error` 类
- 新增 CSS：`.gallery-photo.img-error .no-img { display: flex; }` 显示占位提示文字
- 修复 `.no-img` 样式规则中 `display: none` 与 `display: flex` 同处一个规则的冲突
- 部署说明：需将整个 `MeMyself` 文件夹拖入 Netlify，而非单个 `index.html`

---

## 历史改动（按功能模块整理）

### 架构：单文件方案
- 将原多文件方案（`index.html` + `style.css` + `main.js` + `content.js` + `config.js`）合并为单个自包含 `index.html`
- 原因：本地双击打开时浏览器 CORS 策略阻止多文件加载，单文件可直接运行
- 保留 `.gitignore` 排除 `config.js`（含 Notion API 密钥）

### 技术栈
- 框架：纯 HTML + CSS + 原生 JS，无依赖
- 字体：Google Fonts — Lora（衬线正文）+ DM Sans（无衬线导航/标签）
- 色彩：`--bg: #fff8f0`、`--accent-dark: #c4895a`、`--accent-light: #e8b88a`、`--text-dark: #2d1f0e`
- 动效：`IntersectionObserver` 实现滚动淡入（`.fade-up` 类）
- 布局：CSS Grid（hero 双列、resume 双列）+ Flexbox（卡片、画廊）

### 内容填充
- Hero：姓名 李思莹 / Hana，tagline 中山大学管理学院 · 意大利博科尼交流生
- Hero bio：尼泊尔瑜伽认证 + 博科尼交流 + 欧洲旅行的个人介绍（含 👋 emoji）
- 教育：执信中学（2018–2024）· 中山大学（2024–2028）· 博科尼（2026.02–2026.06）
- 项目经历：6 条（米兰租金分析、并购网络分析、游艇咨询、商业网络研究、公益布草、调酒创业）
- 技能：数据分析 / AI 工具 / 设计内容 / 语言 / 不务正业的（瑜伽、羽毛球、合唱、吉他、钢琴、攀岩）
- 作品集：6 张项目卡片，含 `detail` 字段驱动弹窗
- 底部联系方式：邮箱 `3116220254@qq.com`，公众号「这个老三样」

### 双语切换
- `COPY = { zh: {...}, en: {...} }` 对象存储所有 UI 文案
- `switchLang()` 函数一键切换，所有内容同步更新
- 所有板块（导航、Hero、简历、作品集、思考、底部）均支持双语

### 简历板块
- 双列布局：左列（教育 + 项目经历时间线）/ 右列（技能标签）
- 修复：`.resume-block-title` 字号从 11px 全大写改为 `1.15rem` 衬线字体 + 下边框，解决标题比内容字还小的问题
- 修复：项目卡片标题/角色字段混淆 — 改为 `project`（大标题）+ `role`（小副标题）

### 作品集板块
- 自动填充卡片网格（`auto-fill`，最小宽度 280px）
- 每张卡片点击弹出 modal，展示项目 `detail` 详情
- Modal 支持 ESC 键、点击遮罩、点击 ✕ 三种关闭方式
- 未上线项目显示「尚未完工」提示文案

### 「最近在思考」板块
- 支持展开/收起交互（`.thinking-card` + `.thinking-body.open`）
- 顶部 `MY_POSTS` 数组：直接在代码里粘贴标题+摘要即可发布，无需后台
- Notion API 集成（可选）：配置 `NOTION_CONFIG` 后自动拉取；未配置则显示 `MY_POSTS`
- 加载失败时回退到 `MY_POSTS`，不崩溃

### Hero 照片画廊
- 删除姓名上方大头照
- 三格画廊：左一张 3:4 竖版（moment-1.jpg）+ 右两张 4:3 横版（moment-2/3.jpg）
- 数学推导：左图宽占 53%，使两侧高度近似相等
- 移除照片上所有文字覆盖（`figcaption`、`.no-img` 默认隐藏）
- 图片路径：`images/moment-1/2/3.jpg`（需将文件放入项目 `images/` 文件夹）

### Bug 修复
- `hero-name` innerHTML 反斜杠拼写错误（`<\em>` → `</em>`）
- `gallery-photo img` CSS 重复定义冲突（两个 `img` 规则合并为一个）
- `no-img` 样式中 `display: none` 与 `display: flex` 同规则冲突（拆分为基础样式 + 错误状态类）

---

*文件由 Claude Code 自动整理 · 2026-04-30*
