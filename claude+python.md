# Claude Code + Python + Conda 问题指南

> 基于实际使用经验整理。环境：Windows 11（中文版，GBK 编码）、Miniconda、vizproj 环境、Claude Code CLI（WSL bash）。

**新增条目格式：** 每次遇到并解决一个 Python / conda / 环境问题后，在文档最末尾追加：

```
---

### YYYY年MM月DD日 — 一句话概括问题

**现象：** ...
**根因：** ...
**解决：** ...（含完整命令或代码）
```

---

## 核心原则

**永远不要让系统自动选择 Python。** 始终明确指定环境。

**分工原则：**
- Claude Code：写代码、修改代码、debug、解释逻辑
- 本地终端（PowerShell）：执行代码

---

## 推荐执行方式

在本地 PowerShell 中运行：

```powershell
conda run -n vizproj python script.py
```

注意：仅在 PowerShell 中有效，在 Claude 的 bash 环境中 `conda` 不在 PATH 里（见问题 4）。

---

## 问题索引

| # | 问题 | 触发场景 |
|---|---|---|
| 1 | ModuleNotFoundError | 用错了 Python |
| 2 | conda activate 无效 | PowerShell 未初始化 conda |
| 3 | Claude 自动找到错误的 Python | Claude 执行代码时 |
| 4 | conda: command not found | Claude bash 中运行 conda |
| 5 | claude-xxxx-cwd 报错 | Claude bash 每次启动 |
| 6 | **GBK 编码错误（conda run）** | 脚本输出含非 ASCII 字符 |
| 7 | **matplotlib 无法保存图片** | Claude bash 中运行绘图脚本 |
| 8 | **Claude bash 输出被截断** | Python 输出较长时 |
| 9 | VS Code 运行按钮用错 Python | interpreter 未设置 |
| 10 | VS Code 拒绝访问 old_code | VS Code 更新冲突 |
| 11 | Claude Code 黄色安装提示 | 旧安装方式 |

---

## 问题详解

### 问题 1：ModuleNotFoundError

```
ModuleNotFoundError: No module named 'pandas'
```

**根因：** 使用了系统 Python（如 `python3.14.exe`）而非 vizproj 环境。

**解决：**

```powershell
# 方法 A：conda run（推荐）
conda run -n vizproj python script.py

# 方法 B：直接用完整路径
C:\Users\Siying\miniconda3\envs\vizproj\python.exe script.py
```

VS Code 中切换解释器：`Ctrl+Shift+P` → `Python: Select Interpreter` → 选 `vizproj`

---

### 问题 2：conda activate 无效

```powershell
conda activate vizproj
echo $env:CONDA_DEFAULT_ENV   # 空
```

**根因：** PowerShell 未初始化 conda shell hook。

**临时方案：** 不 activate，直接用 `conda run -n vizproj`。

**长期修复：**

```powershell
conda init powershell
# 重启 VS Code / PowerShell
```

---

### 问题 3：Claude Code 自动使用错误 Python

**根因：** Claude Code 在执行时自动查找 Python，找到了系统 Python 而非 vizproj。

**解决：** 在给 Claude 的 prompt 中明确说明：

```
不要自动查找 Python。
请使用以下命令执行：conda run -n vizproj python script.py
```

或者更稳妥：只让 Claude 生成代码，在本地终端手动执行。

---

### 问题 4：conda: command not found（Claude bash 中）

```
conda: command not found
```

**根因：** Claude Code 的 bash 环境（WSL）的 PATH 中包含 vizproj 环境的 bin，但不包含 conda 可执行文件路径（`miniconda3/Scripts/`）。

**解决方案 A（推荐）：** 不在 Claude 中执行，在本地 PowerShell 运行：

```powershell
conda run -n vizproj python script.py
```

**解决方案 B（Claude bash 中用完整路径）：**

```bash
/mnt/c/Users/Siying/miniconda3/Scripts/conda.exe run -n vizproj python script.py
```

注意：方案 B 可能触发问题 6（GBK 编码），见下文。

---

### 问题 5：claude-xxxx-cwd 报错

```
No such file or directory:
/c/Users/Siying/AppData/Local/Temp/claude-xxxx-cwd
```

**根因：** Claude Code 用一个临时文件来记录工作目录（CWD）。WSL bash 启动时会尝试 `cd` 到这个路径，如果文件不存在就报错。这个错误**不是致命的**——Python 命令仍然会执行，但 CWD 会变成 `/`（WSL 根目录）。

**关键影响：** 相对路径（`./data/...`、`../...`）会失效。

**解决：** Python 脚本中一律使用绝对路径：

```python
# 错误：相对路径会失效
df = pd.read_csv("data/cleaned/listings.csv")

# 正确：使用绝对 Windows 路径（正斜杠在 Python 中均可用）
BASE = "D:/BocconiLLM-GroupP/Dropbox/ai-tools-course/group-project"
df = pd.read_csv(f"{BASE}/data/cleaned/listings.csv")
```

---

### 问题 6：GBK 编码错误（conda run 输出含非 ASCII 字符）⚠️

```
UnicodeEncodeError: 'gbk' codec can't encode character '\ufffd'
  File "...\conda\cli\main_run.py", line 135, in execute
    print(response.stdout, file=sys.stdout, end="")
```

**根因：** 中文 Windows 系统的控制台默认编码为 GBK（CP936）。`conda run` 有一个输出中继层，它会把 Python 脚本的 stdout 打印出来，如果 stdout 中含有任何 GBK 无法编码的字符（如 `→` `×` `²` `—` 等 Unicode 字符），中继层就会崩溃并报此错。**Python 脚本本身可能已经成功运行**（图片已保存），只是 conda 无法打印输出。

**解决方案 A：脚本中避免在 `print()` 里用非 ASCII 字符**

```python
# 错误：含 Unicode 箭头
print(f"Saved → {OUT_FIG}")

# 正确：纯 ASCII
print("Saved: " + OUT_FIG)
```

**解决方案 B：设置环境变量强制 UTF-8**

```powershell
$env:PYTHONUTF8 = "1"
conda run -n vizproj python script.py
```

或单行：

```powershell
PYTHONUTF8=1 conda run -n vizproj python script.py
```

**解决方案 C：绕过 conda run，用完整路径执行**

```powershell
C:\Users\Siying\miniconda3\envs\vizproj\python.exe script.py
```

这完全跳过 conda 的输出中继层，不存在 GBK 问题。

---

### 问题 7：matplotlib 无法显示或保存图片（非交互环境）⚠️

**根因：** 在 Claude bash 或无 GUI 的 shell 中运行时，matplotlib 默认尝试调用 GUI 后端（TkAgg 等），找不到显示器会报错或挂起。

**解决：** 在脚本最顶部、import pyplot 之前，显式设置非交互后端：

```python
import matplotlib
matplotlib.use("Agg")          # 必须在 import pyplot 之前
import matplotlib.pyplot as plt
```

或通过环境变量（放在脚本开头或终端中）：

```python
import os
os.environ["MPLBACKEND"] = "Agg"
```

---

### 问题 8：Claude bash 输出被截断⚠️

**现象：** Python 脚本有多条 print 输出，但 Claude 只能看到最后几行，前面的丢失。

**根因：** Claude bash 的 stdout/stderr 与 CWD 报错混在一起，长输出会被截断或乱序。

**解决：让 Python 把结果写入临时文件，再用 Claude 的 Read 工具读取：**

```python
# 脚本末尾添加
results = {
    "n_listings": len(df),
    "median_premium": float(df["premium_pct"].median()),
}
import json
with open("C:/Users/Siying/AppData/Local/Temp/script_results.json", "w") as f:
    json.dump(results, f)
```

然后告诉 Claude：`Read C:\Users\Siying\AppData\Local\Temp\script_results.json`

---

### 问题 9：VS Code 运行按钮使用错误 Python

```
C:\Users\Siying\.local\bin\python3.14.exe
```

**解决：**

```
Ctrl + Shift + P
→ Python: Select Interpreter
→ 选择 vizproj（路径含 miniconda3\envs\vizproj）
```

---

### 问题 10：VS Code 拒绝访问 old_code

```
Failed to create file handle: 拒绝访问
```

**根因：** VS Code 更新时旧文件被占用或权限不足。

**解决：**
1. 任务管理器关闭所有 `Code.exe`
2. 删除 `D:\Microsoft VS Code\bin\old_code`
3. 以管理员身份重新运行 VS Code

---

### 问题 11：Claude Code 黄色安装提示

```
Claude Code has switched from npm...
```

**解决：**

```bash
claude install
```

---

## 环境健康检查

在 PowerShell 中运行：

```powershell
conda run -n vizproj python -c "import pandas, matplotlib, numpy, scipy; print('All OK')"
```

期望输出：

```
All OK
```

如果报 GBK 错误（见问题 6），改用：

```powershell
C:\Users\Siying\miniconda3\envs\vizproj\python.exe -c "import pandas, matplotlib, numpy, scipy; print('All OK')"
```

---

## 可视化脚本模板（适用于本环境）

```python
"""
模板：在 vizproj 环境 + Claude Code + Windows 中文系统下稳定运行的绘图脚本
"""

# ── 1. 后端必须在 pyplot 之前设置 ──────────────────────────────────────────
import matplotlib
matplotlib.use("Agg")

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# ── 2. 路径用绝对路径，避免 CWD 问题 ─────────────────────────────────────────
BASE = "D:/BocconiLLM-GroupP/Dropbox/ai-tools-course/group-project"
OUT  = f"{BASE}/figure.png"

# ── 3. 数据处理 ───────────────────────────────────────────────────────────────
df = pd.read_csv(f"{BASE}/data/cleaned/your_file.csv")

# ── 4. 绘图 ───────────────────────────────────────────────────────────────────
fig, ax = plt.subplots(figsize=(9, 6))
# ...

# ── 5. 保存（不用 show()）────────────────────────────────────────────────────
plt.savefig(OUT, dpi=180, bbox_inches="tight", facecolor="white")

# ── 6. print 只用 ASCII，避免 GBK 问题 ───────────────────────────────────────
print("Saved: " + OUT)
```

---

## 本机关键路径速查

| 资源 | 路径 |
|---|---|
| vizproj Python 可执行 | `C:\Users\Siying\miniconda3\envs\vizproj\python.exe` |
| conda 可执行 | `C:\Users\Siying\miniconda3\Scripts\conda.exe` |
| miniconda 根目录 | `C:\Users\Siying\miniconda3\` |
| 项目根目录 | `D:\BocconiLLM-GroupP\Dropbox\ai-tools-course\group-project` |
| Claude Code 设置 | `C:\Users\Siying\.claude\settings.json` |

---

## 总结

所有问题的本质只有两类：

1. **Python 环境错误：** 运行代码的 Python 不是 vizproj → 始终用 `conda run -n vizproj` 或完整路径
2. **Claude bash 环境限制：** CWD 丢失 + 无 GUI + GBK 编码 → 脚本用绝对路径、设置 `Agg` 后端、避免 Unicode print

**最稳定的工作方式：Claude 写代码，PowerShell 执行。**
