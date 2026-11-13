<!-- title: 第 2 周｜跑通 DeepSeek Harness 与 API 配置 -->
<!-- slug: harness-week-02 -->
<!-- date: 2026-11-14 00:00:11 -->
<!-- tags: Harness, DeepSeek, AI入门, 实战教程 -->
<!-- category: 十二周实战课 -->
<!-- description: 第 2 周：跑通 DeepSeek Harness 与 API 配置。含每日任务、操作步骤、提示词、验收与排错。 -->

[课程总览](harness-12-weeks.html) · [上一站](harness-week-01.html) · [下一站](harness-week-03.html)


## 本周目标

安装并跑通 DSH，使用 DeepSeek API 提供模型能力。办公 AI 只解释报错，不接收真实密钥。本周交付 docs/dsh-setup.md 与一次可复现的只读会话记录。

## 安装与启动

先看 [官方仓库](https://github.com/deepseek-ai/deepseek-harness)，选择官方桌面发行版或 npm CLI。桌面版可能自带运行时，不要重复安装 CLI 造成版本混淆。CLI 路线先检查当前包对 Node 的要求：

```powershell
node --version
npm --version
npm view @deepseek-ai/dsh engines
npm install -g @deepseek-ai/dsh
dsh --version
dsh --help
```

查询与安装需要网络；本人确认包名和来源后执行。Node 版本按当前 engines 要求，不把某个旧教程的要求永久固定。不要用拼写近似的镜像包替代。

进入 harness-lab 后启动：

```powershell
pwd
dsh web --help
dsh web --no-open --port 0
```

打开输出的本机 URL；Ctrl+C 停止。不要配置公网访问、端口转发或远程控制。启动成功只证明界面能运行，不证明模型已接通。

## 每日教程：第 8—14 天

| 天 | 操作 | 当天证据 |
|---|---|---|
| 8 | 选定安装方式，完成版本检查。记录运行的是桌面版内置 CLI 还是 npm CLI。 | 版本和可执行文件来源 |
| 9 | 在官方 DeepSeek 平台创建专用学习 Key，查看余额、价格和支持模型；只在平台或本地安全输入，不进聊天。 | 无密钥的账户准备清单 |
| 10 | 在 DSH 的模型设置或官方配置入口选择 DeepSeek 官方提供方，安全填入 Key。界面不同先查当前版本说明。 | 提供方、模型 ID、配置方式说明 |
| 11 | 在练习目录启动，先发送一句仅需回答 OK 的请求；查看是否有模型响应及错误。 | 时间、模型、成功或错误状态 |
| 12 | 发送只读任务：读取 README 和需求，总结项目，不修改文件、不运行命令。核对工具历史。 | 工具调用记录和文件清单 |
| 13 | 新建会话重做；故意提供不存在的文件名，检查是否诚实报告找不到。 | 成功一次、受控失败一次 |
| 14 | 停止并重开 DSH，按文档复现；清理记录中的用户目录、Key、余额截图等敏感信息。 | docs/dsh-setup.md 最终版 |

## 第一次只读任务

```text
先确认当前工作目录是 harness-lab。
本轮只允许列目录，读取 README.md 和 docs/requirements.md。
不要写文件、运行命令、联网、读凭证。
给出项目目的、主要文件、可能的验收方法。
读取失败就停下来，不能声称已经看过。
```

在实际工具权限里设置限制；提示词本身不能阻止越权。若当前版本没有足够的权限隔离，先使用不含任何秘密的独立测试环境，不拿个人资料尝试。

模型接入的配置入口以当前版本为准。可以参考 [官方适配器 README](https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/llm/llm-deepseek/README.md)。不要照抄未知 YAML，也不要假设所有提供方都会自动读取 DEEPSEEK_API_KEY。

## 面试与工作排查

问题：DSH 界面打开了但没有回复，你怎么排查？按启动层、提供方配置、鉴权、余额、模型可用性、网络、服务端错误逐层检查；不要先重装系统。

问题：桌面客户端和 API 账户是同一计费吗？不能假设。应分别核对产品套餐、提供方与调用账单。

## 本周验收

能在指定目录启动与停止；能说明模型请求由哪个提供方处理；完成一次真实模型响应和只读任务。没有 API 条件时可先记录阻塞、继续离线章节，但不能标记接入成功。

找不到 dsh 时重开终端、核对 PATH 和官方安装；端口冲突用 --port 0；401 类问题先检查 Key，不把完整错误配置粘给学习助手。每次失败先排查，再手动决定是否付费重试。


---

[课程总览](harness-12-weeks.html) · [上一站](harness-week-01.html) · [下一站](harness-week-03.html)
