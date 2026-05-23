# CLAUDE.md — 个人网站项目规范

**网站地址：** https://hanaaa-sying.github.io/memyslf/
**GitHub 仓库：** https://github.com/Hanaaa-Sying/memyslf.git

---

## 规则

### 1. 中英双语同步
每次更新任何内容（随笔、简历、作品集、自我介绍等），必须同时更新中文版（`COPY.zh`）和英文版（`COPY.en`）。
更新完成后，将中英文对照内容输出给用户确认表达是否合适，用户确认后再进行下一步。

### 2. 求职 Tracker 更新同时同步到 Notion

每次更新 `job-applications/tracker.md`（改状态、加新条目、记结果），必须同时同步到 Notion 数据库。

**操作方法：**
1. 读取 `job-applications/notion-ids.json`，用 `公司|岗位|地点` 查找对应的 Notion 页面 ID
2. 调用 `notion-update-page`（`update_properties` 命令）更新相关属性（`当前进度`、`结果`、`投递日期` 等）
3. 若是新增条目，调用 `notion-create-pages` 写入 Notion，并将新 ID 追加到 `notion-ids.json`

**Notion 数据库信息：**
- 数据库 URL：`https://www.notion.so/8b009e726b4f4314ba6ae7732faf6d20`
- Data Source ID：`b471944f-02ea-429c-b9e1-ff2828028806`
- 父页面：「我的未来式」

**两个常见触发场景：**

**场景一：新增投递**（用户说"帮我把这个加进tracker"，附岗位链接或JD文本）
1. 若提供 URL → 用 `WebFetch` 抓取岗位页面提取 JD（实习僧页面通常可直接访问；Boss直聘若需登录则提示用户粘贴文本）
2. 分析 JD，评定优先级（A/B/C）、差距/注意点，格式与 tracker 现有行一致
3. 写入 tracker.md 新行，同步到 Notion（`notion-create-pages` + 追加 `notion-ids.json`）

tracker 行格式：
```
| 优先级 | 公司 | 岗位 | 地点 | 投递日期 | 投递渠道 | 当前进度 | 结果 | ⚠️ 注意/差距 |
```

**场景二：批量状态更新**（用户说"帮我同步状态"，附"我的投递"页面截图或复制文本）
1. 从截图/文本中提取 `公司 × 岗位 × 最新状态`
2. 与 tracker.md 当前状态 diff，找出有变化的条目
3. 只更新有变化的行（当前进度、结果日期），不覆盖差距分析
4. 同步到 Notion，输出变化摘要

平台状态文字 → tracker 标准词对照：

| 平台显示 | tracker 状态 |
|---------|-------------|
| 已投递 / 待查看 | 已投递 |
| HR已查看 / 已查看 | HR已查看 |
| 沟通中 | 微信沟通中 |
| 面试邀请 / 邀约面试 | 一面 |
| 不合适 / 已拒绝 | 不合适 |
| 已放弃 | 已放弃 |

### 3. 推送前必须完成的三步检查

每次内容修改完成后，**按顺序执行以下步骤，不得跳过**：

1. **中英双语确认**：将本次修改的中英文对照内容输出给用户，询问表述是否合适，等待用户确认。
2. **Bug 自查**：对照 `debug-rules.md` 中记录的历史 bug，逐条检查本次改动是否存在同类问题（重点：JS 字符串中的中文引号、`<script>` 标签是否配对、`portfolioId` 一致性等）。
3. **推送确认**：检查无误后，明确询问用户"是否可以推送到 GitHub"，待用户确认后再执行：
   ```
   git add index.html
   git commit -m "简要描述本次修改内容"
   git push origin main
   ```

确保 GitHub 仓库与本地文件始终保持同步。

---

## 参考文档

### [`debug-rules.md`](debug-rules.md) — 网站维护 Debug 规则
记录在构建和维护本网站过程中遇到的常见问题及规则，包括：
- 文件路径与 `files/` 目录规范
- PPT 在线浏览 vs 下载的实现方式
- GitHub Pages 部署状态检查
- 浏览器缓存刷新方法
- 中英文双语同步要求
- `portfolioId` 与 `PROJECTS.id` 一致性

### [`prompts-archive.md`](prompts-archive.md) — 常用 Prompt 模板
记录维护本网站时反复使用的高效 Prompt，包括：
- 添加新经历、新作品集卡片
- 调整卡片顺序、修改标题
- 添加 PDF / PPT / 外链按钮
- 双语同步通用要求

### [`claude+python.md`](claude+python.md) — Python 数据处理问题指南
记录在 Windows 11 + Miniconda + Claude Code 环境下运行 Python 脚本时的常见问题，适用于为本网站做数据分析（如米兰租金项目）的场景。

---

## 工作流结束后的文档更新规则

每次完成一项操作后，根据操作类型，将记录追加写入对应文档。**写入必须在 git push 之前完成，并将文档文件一并提交。**

### 写入规则对照表

| 操作类型 | 写入目标文件 |
|----------|-------------|
| 遇到并解决了一个 bug / 发现了一条新规则 | `debug-rules.md` |
| 使用了一个新的、值得复用的 Prompt 模式 | `prompts-archive.md` |
| 遇到并解决了 Python / conda / 环境问题 | `claude+python.md` |

写入格式见各文档抬头说明。**写入须在 git push 之前完成，并将文档文件一并提交。**
