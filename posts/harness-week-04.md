<!-- title: 第 4 周｜直接调用 DeepSeek API，定位模型接入故障 -->
<!-- slug: harness-week-04 -->
<!-- date: 2026-11-14 00:00:09 -->
<!-- tags: Harness, DeepSeek, AI入门, 实战教程 -->
<!-- category: 十二周实战课 -->
<!-- description: 第 4 周：直接调用 DeepSeek API，定位模型接入故障。含每日任务、操作步骤、提示词、验收与排错。 -->

[课程总览](harness-12-weeks.html) · [上一站](harness-week-03.html) · [下一站](harness-week-05.html)


## 本周目标

绕开 DSH 界面直接调用 DeepSeek API，理解 HTTP、鉴权、模型名、请求响应与费用。这样在工作中才能区分模型服务问题与 Harness 接入问题。交付 docs/api-run.md、docs/api-errors.md 和一次真实用量记录。

本周使用练习包的 src/api_client.py。它固定官方 HTTPS 地址，最多读取约 2 MB 响应，45 秒网络超时，不自动重试、不记录密钥或输入正文。超时是网络等待限制，不是账户费用上限。

## 每日教程：第 22—28 天

| 天 | 操作 | 当天证据 |
|---|---|---|
| 22 | 阅读官方首次调用、模型和价格页。画出客户端—HTTPS—API 服务—响应的路径，区别 API Key 与模型 ID。 | 通信图和费用口径 |
| 23 | 在本机终端安全设置 Key，调用模型列表；记录可用 ID，不固定使用旧教程模型名。 | 无密钥的模型列表摘要 |
| 24 | 设置一个账户可用的模型 ID，发送一次短 ping；保存时间、模型、usage 和状态。 | docs/api-run.md |
| 25 | 打开 api_client.py，找出 headers、messages、max_tokens、timeout 和返回解析位置；请学习助手逐段解释后自己复述。 | 五项字段说明 |
| 26 | 用离线测试模拟缺 Key、缺模型、无效响应；不要故意反复付费制造错误。 | 错误分层表 |
| 27 | 对比 DSH 真实接入与独立客户端，列出能证明什么、不能证明什么。一次成功不证明所有协议与工具调用都支持。 | 接入差异分析 |
| 28 | 在预算内决定是否重做一次；检查历史、日志、Git 都没有 Key。清除终端环境变量，写排查手册。 | 密钥检查与本周验收 |

## 安全设置环境变量

Windows PowerShell，先运行以下安全输入，不在命令行写真实 Key：

```powershell
$secret = Read-Host 'DeepSeek API Key' -AsSecureString
$env:DEEPSEEK_API_KEY = [System.Net.NetworkCredential]::new('', $secret).Password
Remove-Variable secret
python -m src.api_client --models
```

再从返回列表和官方说明选一个支持聊天补全的模型：

```powershell
$env:DEEPSEEK_MODEL = '替换为你账户实际可用的模型ID'
python -m src.api_client --ping
$LASTEXITCODE
```

不要直接运行占位模型名。环境变量在进程内仍是明文，不抵抗恶意软件；这是避免进历史的练习方式，不是企业密钥管理方案。子进程可能继承环境，别从该终端启动不可信程序。

macOS／Linux 可在 Bash 中使用：

```bash
read -s -p 'DeepSeek API Key: ' DEEPSEEK_API_KEY; echo
export DEEPSEEK_API_KEY
export DEEPSEEK_MODEL='替换为实际模型ID'
python3 -m src.api_client --models
python3 -m src.api_client --ping
```

本项目不自动读取 .env；.env.example 只是说明。命令应在同一个设置变量的终端执行。DSH 自己的提供方配置不一定读取这些变量，不能混为一谈。

## 检查请求与用量

chat 发送 messages 数组，role 与 content 分别说明消息角色和内容；客户端限制 max_tokens 为 512、不流式返回。返回 content 与 usage；usage 缺失时记未知，不能编造费用。

估算成本时按当期价格分别核算输入、输出及模型可能涉及的思考、缓存等口径，以平台账单为最终依据。输出上限不限制输入消耗，模型别名、上下文限制也可能变化。

## 故障分层

| 现象 | 优先排查 |
|---|---|
| 401／鉴权失败 | Key 是否有效、是否读到、提供方是否正确 |
| 余额或权限错误 | 官方错误码、账户余额与访问权限 |
| 模型不存在 | 实际模型列表、拼写与接口支持 |
| 429 | 限流与并发；不要无间隔重试 |
| 5xx／网络超时 | 平台状态、网络、请求是否过大 |
| HTTP 成功但内容无效 | 响应解析、结构校验与任务语义 |

错误码以官方文档为准，不能只靠表格诊断。后续生产可加受限退避重试，但有副作用的任务还要考虑重复执行与幂等。

## 面试与验收

问：客户端超时代表服务端没有处理吗？不一定，服务端可能仍在处理或已计费，所以不能盲目重发。

问：DSH 不通但独立客户端可通意味着什么？说明某一基本 API 路径可用，继续查 DSH 的提供方、模型、协议与权限；不证明其全部功能正常。

验收：能解释一次完整请求；有真实或明确标注的离线记录；没有 Key 泄露；能说明费用如何估算。无 API 条件可继续离线代码章节，但不能声称已完成在线验收。

清理：PowerShell 使用 Remove-Item Env:DEEPSEEK_API_KEY 和 Remove-Item Env:DEEPSEEK_MODEL；Bash 使用 unset。Key 泄露立即在平台撤销并轮换，仅删除文件不够。


---

[课程总览](harness-12-weeks.html) · [上一站](harness-week-03.html) · [下一站](harness-week-05.html)
