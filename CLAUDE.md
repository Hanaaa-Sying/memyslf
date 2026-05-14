# CLAUDE.md — 个人网站项目规范

**网站地址：** https://hanaaa-sying.github.io/memyslf/
**GitHub 仓库：** https://github.com/Hanaaa-Sying/memyslf.git

---

## 规则

### 1. 中英双语同步
每次更新任何内容（随笔、简历、作品集、自我介绍等），必须同时更新中文版（`COPY.zh`）和英文版（`COPY.en`）。
更新完成后，将中英文对照内容输出给用户确认表达是否合适，用户确认后再进行下一步。

### 2. 每次更新后提交并推送到 GitHub
每次内容修改完成、用户确认无误后，执行：
1. `git add index.html`
2. `git commit -m "简要描述本次修改内容"`
3. `git push origin main`

确保 GitHub 仓库与本地文件始终保持同步。
