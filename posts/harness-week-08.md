<!-- title: 第 8 周｜理解 Profile、插件与运行边界 -->
<!-- slug: harness-week-08 -->
<!-- date: 2026-11-14 00:00:05 -->
<!-- tags: Harness, DeepSeek, AI入门, 实战教程 -->
<!-- category: 十二周实战课 -->
<!-- description: 第 8 周：理解 Profile、插件与运行边界。含每日任务、操作步骤、提示词、验收与排错。 -->

[课程总览](harness-12-weeks.html) · [上一站](harness-week-07.html) · [下一站](harness-week-09.html)


## 本周目标

理解 DSH 的 Profile 与插件组合，能解释能力从哪里来、故障发生在哪一层，并为自己的业务工具写出清晰契约。本周不要求零基础者修改 DSH 内核或开发生产插件。

交付 docs/architecture.md、docs/tool-contract.md、docs/failure-policy.md；进阶可在独立 profile 试验官方插件示例，但不能影响日常主 profile。

## 核心结构

DSH 基于插件架构。Profile 组织要加载的 bundle／插件及覆盖配置，插件提供模型、工具、会话、技能、界面等能力。不同入口和 profile 的能力不一定相同；界面是表层，提供方、权限与执行链路是另外几层。

```text
用户任务 → 入口 / Profile
          → 模型提供方 → DeepSeek API
          → 工具注册与执行 → 文件 / 终端 / 业务工具
          → 会话、状态、技能与安全策略
          → 产物、测试与运行证据
```

图是概念图，不是所有版本内部调用关系的完整实现。看当前源码与配置才能确认具体依赖。

## 每日教程：第 50—56 天

| 天 | 操作 | 当天证据 |
|---|---|---|
| 50 | 读 dsh --help，区分 web、tui、headless 等入口与 profile；只记录本机实际存在项。 | 入口与用途表 |
| 51 | 阅读当前 profile 的 package.json 中 bundles／依赖信息，记录插件名和版本，不导出密钥配置。 | 架构图与依赖摘要 |
| 52 | 只读查看插件列表，定位模型、工具、Skill、会话对应能力；不安装新包。 | 能力—提供方映射 |
| 53 | 将周报工具定义为输入 schema、输出 schema、错误码、权限和副作用的契约。 | docs/tool-contract.md |
| 54 | 分别模拟模型失败、工具失败、结果校验失败，设计不同停止／重试策略。 | docs/failure-policy.md |
| 55 | 测试路径越界、超大输入、重复运行等边界；用测试，不让 Agent 接触真实秘密。 | 边界测试与限制说明 |
| 56 | 不看笔记解释架构，指出本项目实际实现与仅设计部分；进阶才尝试官方插件示例。 | 10 分钟架构讲解录音或提纲 |

## 安全地检查配置

```powershell
dsh --help
dsh web --help
dsh plugin --profile web list
```

最后一条通过当前 CLI 的插件管理入口查看依赖，实际输出取决于 profile。不要把默认配置或 --dump-config 的完整输出直接上传；可能含凭证、主机名、文件路径。只记录脱敏后的插件名、版本与结构。

自定义 profile 应先查看当前官方说明、备份并确认名字未占用。--from-default-profile 会替换目标 profile，不要把现有工作 profile 当实验目标；本课不要求执行替换命令。

## 一个业务工具契约

```json
{
  "name": "build_ticket_report",
  "input": {"input_name": "tickets.csv", "output_name": "weekly.md", "dry_run": true},
  "output": {"ok": true, "total": 12, "closed": 8, "minutes": 360},
  "errors": ["invalid_schema", "path_denied", "input_missing", "write_failed"],
  "side_effects": "dry_run=false 时仅写 output 下指定文件"
}
```

这是一份设计契约，不是已经注册到 DSH 的插件。练习包提供 CLI 实现；DSH 可以经批准调用 CLI。真正注册原生工具需要按当前 SDK／插件 API 实现并验证，不能把一份 JSON 冒充完成的集成。

必要设计：参数类型与大小限制、路径白名单、有限执行时间、安全错误信息、输出大小上限、审计标识。参数中不接受任意 shell 命令；业务 text 绝不进入可执行表达式。模型提出请求后仍须由工具层检查。

## 执行循环与失败策略

循环应有最大步骤、墙钟时间、请求次数和预算；错误分为临时网络故障、永久输入错误、权限拒绝、业务校验失败。永久错误不应盲目重试，可能有副作用的操作还要解决幂等与重复执行。

本课程参考 API 客户端仅调用一轮、不自动重试。DSH 自身的限制应按当前版本实际支持能力配置并测试；没有硬限制时采用人工计数和受控环境，不伪称已具备账户级限额。

## 面试与验收

问：为什么某 profile 能调用工具、另一个不能？先查插件组合、工具注册、权限和提供方能力，不先归因模型不聪明。

问：工具错误为什么要结构化？便于区分可重试、需人工介入和永久错误，也避免模型从一大段不确定报错中猜测。

验收：能画架构图、解释两层以上故障边界；工具契约覆盖输入输出权限错误；明确哪些已实现、哪些仅设计。插件开发未做就如实说明，不写进简历冒充经验。


---

[课程总览](harness-12-weeks.html) · [上一站](harness-week-07.html) · [下一站](harness-week-09.html)
