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
