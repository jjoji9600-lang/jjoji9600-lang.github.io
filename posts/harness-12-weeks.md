<!-- title: 从 AI 入门到入职：DeepSeek Harness 十二周实战教程 -->
<!-- slug: harness-12-weeks -->
<!-- date: 2026-11-14 00:00:13 -->
<!-- tags: Harness, DeepSeek, AI入门, 实战教程 -->
<!-- category: 十二周实战课 -->
<!-- description: 办公工具只协助学习，以 DeepSeek Harness + DeepSeek API 为核心，含 84 天任务、练习包、安全、评测与面试。 -->

本课程的主角是 **DeepSeek Harness（DSH）+ DeepSeek API**。WorkBuddy 或千问办公只作学习助手：解释概念、辅助阅读、整理笔记，不承担核心项目，也不要求它处理复杂业务。

适合会用电脑、尚未开发 AI 应用的人。建议每周 7—10 小时；零基础可以延长。目标是积累初级 AI 应用／Agent 岗位的作品与面试基础，不保证录用。Harness 工程师并非统一招聘名称。

[下载配套练习包 ZIP](assets/harness-course/harness-lab-starter.zip) · [下载全部课程 Markdown](assets/harness-course/harness-course-markdown.zip) · [SHA-256 校验值](assets/harness-course/SHA256SUMS.txt)

解压得到 harness-lab 项目目录。包含模拟 CSV、周报程序、API 客户端、分类器、评测脚本、16 个离线测试与任务模板。最低 Python 3.10，只用标准库。先独立尝试，再比较参考代码。


## 学习主次与最终目标

| 对象 | 定位 | 要学到什么程度 |
|---|---|---|
| WorkBuddy／千问办公 | 可选学习辅助 | 能解释报错、整理笔记；回答须核验 |
| DeepSeek Harness | 核心执行环境 | 能配置、使用、观察工具调用，理解 Skill、Profile、权限、会话与故障 |
| DeepSeek API | 核心模型服务 | 会鉴权、模型选择、请求响应、错误处理、费用与结构化输出 |
| Python／Git／测试 | 必要工程底座 | 能读代码、封装工具、验证修改、回滚 |

最终项目不是办公软件生成报告，而是 **用 DSH 驱动、DeepSeek API 支持、可测试和评测的工单分析工作流**。它读取模拟 CSV，执行确定性统计，可选调用模型分类，校验输出并生成交付物。你应能解释每一步的工具、权限、输入输出和失败处理。

样例人工真值：12 条工单、已关闭 8 条、总分钟 360、三个部门各 4 条。access、billing、bug、other 四种分类各 3 条。T12 含恶意指令，必须当成数据。模型不负责算总数，不直接执行工单文本，不自动发信或改业务系统。

## 十二周学习路径

| 周 | 核心实操 | 交付 |
|---|---|---|
| [第 1 周](harness-week-01.html) | 环境与任务卡 | 环境表和任务规范 |
| [第 2 周](harness-week-02.html) | DSH + API 跑通 | 可复现的接入记录 |
| [第 3 周](harness-week-03.html) | 工作区、工具、权限 | 一次受控任务的证据链 |
| [第 4 周](harness-week-04.html) | 原生 API 请求 | 客户端与错误排查表 |
| [第 5 周](harness-week-05.html) | Python 工具 | 可核验的周报 CLI |
| [第 6 周](harness-week-06.html) | Git 与测试 | 有回归测试的修改 |
| [第 7 周](harness-week-07.html) | DSH Skill | 可发现、可重复的技能 |
| [第 8 周](harness-week-08.html) | Profile 与插件 | 架构说明与安全边界 |
| [第 9 周](harness-week-09.html) | API 分类与流程 | 校验后的结构化结果 |
| [第 10 周](harness-week-10.html) | 评测与观测 | 基线、成本和失败报告 |
| [第 11 周](harness-week-11.html) | 自动化与恢复 | 可运行交付与静态作品页 |
| [第 12 周](harness-week-12.html) | 面试与求职 | 演示、简历和复现证据 |

每天：5 分钟任务卡，15 分钟阅读，30—40 分钟操作，10 分钟核验，更新 docs/progress.md。办公助手可使用下面的提示，但不要把密钥或未脱敏日志交给它。

```text
你只担任学习教练，核心操作由我在 DSH 与系统终端完成。
每次只解释当前需要的概念，给三步以内操作和预期结果。
未知版本和菜单先询问，不编造命令，不替我声称测试通过。
最后问一道理解题，等我回答后继续。
```

## 版本、测试与预算

默认 Windows PowerShell；macOS／Linux 的 python 可能改为 python3。DSH 本次核对为 0.2.2-rc.3，已核对 CLI 与 Web 帮助。版本不同以官方 README 与本机帮助为准。

练习包 **16 个离线测试和周报命令已实际通过**；未替学习者调用付费 API，未实测所有办公工具界面、全部手工作业或所有 DSH 功能。在线调用结果与费用由你自己实测，不照抄教程当运行证据。

办公软件会员、聊天会员和 API 额度通常分开。先设个人总预算，例如 50 元，这不是报价或足额保证；按当期价格估算并开启平台支持的提醒／限额。每轮在线实验先限一次请求，失败先排查再决定重试。输出 Token 上限不是账户硬预算。

只用模拟或获准数据。密钥不进聊天、截图、日志、Git、网页代码。工作目录不是 OS 沙箱，需结合实际工具权限与受限账户。删除、发布、外发、付费操作必须由人确认。

## 官方资料与求助模板

- [DSH 安装与源码](https://github.com/deepseek-ai/deepseek-harness)／[npm 包](https://www.npmjs.com/package/@deepseek-ai/dsh)
- [DeepSeek API](https://api-docs.deepseek.com/)／[当期模型与价格](https://api-docs.deepseek.com/quick_start/pricing)
- [WorkBuddy](https://www.workbuddy.cn/)／[千问办公安装说明](https://help.aliyun.com/zh/qwenwork/installers)
- [Python](https://www.python.org/downloads/)／[Git](https://git-scm.com/downloads)／[GitHub Pages](https://docs.github.com/en/pages)

求助时写：第几周、系统与工具版本、当前目录、无密钥命令、预期与实际结果、退出码、已尝试什么。不要只贴一句不能用，也不要直接重装全部环境。

**开始：[第 1 周](harness-week-01.html)。**
