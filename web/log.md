# 网站改动日志

> 记录每次对 index.html 及相关文档的改动。
>
> **格式：**
> ```
> ## YYYY-MM-DD — 一句话概括
> **改动内容：** 做了什么
> **实施路径：** 如何实现的（供下次参考）
> ```

---

## 2026-06-17 — 导航栏新增「预约时间 / Book a Time」按钮

**改动内容：** 导航栏缺少指向底部 `#booking`「如果你想和我聊些什么」预约板块的入口，补上。在 `最近在思考` 之后、`EN` 语言切换按钮之前新增一个导航项，中文「预约时间」/ 英文「Book a Time」，锚点链到 `#booking`。

**实施路径：** 4 处改动——(1) HTML `#nav-links` 内 line 440 新增 `<li><a href="#booking" id="nav-booking">预约时间</a></li>`；(2) `COPY.zh` 新增 `navBooking: "预约时间"`；(3) `COPY.en` 新增 `navBooking: "Book a Time"`；(4) 渲染函数新增 `document.getElementById("nav-booking").textContent = c.navBooking;`（紧跟 nav-thinking setter，line 1283）。自查：`nav-booking` 引用 2 处（anchor + JS）、`navBooking` 3 处（zh/en COPY + JS）、`#booking` 锚点存在、`<script>` 3/3 配对，通过。

---

## 2026-06-17 — 删博科尼 calendar 卡片 + 新增 Handcue（手势 Vibe Coding）项目 + 改板块标题

**改动内容：**
- **删除** 作品集中 `id: "bocconi-finals"` 卡片（中英都删）。已确认无任何 `experience` 条目以 `portfolioId: "bocconi-finals"` 引用它，删除不破坏跳转。
- **板块标题**：`COPY.zh.resumeExpTitle` `项目经历` → `项目经历（非实习经历）`；`COPY.en` `Experience` → `Project Experience (Non-Internship)`；同步改 HTML 中 `id="resume-exp-label"` 的初始文案（JS 会用 COPY 覆盖，仍一并改保持一致）。
- **新增简历经历**（`COPY.zh`/`.en` `experience` 数组首位，置顶最新）：Handcue — 手势驱动的 Vibe Coding 工具（Agent Builder Hackathon · 深圳 2026，2026.06.14 深大粤海，二等奖），角色「创意构思 · UI 设计 · 美术资产」，`portfolioId: "handcue"`，3 条 bullet。按用户要求未强调赛道。
- **新增作品卡片**（占位）：复用被删 `bocconi-finals` 的 web 槽位，新建 `id: "handcue"` 卡片（中英），detail 含手势词汇表 / 工作流 / 设计理念 / 我的贡献，并放「🏆 二等奖」徽章 + 「可交互 Demo 完善中」占位，待产品打磨后替换为 Demo 链接。

**实施路径：** 标题改 3 处（line 520 HTML + zh/en COPY）；`experience` 数组在 tripsync 前各插一条 handcue；作品卡片把 `bocconi-finals` 对象的 header 字段与 detail 字符串分两步 Edit 替换为 handcue（同时完成删除+新增）。bullet/desc 中含中文直角引号处：英文 desc/bullet 的 ASCII `"` 已用 `\"` 转义，中文用「」书名号或置于反引号 detail 内（debug-rules 规则 line 160）。自查：`id:"handcue"`×2、`portfolioId:"handcue"`×2、`bocconi-finals`×0、`<script>` 3/3 配对，全部通过。

---

## 2026-06-09 — 一拍迹合卡片新增「打开产品」按钮 + 休眠提示

**改动内容：** 为 `tripsync` 卡片弹窗加上线上 demo 链接。原「查看代码 →」单按钮改为双按钮：主按钮「打开产品 → / Live Demo →」链到 Render 部署地址 `https://tripsync-pk66.onrender.com`（实心 accent 色），次按钮「查看代码 / View Code」改为描边样式链到 GitHub。按钮下方加一行大白话休眠提示（中英双语）：首次打开约等 30–60 秒，服务器休眠中被唤醒属正常现象。提示放在卡片（点击前）而非产品内，因为 Render 冷启动期间浏览器空白、产品页尚未起来。

**实施路径：** 改 `PROJECTS.zh` / `PROJECTS.en` 中 `id: "tripsync"` 卡片 detail 里的按钮 `<div>`：margin-bottom 24→10，新增主按钮 + 描边次按钮，其后插入 `font-size:12px;color:var(--text-light)` 的提示 div（margin-bottom:24px）。

---

## 2026-06-09 — 作品集 + 简历新增「一拍迹合 / TripSync」抖音黑客松项目

**改动内容：**
- 作品集 `PROJECTS.zh` / `PROJECTS.en` 各新增一张 VibeCoding 卡片（id: `tripsync`，category: `web`，置于数组首位）：一拍迹合 · AI 个人向旅行规划（抖音 AI 创变者黑客松·广州站 2026）。弹窗含核心创新 / 端到端流程 / 我的贡献 / 技术栈四段。
- 简历 `COPY.zh.experience` / `COPY.en.experience` 各新增一条经历（置于首位，period 2026.06）：角色「产品 + UI 设计」，`portfolioId: "tripsync"` 跳转上述卡片，3 条 bullet。
- **git 链接已补**：卡片内"查看代码 → / View Code →"按钮链接 `https://github.com/Hanaaa-Sying/tripsync`（去 `.git` 后缀），zh / en 两处占位 span 已替换为正式 `<a>` 按钮。

**实施路径：** 在 `PROJECTS.zh`/`.en` 数组的 `id: "bocconi-finals"` 卡片前各插入一个 `tripsync` 对象；在 `COPY.zh`/`.en` 的 `experience` 数组首项（米兰项目前）各插入一条经历。含直角引号的 bullet 用反引号包裹（debug-rules 规则10）；`portfolioId` 与 `PROJECTS.id` 一致。尚未 push（待补链接 + 用户确认）。

---

## 2026-05-26 — 工具箱新增 /mkskill 条目

**改动内容：** 在「我的工具箱」卡片 detail 中追加 `/mkskill` 工具条目（中英双语）。mkskill 功能：把重复性工作流自动封装成 Claude Code Skill，生成规范的 SKILL.md 文件，支持项目级 / 全局两种存放位置。GitHub：https://github.com/Hanaaa-Sying/mk-skill

**实施路径：** 在 PROJECTS.zh 和 PROJECTS.en 的 my-toolbox detail 字符串末尾，于闭合 `</div></div>` 前插入新工具卡片 div。

---

## 2026-05-26 — 简历时间字段更新：米兰项目与SNA项目结束时间改为2026.05

**改动内容：**
- zh `period: "2026.02 — 至今"` → `"2026.02 — 2026.05"`（米兰短租溢价分析）
- zh `period: "2026.03 — 至今"` → `"2026.03 — 2026.05"`（社会网络分析）
- en `period: "Feb 2026 — Present"` → `"Feb 2026 — May 2026"`
- en `period: "Mar 2026 — Present"` → `"Mar 2026 — May 2026"`

**实施路径：** 直接替换 COPY.zh 和 COPY.en 中 experience 对应条目的 period 字段。

---

## 2026-05-26 — 作品集新建「我的工具箱」卡片，归并 tableau-merger

**改动内容：**
- 将原 `【VibeCoding】Tableau 多工作簿合并 /tableaumerger Skill` 卡片替换为 `【VibeCoding】我的工具箱`（id: `my-toolbox`）
- 工具箱卡片展开后以工具条目卡片形式展示每个 skill：命令名（/tableaumerger）+ 简称 + 功能说明 + GitHub 链接按钮
- 中英文同步：zh title「我的工具箱」/ en title「My Toolbox」
- 设计思路：可扩展结构，后续新增 skill 只需在 detail 内追加同样的工具条目 div

**实施路径：** 直接替换 PROJECTS.zh 和 PROJECTS.en 中对应的对象，id 由 `tableau-merger` 改为 `my-toolbox`；detail 改为以 flex-column 排列的工具卡片列表。

---

## 2026-05-24 — 预约网格 hover preview 逻辑修正（两轮迭代）

**改动内容：** `setupColEvents` 的 `mousemove` 逻辑最终改为：只要鼠标在可交互列内（非 past、非 blocked），无论悬停在什么格（available / 3h 以内 / 时长溢出 / busy 灰色格），均始终显示完整时长尺寸的 preview 阴影；阴影会叠加在 busy 灰色块上，视觉上展示冲突区域。click 逻辑：busy 格点击静默返回，3h 内格抖动提示，时长不足格显示「那会儿没法和你聊这么久哦！」，有效格正常选中。

**实施路径：** `mousemove` handler 仅保留「getCellAt 返回 null 时隐藏」判断，移除所有 class 检查；`click` handler 保留 `.busy` 格静默返回。

---

## 2026-05-24 — 预约网格手机端适配修复

**改动内容：**
1. **左侧面板全宽**：`bw-left` 在移动端改为 `width: 100%; box-sizing: border-box`，确保填满容器
2. **垂直滚动**：移除 `bw-right { height: 400px }` 和 `overflow: hidden`，改为 `height: auto; overflow: visible`；`bw-grid-outer` 在移动端改为 `overflow: auto; height: 360px`，使 56 格（560px）在 360px 窗口内可上下滚动
3. **水平滚动触控支持**：`bw-grid-outer` 移动端加 `touch-action: pan-x pan-y`（允许原生双向触控滚动）和 `-webkit-overflow-scrolling: touch`（iOS Safari）；`.bw-selected` 全局加 `touch-action: none`，使拖拽换位在移动端仍可通过 pointer event 触发
4. **顶部角落 sticky**：`.bw-corner` 加 `position: sticky; left: 0; z-index: 11`，与时间轴保持一致，水平滚动时列标题与列内容不错位

**实施路径：**
- 仅 CSS 改动，无 JS 变更
- 移动端 media query（640px）重写：去掉旧的 `min-width: 44px` 覆盖（JS inline style 优先级更高），更新 bw-left/bw-right/bw-grid-outer 属性
- 全局：bw-corner 加 sticky，bw-selected 加 touch-action

---

## 2026-05-24 — 预约网格：当前时间线修复 + 7天初始视图

**改动内容：**
1. **时间线修复①（时间标签恢复）**：now-line 从列内移出后时间标签丢失；改为在 `#bw-time-axis`（sticky 时间轴）内追加 `.bw-now-label` div，`position: absolute; right: 3px`，确保横向滚动时标签始终可见
2. **时间线修复②（横向滚动后消失）**：now-line 曾用 `right: 0`，在 flex overflow 容器中该值等于布局宽度而非内容宽度；改为 JS 读取 `body.scrollWidth - 44` 赋给 `line.style.width`，确保线条横穿全部列
3. **7天初始视图**：`buildWeekGrid` 启动时测量 `bw-grid-outer.clientWidth`，计算 `colWidth = Math.max(60, Math.floor((outerW - 44) / 7))`；为每个 header cell 和 day column 设置 `flex:none; width/min-width: colWidth`，使 14 天总宽度 = 2× 可视宽度，初始显示 7 天，后 7 天通过水平滚动访问

**实施路径：**
- CSS：新增 `.bw-now-label`（position absolute，right 3px，z-index 11，sticky 时间轴内锚定）；删除 `.bw-now-line` 的 `right: 0`
- JS `renderNowLine`：改用 `body.scrollWidth - 44` 作为 line width；在 `#bw-time-axis` 追加 label
- JS `buildWeekGrid`：开头读取 `outer.clientWidth` 并计算 `colWidth`，header cells 内联 style，day col DOM 节点设 `flex/width/min-width`

---

## 2026-05-24 — 预约网格六项交互体验优化

**改动内容：**
1. **整体放大**：widget 高度 `540px` → `min(700px, 88vh)`，max-width `980px` → `1100px`，左侧面板宽度 `210px` → `240px`
2. **当前时间线横穿所有日期**：now-line 从今日列的 `.bw-cells-wrap` 移至 `#bw-grid-body`，CSS 改为 `left: 44px; right: 0`，视觉上横穿全部 14 列
3. **无需上下滚动可见全部时段**：单元格高度 `20px` → `10px`，时间轴行高同步，`overflow-y: hidden` 禁止垂直滚动；每隔 2 小时显示一个时间标签避免拥挤
4. **14天横向滑轨**：去掉「上一周 / 下一周」按钮，`renderWeekGrid` 一次性渲染 `DAYS_AHEAD`（14）天；日期标题栏仅保留日期范围文字；用户通过 `bw-grid-outer` 的 `overflow-x: auto` 横向滚动查看未来日期
5. **拖拽换位**：`.bw-selected` 改为 `pointer-events: auto; cursor: grab`；新增 `setupDragOnSelDiv(selDiv, wrap)` 函数，`pointerdown` 捕获拖动，`pointermove` 时临时隐藏 selDiv 后用 `elementFromPoint` 找目标列并显示预览，`pointerup` 时若目标合法则更新 `_selectedDate/_selectedTime`，在新列创建 selDiv 并递归设置拖拽；操作中通过 `selDiv.isConnected` 检测 DOM 脱离
6. **颜色简化 + 时长警告**：移除可预约格的琥珀色背景（仅保留 hover 效果）；新增 `showDurationWarning()` 函数，点击因时长不足无法预约的格时，左侧提示栏临时显示「那会儿没法和你聊这么久哦！」并抖动，3 秒后恢复；`COPY.zh/en` 各新增 `bookingDurationWarning` 字段

**实施路径：**
- CSS：修改 `.booking-widget`、`.bw-left`、`.bw-cell`、`.bw-ta-row`、`.bw-grid-outer`、`.bw-now-line`（及 `::before`）、`.bw-selected` 共 8 处
- HTML：删除 `#bw-prev-week` / `#bw-next-week` 按钮，仅保留 `#bw-week-label`
- COPY：zh + en 各增 `bookingDurationWarning`
- JS：`renderWeekGrid` 改为渲染 14 天 + 存入 `_currentBusyIntervals`；`updateWeekNav` 改为用 `dates[dates.length-1]` 且移除按钮禁用逻辑；`buildWeekGrid` CELL_H 20→10，时标每 2 小时显示一次，在已选 block 上调用 `setupDragOnSelDiv`；`setupColEvents` CELL_H 20→10，点击无效格调用 `showDurationWarning()`，创建 selDiv 后调用 `setupDragOnSelDiv()`；`renderNowLine` 改为往 `#bw-grid-body` 追加 now-line；新增 `showDurationWarning()` 和 `setupDragOnSelDiv()` 函数；`initBooking` 移除前/后周按钮监听器；新增模块级 `_currentBusyIntervals = []`

---

## 2026-05-24 — 预约区域从「先选日期再选时间」改为「双周可视化网格视图」

**改动内容：**
- 移除月历点击 + 弹窗模式，改为内嵌双栏 widget（左侧设置面板 + 右侧周视图网格）
- 右侧网格：顶部粘性日期表头（周几 + 日期）、左侧粘性时间轴（08:00–22:00，每整点一行标注）、7 列 × 56 格（每格 20px = 15min）
- 可预约格：浅暖色背景，鼠标悬停显示预览 block（高度随时长自动）；点击选中后出现深棕色 selected block 并显示起止时间标签
- 已占用格：浅灰暖色；已过期/超出预约窗口格：更浅灰；封锁日（黑客松）：斜线纹理覆盖层
- 今日列显示当前时间线（实心点 + 横线）；每 30 秒自动更新
- 前 / 下一周导航按钮，DAYS_AHEAD=14 共显示两周
- 时长选择器变更时清除已选，并重新渲染网格
- 时区切换即时重新渲染网格（保留已选日期时间）
- 语言切换时重新渲染网格（周日名等随语言变化）
- 移除了弹窗 HTML（`#booking-day-modal`）及其所有相关 JS（renderCalendar / openDayModal / closeDayModal / renderDayTimeline / renderNowIndicators）
- 保留并复用：fetchFreeBusy / getHanaTz / localToUtcMs / is15MinBusyMs / canStartAtMs / getMaxDurationForDay / shakeLeadNotice / updateSelectedSummary / onBookingSubmit

**实施路径：**
- CSS：删除全部 `.booking-day-modal*`、`.bdm-cell*`、`.bdm-sleep-bar*`、`.bdm-now-*` 等，新增 `.booking-widget`、`.bw-left`、`.bw-right`、`.bw-grid-*`、`.bw-day-*`、`.bw-cell*`、`.bw-now-line`、`.bw-preview`、`.bw-selected` 等
- HTML：用 `.booking-widget` 替换 `.booking-cal-wrap`；彻底删除弹窗 div
- JS state：`_calYear/_calMonth/_dayMaxDuration/_timelineAbortCtrl` → `_weekOffset/_gridAbortCtrl`
- 新增函数：`addDaysToStr` / `fetchBusyForWeek` / `updateWeekNav` / `buildWeekGrid` / `setupColEvents` / `renderNowLine` / `renderWeekGrid`
- `renderBookingCopy` 删去已不存在的 ID 引用，末尾加 `if(bw-grid-body) renderWeekGrid()`
- `initBooking` 重写：绑定周导航 / 时区 / 时长 / 表单提交事件，调用 `renderWeekGrid()`

---

## 2026-05-23 — 雅思成绩更新为 8.0

**改动内容：** 简历中英文版雅思成绩从 7.0 改为 8.0。

**实施路径：** 在 `COPY.zh.skills` 和 `COPY.en.skills` 的语言组 items 数组中，直接替换字符串内容。中文第 608 行、英文第 725 行（行号随后续改动偏移）。

---

## 2026-05-23 — 简历布局重构（多次迭代）

**改动内容：** 原布局为左列（教育+项目经历）+ 右列（技能）的两列网格。经多次尝试后最终改为全宽单列：教育经历 → 项目经历 → 技能，依次垂直排列。

**实施路径：**
- 移除 `.resume-grid` 双列结构，改为 `.resume-full`（`display: flex; flex-direction: column; gap: 48px`）。
- HTML 中将三个区块各自包在独立 `<div>` 里，去掉 `resume-col-left` / `resume-col-right` 分列。
- 项目经历由 `exp-grid`（2列）改回 `timeline`（单列），保留时间轴竖线语义。
- 响应式 `@media (max-width: 900px)` 中移除对 `exp-grid` 的覆盖。

---

## 2026-05-25 — 时区下拉框整理 + 黑客松封锁日日期纠正及可视化文字

**改动内容：**
1. **时区选项整理**：将原 14 个选项中重复的 UTC+8（北京/上海、香港/台北、新加坡三项）合并为一个「北京 (UTC+8)」，底层值 `Asia/Shanghai`；删除「胡志明」附注，曼谷简写；总选项从 14 缩减至 12 个，按 UTC 偏移升序排列（洛杉矶 UTC-8/-7 → 悉尼 UTC+10/11）
2. **封锁日日期纠正**：`BLOCKED_DAYS` 原为 `2026-06-07` + `2026-06-08`，纠正为 `2026-06-06` + `2026-06-07`（实际黑客松日期）
3. **封锁日文字显示**：封锁日文案从 tooltip 改为列内竖排可见文字；`.bw-blocked-col` 加 `display:flex; align-items/justify-content: center`，内嵌 `<span writing-mode:vertical-rl>` 显示文字，半透明白底衬底（`rgba(255,252,248,0.88)`）覆于条纹之上；条纹密度从 `3px/8px` 调稀为 `2px/16px`

**实施路径：**
- `COMMON_TIMEZONES` 数组：重排顺序 + 去重 UTC+8 多余项
- `BLOCKED_DAYS`：日期键名 `-07/-08` → `-06/-07`，zh 文案更新
- CSS `.bw-blocked-col`：background gradient 参数调整 + flex 居中布局 + z-index: 2；新增 `.bw-blocked-col span` 竖排文字样式
- JS blocked 列渲染：`blocker.title` 改为同时创建 `<span>` 子节点注入文字

---

## 2026-05-23 — 学历字段更新：加辅修信息管理

**改动内容：** 中山大学学历由"工商管理本科"改为"工商管理本科·辅修信息管理"；英文由"B.B.A. in Business Administration"改为"B.B.A. in Business Administration · Minor in Information Management"。

**实施路径：** 修改 `COPY.zh.education[0].degree` 和 `COPY.en.education[0].degree` 字段。

---

## 2026-05-23 — 多处项目经历内容重写

**改动内容：**
- 米兰短租分析：bullets 从3条改为2条，合并数据处理和覆盖率内容，新增用户视角重构描述。
- 并购后组织整合诊断：bullets 从2条改为3条，加入背景、具体指标（密度15.7%、路径3.6等）、干预方案细节。
- 新增「多头注意力视角下的商业网络构建研究」项目，插入时间轴第4条（2025.12—至今），含3条 bullet，中英双语。
- 删除「校园调酒创业项目」，中英双语同步删除。
- 展会外贸翻译：第2、3条 bullet 合并为1条，保留全部信息量。

**实施路径：** 直接修改 `COPY.zh.experience` 和 `COPY.en.experience` 数组中对应条目的 `bullets` 字段。新增条目按时间倒序插入数组正确位置（中英文顺序保持一致）。注意：含中文直角引号的字符串外层改用反引号（debug-rules.md 规则10）。

---

## 2026-05-23 — 教育经历改为 bullet points + 执信中学新增内容

**改动内容：**
- 三所学校的 `desc` 字段改为 `bullets` 数组，改用 `<ul class="timeline-bullets">` 渲染。
- 中山大学：拆分为"绩点年级排名前15%"和"相关课程：……"两条。
- 博科尼："修读课程"改为"相关课程"。
- 执信中学：新增两条 bullet（演讲经历、文学社文编长+《INFINITY》杂志）。

**实施路径：**
- 将 `COPY.zh.education` 和 `COPY.en.education` 中每条记录的 `desc` 字符串替换为 `bullets: [...]` 数组，并删除原 `desc` 字段。
- 更新教育经历渲染代码（`renderResume` 中的 education 模板字符串），将 `${e.desc ? \`<div class="timeline-desc">\` : ""}` 改为优先检查 `e.bullets`，有则渲染 `<ul class="timeline-bullets">`，否则回退到 `e.desc`。

---

## 2026-05-23 — Bullet 点样式调整：改用 CSS 圆点精确对齐

**改动内容：** 原 `·` 字符 bullet 点存在字形中心位置不稳定、偏下的问题。改为用 CSS 绘制的 7px 实心圆点，精确对齐文字第一行水平中心线。

**实施路径：**
- 将 `::before` 的 `content` 由 `"·"` 改为 `""`（空字符串）。
- 添加 `width: 7px; height: 7px; background: var(--accent-dark); border-radius: 50%`，使其渲染为圆点。
- 删除 `font-size: 2em`，改用固定像素尺寸。
- 给 li 设置 `line-height: 1.6`（= 22.4px），圆点 `top: 8px`（= 第一行中心 11.2px 减去圆点半径 3.5px ≈ 8px），确保圆心对齐文字首行中心。

---

## 2026-05-23 — 新增「聊天时间到！」预约模块

**改动内容：**
- Hero 区域新增第4张卡片「聊天时间到！」，点击滚动至页面底部新增的 `#booking` section。
- Booking section 包含：月历视图（显示可预约日期）→ 时间段选择 → 预约表单（邮箱/微信二选一、称呼、性别/年龄/职业、聊天内容）→ 提交成功确认语。
- 日历与用户 Google Calendar 实时同步（FreeBusy API），访客只能看到 occupied/available，看不到事件内容。
- 表单通过 EmailJS 发送邮件到 lucy20051110@gmail.com。
- 中英双语全部支持。

**实施路径：**
1. **配置常量**（5个）：`GOOGLE_CALENDAR_ID`、`GOOGLE_API_KEY`、`EMAILJS_PUBLIC_KEY`、`EMAILJS_SERVICE_ID`、`EMAILJS_TEMPLATE_ID`，及 `BOOKING_CONFIG`（可预约时段定义，按星期几配置小时列表）。
2. **Hero 卡片**：在 `.hero-cards` 末尾追加第4张 `<a>` 标签，`href="#booking"`；在 `COPY.zh` 和 `COPY.en` 中添加 `heroCardBooking`/`heroCardBookingDesc` 字段；`renderHero()` 中追加两行赋值。
3. **Booking section HTML**：插在 `#thinking` section 之后、`<footer>` 之前，包含日历导航、日历格子、时间段区域、表单、成功提示共5个区域（默认隐藏，按步骤逐步显示）。
4. **CSS**：新增 `.booking-*` 系列样式，包含日历格子7列grid、available/selected/loading状态、时间段按钮、表单字段、提交按钮、成功提示等。
5. **JS 逻辑**：`initBooking()` 初始化；`renderCalendar()` 渲染月历并调用 `fetchFreeBusy()`（Google Calendar FreeBusy API POST请求，结果缓存至 `_busyCache`）；`onDayClick()` 显示时间段；`onSlotClick()` 显示表单；`onBookingSubmit()` 校验后调用 `emailjs.send()` 发送邮件。
6. **EmailJS SDK**：在 `</body>` 前引入 CDN 脚本并调用 `emailjs.init()`。
7. **语言切换**：`switchLang()` 和 DOMContentLoaded 初始化中均调用 `renderBookingCopy(lang)` 更新 booking 区域文案。
8. **注意**：主 `</script>` 关闭标签必须在 EmailJS `<script>` 标签之前，否则整页白屏（已踩坑，见 debug-rules.md 2026-05-23 记录）。

---

## 2026-05-23 — CLAUDE.md 和 debug-rules.md 文档更新

**改动内容：**
- `CLAUDE.md` 规则3「推送前检查」改为四步流程，新增步骤3「更新 log.md」。
- `debug-rules.md` 新增两条规则：主 `<script>` 标签未关闭导致白屏（2026-05-23）；bullet 定位问题记录。
- 新建本文件 `log.md`，建立改动日志制度。

**实施路径：** 直接编辑对应 Markdown 文件，追加内容。

---

## 2026-05-23 — 预约模块重设计：日程弹窗 + 时区选择 + 聊天时长

**改动内容：**
- 移除「可选时间段」展开列表（`booking-slots-wrap`），改为点击日期弹出 Notion/GCal 风格的日程弹窗（`#booking-day-modal`）。
- 弹窗内含：选中日期标题、聊天时长选择（30/45/60 min）、垂直时间轴（08:00–21:00 UTC+8，按照访客时区换算显示）。
- 在日历上方新增时区选择器（`#booking-tz-select`），自动检测访客时区（`Intl.DateTimeFormat().resolvedOptions().timeZone`），不在列表中的时区默认北京时间。
- Hana 不可用时段（22:00–07:30 UTC+8 睡眠窗口）通过 `HANA_AVAIL = { startH: 8, endH: 21 }` 硬编码屏蔽，超出该窗口或与 duration 叠加后超过 22:00 的时段自动标为不可预约。
- 移除 `BOOKING_CONFIG.weeklyHours`，改为 `HANA_AVAIL` + `DAYS_AHEAD` + `COMMON_TIMEZONES`（14个时区）。
- 提交按钮从「递交邀约」改为「发送邀请」（英文：Send Invite）；简介文案同步更新。
- 邮件内容新增聊天时长和访客时区换算时间。

**实施路径：**
- CSS：移除 `.booking-slot*` 系列，新增 `.booking-tz-*`、`.booking-day-modal*`、`.bdm-*` 系列样式（fixed overlay，z-index 200）。
- COPY zh/en：新增 `bookingTzLabel`、`bookingDurationLabel`、`bookingSelect`、`bookingBusy`，更新 `bookingIntro` 和 `bookingSubmit`。
- HTML：在日历前插入时区选择器 `<div class="booking-tz-wrap">`；删去 `booking-slots-wrap`；在主 `</script>` 后、EmailJS CDN 前插入弹窗 HTML（`#booking-day-modal`，fixed overlay）。
- JS：整体重写 booking module（约300行）：新增状态变量 `_visitorTz`、`_selectedDuration`；新函数 `populateTzSelect`、`hktToVisitorTimeStr`、`openDayModal`、`renderDurationBtns`、`renderDayTimeline`、`closeDayModal`、`isSlotBusyForDuration`；更新 `renderBookingCopy`、`renderCalendar`、`updateSelectedSummary`、`onBookingSubmit`。
- 注意：弹窗 HTML 放在主 `</script>` 外部（不能放在 script 块内），`initBooking` 中须在 DOMContentLoaded 后才能注册 `bdm-close` 等事件监听器。

---

## 2026-05-23 — 日程弹窗改为可视化 15 分钟粒度 Block 选时界面

**改动内容：**
- 移除日程弹窗中逐整点按钮列表，改为 Google Calendar 日视图风格的可视化时间轴（08:00–22:00，每格 24px 代表 15 分钟，共 56 格）。
- Busy 区间渲染为灰暖色圆角 block（连续单元格无内部分隔线，用 `busy-first`/`busy-last`/`busy-solo` CSS 类实现首尾圆角）。
- 可用单元格悬停时预览选中 block（高度 = duration × 24px / 15min），浅棕色填充，首尾圆角。
- 点击确认后：所选 block 变为深棕色 `selected` 状态，弹窗关闭，下方显示已选摘要。
- `_selectedTime` 由整数 hour 改为 `"HH:MM"` 字符串，支持 15 分钟粒度。
- 新增 `is15MinBusy`、`canStartAt` 辅助函数替代旧 `isSlotBusyForDuration`。
- `hktToVisitorTimeStr` 新增 `hktMinute = 0` 参数支持非整点时间。
- `renderCalendar` 和 `getMaxDurationForDay` 改用 15 分钟分辨率循环（h × q 双层）。
- `updateSelectedSummary` 和 `onBookingSubmit` 同步更新，解析 `"HH:MM"` 字符串。
- 使用 `AbortController` 管理时间轴事件委托，防止重复注册监听器。

**实施路径：**
- CSS：删去 `.bdm-slot-*` 系列，新增 `.bdm-cell`/`.bdm-cell-label`/`.bdm-cell-bar` 及其 `available`/`preview`/`selected`/`busy` 状态变体。
- JS：完全重写 `renderDayTimeline`（事件委托 + AbortController），新增 `is15MinBusy`、`canStartAt`，更新 `hktToVisitorTimeStr`、`renderCalendar`、`getMaxDurationForDay`、`updateSelectedSummary`、`onBookingSubmit`。

---

## 2026-05-23 — 弹窗改为横向 4:3 布局 + 时区选择器移入弹窗

**改动内容：**
- 日程弹窗由竖向单列改为横向两栏（4:3 比例）：左侧 1/3 为控制面板（日期、时区选择、时长选择、提示语），右侧 2/3 为可滚动时间轴。
- 将时区选择器从主页日历上方移入弹窗左侧面板，用户进入弹窗后先选时区再选时段，时区变化时自动重渲染时间轴。
- 新增 `bdm-pick-hint` 引导提示文案（中英双语）。
- 手机端（≤600px）退回竖向布局，提示语隐藏。
- 修复 busy block 内部分隔线、单元格高度（24px→28px）、时间标签垂直居中等位置错乱问题。

**实施路径：**
- CSS：删去旧 `.booking-tz-wrap`、`.booking-day-modal-header`、`.booking-day-modal-duration` 系列；新增 `.bdm-left`、`.bdm-right`、`.bdm-date-display`、`.bdm-section`、`.bdm-section-label`、`.bdm-tz-select`、`.bdm-pick-hint`；弹窗 box 改 `flex-direction: row; height: 580px; max-width: 860px`；新增 `@media (max-width: 600px)` 竖向回退。
- HTML：删除主页 `booking-tz-wrap` div；弹窗结构改为 `.bdm-left` + `.bdm-right` 两栏，时区 select 改 ID 为 `bdm-tz-select`，`bdm-date-label` 元素改为 div。
- JS：`populateTzSelect` 目标改为 `bdm-tz-select`；`initBooking` 删去旧 tz 监听，改为监听 `bdm-tz-select` 变化时重渲染时间轴；`renderBookingCopy` 将文案绑定目标由 `booking-tz-label` 改为 `bdm-tz-label`，新增 `bdm-pick-hint` 绑定；COPY.zh/en 各新增 `bookingPickHint` 字段。


---

## 2026-05-23 — 时间轴重构：动态时区 + 睡眠栏 + 弹窗放大 1.5x

**改动内容：**
- 弹窗放大 1.5x（max-width: 860px→1100px，height: 580px→780px）。
- 单元格高度 28px→16px；睡眠时段改为顶部/底部各一条斜线填充 bar（.bdm-sleep-bar），不再渲染为逐格单元。
- 时间轴仅展示 Hana 可用时段（08:00–22:00 Hana 本地时区），消除了两端大片不可用格。
- 时间标签改为**仅显示访客时区时间**（去除双时区标注），访客选时区后自动重渲。
- Hana 时区动态化：2026-06-03 前 Europe/Rome，之后 Asia/Shanghai（`getHanaTz(dateStr)`）。
- 新增 `localToUtcMs(dateStr, h, m, tz)` 将任意时区的 H:M 转为 UTC ms；`is15MinBusyMs`、`canStartAtMs` 改为基于 UTC ms 操作，删去旧的 `is15MinBusy`、`canStartAt`、`hktToVisitorTimeStr`。
- `_selectedTime` 从字符串 "HH:MM"（UTC+8）改为 UTC 毫秒数值，`updateSelectedSummary` 和 `onBookingSubmit` 同步更新。
- 弹窗打开时 `requestAnimationFrame` 自动滚动到第一个可点击时段。

**实施路径：**
- HANA_AVAIL.endH: 21→22（可用窗口末端对齐）。
- renderCalendar busy 检查改用 `localToUtcMs + canStartAtMs` 双层循环。
- getMaxDurationForDay 同步改用 UTC ms 循环。
- renderDayTimeline 全部重写：build slots from hanaStartMs to hanaEndMs，单标签（访客时区），睡眠栏首尾。
- 手机端 @media ≤600px 补 .bdm-cell height: 22px。

---

## 2026-05-23 — Google Calendar 联动修复：改查主日历

**改动内容：**
- 修复 403 PERMISSION_DENIED：在 Google Cloud Console 为 API key 启用 Google Calendar API，解除方法级别限制。
- 将 `GOOGLE_CALENDAR_ID` 从空的专用日历（`...@group.calendar.google.com`）改为 `lucy20051110@gmail.com`（主日历），原因：事件均在主日历中。
- 主日历同步在 Google Calendar 设置中开启「Make available to public → See only free/busy」。
- 清除 `fetchFreeBusy` 中的诊断 console.log，仅保留 console.error。

**实施路径：**
- 修改 `const GOOGLE_CALENDAR_ID` 常量值（第 663 行附近）。

---

## 2026-05-24 — 预约邮件新增 Google Calendar 一键添加链接

**改动内容：**
- `onBookingSubmit` 新增 `gcal_link` 计算：基于 `_selectedTime`（UTC ms）和 `_selectedDuration` 生成 Google Calendar 事件创建 URL，包含访客称呼、话题、联系方式、时长。
- 将 `gcal_link` 作为变量传给 EmailJS 模板（`{{gcal_link}}`）。
- 修复旧的 `errEl` 引用 bug（`#booking-error` 元素已删除，catch 块改用 `#err-submit`）。
- 在提交按钮下方加回 `<p id="err-submit">` 用于展示发送失败错误。
- 评估并放弃了"接受/拒绝"按钮方案（用户倾向于手动处理回复邮件）。
- EmailJS 模板同步更新：加入 `{{gcal_link}}` 按钮，删除底部默认装饰块。

**实施路径：**
- `onBookingSubmit` 中新增 `fmtGCal()` 辅助函数，拼接 Google Calendar URL。
- emailjs.send 参数新增 `gcal_link`。
- catch 块改引用 `submitErrEl = document.getElementById("err-submit")`。

---

## 2026-05-24 — 修复手机端弹窗布局：时区/时长面板压缩时间轴问题

**改动内容：**
- 手机端（≤600px）弹窗 `height: auto` 改为 `height: 88vh`，给 flex 子元素提供确定的高度参照。
- `.bdm-left` 加 `flex-shrink: 0`，缩小内间距，防止控制面板过高。
- `.bdm-right` 加 `flex: 1; min-height: 0`，让时间轴撑满剩余空间。
- 桌面布局不受影响（改动全在 `@media (max-width: 600px)` 内）。

---

## 2026-05-24 — 预约提前量改为3h，近期时段不可选并显示说明

**改动内容：**
- 最短提前预约时间从5小时改为3小时（`Date.now() + 3 * 3600000`）。
- 移除 `.bdm-cell.past` 的斜线背景，改为透明（不可选但无视觉噪音）。
- 时间轴上方新增 `.bdm-notice` 提示栏：当天有3h内不可选时段时显示"（请提前至少3h预约，以便我可以有更好的准备哦！）"。
- COPY.zh / COPY.en 各新增 `bookingLeadTimeNote` 字段；`renderBookingCopy` 绑定文案；`renderDayTimeline` 控制显隐。

---

## 2026-05-24 — 时间轴新增当前时间线 + 3h截止说明内嵌标注

**改动内容：**
- 新增 `renderNowIndicators()` 函数：在 `.bdm-grid` 内绝对定位两个元素：
  - `.bdm-now-line`：accent 色小圆点 + 横线，标示当前时刻在时间轴中的位置（仿 Google Calendar）
  - `.bdm-cutoff-label`：3h截止点上方的说明文字"（请提前至少3h预约…）"
- `openDayModal` 弹窗显示后通过 `requestAnimationFrame` 调用 `renderNowIndicators`，并启动每30秒更新的 `setInterval`（存入 `_nowLineInterval`）。
- `closeDayModal` 清除 interval，防止内存泄漏。
- 移除 `.bdm-notice` 顶部横幅的显隐逻辑，改为时间轴内嵌方式。
- `.bdm-now-line` / `.bdm-cutoff-label` CSS 新增至样式区。

---

## 2026-05-24 — 交互优化：3h内可hover不可选+shake提示；now-line修复；blocked days；界面细节

**改动内容：**
- 3h内非忙碌格子改为可hover预览，点击时触发左侧提示文字抖动（`shakeLeadNotice()`）而非选中。
- 左侧 `#bdm-lead-notice` 固定显示提前预约说明，点击3h内时段时以 shake 动画强调。
- 修复 duration/时区切换后 now-line 消失问题：`renderDayTimeline` 末尾加 `requestAnimationFrame(renderNowIndicators)`。
- `#bdm-now-label` 新增：左侧标签列以同色显示访客时区当前时间。
- 预约窗口缩短为14天，超出日期与过去日期同样显示为灰色 `.past`。
- 新增 `BLOCKED_DAYS`：6月7-8日全天不可预约，弹窗显示黑客松提示文字。
- 称呼和想聊什么字段移除星号显示（验证逻辑不变）。

---

## 2026-05-23 — 日历视图按访客时区过滤已过时段

**改动内容：**
- `renderCalendar` 的 `hasAvail` 循环新增 `t >= nowMs` 条件：当天所有可用时段均已过（如意大利 23:30），该日在日历上不再显示为可选。
- `renderDayTimeline` 的 slot 构建新增 `isPast = t < nowMs`，已过时段不添加 `.available` 类，改为 `.past` 类。
- 新增 `.bdm-cell.past` CSS：细斜线填充，cursor: default，视觉区分已过时段与可用时段。

**实施路径：**
- `renderCalendar` 第 1589 行附近：`for` 循环体内加 `const nowMs = Date.now()` 和 `t >= nowMs &&`。
- `renderDayTimeline` slot 构建：新增 `isPast` 字段，`clickable` 条件加 `&& !isPast`，渲染 class 分支加 `else if (s.isPast) cls += " past"`。
- CSS `.bdm-cell.busy` 后紧接新增 `.bdm-cell.past` 样式。

---

## 2026-05-24 — 随笔 max-height 扩大、tag 换行修复、Bocconi 换行

**改动内容：**
1. **随笔 max-height**：`.thinking-body.open { max-height }` 从 600px 改为 3000px，解决手机端长篇随笔内容被截断的问题。
2. **tag 防断词**：`.tag` CSS 新增 `white-space: nowrap`，防止"AI科普"等标签在中间换行。
3. **内容运营卡片 tags 分行**：`renderTags` 函数支持 `"|"` 作为强制换行符（渲染为 `flex-basis:100%;height:0` 的 span）；zh PROJECTS 中「内容运营」卡片 tags 改为 `["内容运营", "公众号", "Claude Code", "|", "AI科普"]`；en 同步改为 `["Content", "WeChat", "Claude Code", "|", "AI Explainer"]`，使"AI科普"/"AI Explainer"独占第二行。
4. **Bocconi 校名换行**：zh education 中博科尼条目 school 字段改为 `"鲁基·博科尼商业大学<br>（Bocconi University）"`，使英文名显示在中文名下一行（`innerHTML` 渲染，`<br>` 安全有效）。

**实施路径：**
- CSS：`.thinking-body.open` max-height 直接修改；`.tag` 新增 `white-space: nowrap`。
- JS：`renderTags` 函数增加三元判断（`t === "|"` → 换行 span，否则 → `.tag` span）。
- 数据：`PROJECTS.zh` 内容运营 tags 数组、`PROJECTS.en` 对应 tags 数组、`COPY.zh.education[1].school` 字段各修改一处。

---

## 2026-05-24 — 简历项目名称括号说明换行显示

**改动内容：** 三个项目经历条目的括号补充说明改为换行显示（在主标题后加 `<br>`）：社会网络分析（博科尼课程项目）、全球超级游艇行业研究咨询（博科尼课程项目）、多头注意力视角下的商业网络构建研究（迁移复刻Attention is all you need）。中英文各3处，共6处修改。

**实施路径：** 直接在 `COPY.zh.experience` 和 `COPY.en.experience` 对应条目的 `project` 字段中，在主标题与括号之间插入 `<br>`（`innerHTML` 渲染，安全有效，与 Bocconi 校名换行方案一致）。


---

## 2026-09-12 ? ????????????????

- ???? PDF ??????? 14 ??Slides 19 ?????? Git ?????? 404 ?????????
- moment-1.jpg?19,829,826 ? 221,546 ???moment-2.jpg?2,652,237 ? 190,018 ?????? 1600px?JPEG quality 85???????
- ???????? index.html ??? D:/1Mylife/maintenance-backups/2026-09-12-memyself?????????
- ?????? HTTP???????????????/?? busy ????????????15 ????
- ?????????????????????????????????????????????????
- ????? JS ???8 ????????????????? DOM ???/????/????????????????????????????????????
- ???????????????????????????????????


## 2026-09-29 — HandCue 反思文案与手势表

- 中英文替换 Demo 占位说明，改为需求确认和应用场景仍待思考的反思。
- 手势表同步当前版本：倒竖拇指重做，双手 T 停止；明确方案选择、确认、道具拿放、锤子修改、鞭子仅查进度。
- 保留其他已有未提交修改；脚本语法与标签配对检查通过。待用户确认双语措辞后再推送。


## 2026-09-29 — 简历三个项目标题取消强制换行

- 按用户明确要求，社会网络分析、超级游艇行业研究、多头注意力商业网络研究的标题与括号说明连续呈现。
- 中英文六处仅将 br 改为空格，措辞不变；沿用米兰项目的自然排版，小屏幕允许自然折行。
- 内联 JavaScript 语法检查通过。

## 2026-09-29 — 预约校验、时区和提交状态修复

- 邮箱格式校验；自定义时长必须为正整数，清空或无效输入不再沿用旧时长。
- 提交前强制刷新日历，校验提前三小时、可预约日期、不可预约日和冲突；缓存有效期一分钟，月份查询覆盖跨时区边界。
- 发送中锁定控件并防重复提交；成功或失败均恢复按钮，新选择清除旧提示。邮件和日历链接同时保留邮箱、微信。
- 预约摘要和邮件显示双方完整日期和时区；网格列头显示访客日期范围并明确 Hana 星期，当前时间线使用访客时区。
- 拖动采用同一预约校验，支持 pointercancel 清理；满日忙碌返回最长零分钟。
- 补齐日历失败、重试、联系、邮箱格式、时段过期的中英文提示。
- node web/tests/booking.test.cjs 通过：模拟日历与邮件验证成功、失败、重试、重复提交、缓存、跨日等。未发送真实邮件，未验证线上账户配置。
- StudyMap 等待 Fieldnotes 介绍后替换，本次未改作品集；保留原有未提交修改，未提交或推送。

## 2026-09-29 — 用户授权发布预约修复与素材

- 用户明确同意发布上线。发布范围：index.html、两份米兰 PDF、两张压缩照片、预约回归测试及维护记录。
- 发布前 node web/tests/booking.test.cjs 通过；其他本地资料不纳入此次提交。
