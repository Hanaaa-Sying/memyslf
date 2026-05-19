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

### 3. 每次更新后提交并推送到 GitHub
每次内容修改完成、用户确认无误后，执行：
1. `git add index.html`
2. `git commit -m "简要描述本次修改内容"`
3. `git push origin main`

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
