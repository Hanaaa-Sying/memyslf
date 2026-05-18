# 个人网站 Debug 规则提炼

> 记录在构建和维护 https://hanaaa-sying.github.io/memyslf/ 过程中，遇到过的问题及提炼出的规则。

---

## 规则 1：文件必须放进 `files/` 目录才能被网站访问

**现象**：把 PPT / PDF 放在根目录或其他位置，点按钮没有反应或 404。

**原因**：GitHub Pages 部署时，网站只能访问仓库内的文件；链接路径写的是 `files/xxx`，文件不在这里就找不到。

**规则**：
- 所有要从网站链接的资源（PDF、PPT、图片以外的文件），统一放进 `files/` 目录。
- 图片统一放进 `images/` 目录。
- 提交前确认 `git add` 包含了这个文件。

---

## 规则 2：PPT 在线浏览 vs 下载，用法不同

**现象**：HR 点击 PPT 按钮弹出下载提示，需要先下载才能看，体验差。

**两种方案对比**：

| 场景 | 实现方式 | 体验 |
|------|----------|------|
| 本地 .pptx 文件 | `<a href="files/xxx.pptx" download>` | 触发下载，HR 需要本地打开 |
| Google Slides 分享链接 | `<a href="https://docs.google.com/..." target="_blank">` | 直接在浏览器预览，无需下载 |

**规则**：优先用 Google Slides / Google Docs 的分享链接，去掉 `download` 属性，加上 `target="_blank"`。分享时确认权限设为「任何人可查看」，否则 HR 打开会要求登录。

---

## 规则 3：推送后看不到更新 = 浏览器缓存

**现象**：`git push` 已成功，打开网站还是旧版本。

**原因**：浏览器缓存了旧页面。

**规则**：
- 按 `Ctrl + Shift + R`（Windows）强制刷新，绕过缓存。
- 或打开无痕窗口访问网址。
- GitHub Pages 本身部署需要 1–3 分钟，先确认 Actions 页面显示绿色 ✅ 再刷新。

---

## 规则 4：GitHub Pages 部署状态查看

**入口**：`https://github.com/Hanaaa-Sying/memyslf/actions`

| 状态 | 含义 |
|------|------|
| 🟡 转圈 | 正在部署，等待 |
| ✅ 绿色 | 部署成功，刷新即可看到 |
| ❌ 红色 | 部署失败，检查代码语法 |

---

## 规则 5：`portfolioId` 必须和 `PROJECTS` 里的 `id` 完全一致

**现象**：简历区经历标题旁没有出现「作品集 ↗」标签，或点击后没有跳转。

**原因**：`experience` 里的 `portfolioId: "xxx"` 和 `PROJECTS` 里的 `id: "xxx"` 不一致（大小写、拼写不同）。

**规则**：
- 新建卡片时，先确定 id（小写英文，无空格），然后在 experience 和 PROJECTS 两处同步填写。
- id 一旦确定不要随意修改，否则所有引用都要同步改。

---

## 规则 6：中英文必须同步更新，且顺序一致

**现象**：中文页有新内容，切换到英文页没有；或中英文的卡片顺序不一样。

**规则**：
- `COPY.zh.experience` 和 `COPY.en.experience` 条目顺序必须一致（同一个项目排在同一位置）。
- `PROJECTS.zh` 和 `PROJECTS.en` 条目顺序必须一致。
- 每次移动、新增、删除，都要中英文各操作一次。

---

## 规则 7：卡片 detail 为空字符串时显示「coming soon」

**现象**：点击某个卡片弹出「这个项目尚未完工」提示。

**原因**：`detail: ""` 是占位符，表示内容还没写。

**规则**：
- 暂时没有内容的卡片，保持 `detail: ""` 即可，网站会自动显示 coming soon 文案。
- 准备好内容后再填写 detail 字符串。
- 不要删掉卡片，否则简历区的 portfolioId 跳转会失效。

---

## 规则 8：资源文件名避免空格

**现象**：文件名有空格（如 `mega yachts final.pptx`），在某些浏览器或服务器上 URL 解析会出问题。

**规则**：
- 放入 `files/` 或 `images/` 时，重命名为不含空格的名字（用连字符 `-` 代替空格）。
- 例：`mega yachts final.pptx` → `yacht-final-slides.pptx`
