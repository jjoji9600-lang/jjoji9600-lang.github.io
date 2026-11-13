凌晨一点，手机弹出告警：磁盘 92%。笔记本在另一个房间，孩子刚睡着。你需要的不是一台电脑，而是一个能立刻动手的入口。

以前答案只有一个：手机 SSH 上去开终端。现在这套工具有了手机端——**DSH Go**，一个 Android App，直接连你服务器上的 DSH。手机聊天、审批、看结果；回到电脑，同一个会话还能用 **dsh-tui** 接着干。

这篇把两条路都写清楚，以及各自适合什么。

## 先分清三个东西

- **DSH Go**：[ccch1mneyyy/dsh-go](https://github.com/ccch1mneyyy/dsh-go)，Android 客户端。可以在手机上装一套 Linux 环境本地跑，也可以只当遥控器，连电脑或服务器上的 DSH。
- **dsh-tui**：[ccch1mneyyy/dsh-TUI](https://github.com/ccch1mneyyy/dsh-TUI)，同一作者的终端界面，跑在电脑或服务器的终端里。此外还有一个精简移植版 [dsh-tui/dsh-tui](https://github.com/dsh-tui/dsh-tui)（包名 `@dsh-tui/dsh-tui`），安装方式不同，下面会分开写。
- **DSH 本体**：真正干活的内核。会话、模型渠道、工作区都存在它所在的那台主机上。

关键一点：**手机端不是把 AI 搬进手机，而是换个前端连同一台主机**。所以手机上开的对话，主机上就有一份；换 dsh-tui 连同一个 `$DSH_HOME`，在 `/resume` 里能看到它。

## 方案一：DSH Go 直连服务器（日常首选）

链路很短：

```text
DSH Go（手机） ──SSH 隧道──► 服务器上的 dsh web ──► DSH 引擎 ──► shell
```

端口不用对公网开放——App 建的是 SSH 隧道，连的是服务器回环地址上的 DSH。

### 1. 服务器先能跑 DSH

```bash
node -v                        # 需要 24.9 以上
npm i -g @deepseek-ai/dsh
export DEEPSEEK_API_KEY=sk-... # 写进 ~/.bashrc
```

手动起一次，确认能开：

```bash
dsh web
```

它会打印一个带端口和登录令牌的地址，**记下这两样**，后面「只连接」模式要用。

注意：模型渠道和 Key 存在**主机**上。App 连远程主机时，模型页只显示那台主机配没配，不提供填写入口——这一步必须在服务器上做完。

### 2. 手机装 App

要求 Android 8.0 以上。从 [Releases](https://github.com/ccch1mneyyy/dsh-go/releases/latest) 或 [go.dshtui.com/download](https://go.dshtui.com/download) 下 APK，常见手机选 arm64。iOS 和鸿蒙还在适配。

第一次打开会让你选 DSH 跑在哪：

- **本机**：在手机上装约 1 GB 的 Linux 环境，不依赖服务器。适合没有服务器、或者想让它读手机屏幕的人。
- **远程主机**：只当客户端，不占手机空间。**控服务器选这个。**

### 3. 添加 SSH 主机

`远程主机 → 添加 SSH 主机`，填三样：主机地址、用户名、端口（默认 22）。

登录方式选密码或导入私钥，有口令就再填一次。然后是**实例管理**，这里有两条分支：

- **托管启动**（默认）：启动命令填 `dsh web`，App 通过 SSH 在服务器上把它拉起来，并记住这个实例。测试连接会真的启动它，之后一直留着。用 nvm 装的 DSH 记得填完整路径。
- **只连接**：你自己在服务器上跑 `dsh web`，把端口和令牌填进 App。App 只建 SSH 隧道，不启动、不重启、不碰进程。

生产服务器建议用**只连接**：进程归 systemd 管，App 只负责连过去。

工作目录（可选）填绝对路径，比如 `/srv/ops`，新对话就默认在这里开工。

填完点**测试连接**。第一次会弹「信任这台主机？」，去服务器上核对指纹，一致再继续。保存，回到主机列表选中它。

### 4. 开始用

选主机 → 新对话 → 点模型胶囊选模型 → 说话。

手机上真正省事的几个动作：

- **语音输入**：输入框为空时，发送键变成麦克风。整句说完，文字填进输入框，检查一遍再发。
- **插话**：AI 生成中直接发消息，选「插话」它下一步就看到；选「排队」等这一轮结束。排队的消息还能「立即发送」。
- **停止**：输入框为空时，发送键变停止键，点一下停掉当前这轮。
- **审批**：敏感工具调用会弹确认。「本对话都允许」只管当前对话，App 重启后恢复逐次询问。
- **附件**：每条最多 9 个，相册、拍照、文件都行。
- **斜杠命令**：`/compact` 压上下文，`/plan` 进计划模式，`/goal` 设长期目标，`/permission` 换权限预设，`/export` 导出整段对话。

## 方案二：SSH + dsh-tui（电脑端，或没有安卓机时）

这条路的本质没变：终端就是前端。好处是任何能 SSH 的设备都能用，坏处是手机打字和窄屏。

装 dsh-tui，两种发行线选一个：

```bash
# 作者主仓库版：命令是 dst
npm i -g @deepseek-ai/dsh @deepseek-harness-tui/dsh-tui

# 精简移植版：命令是 dsh --profile tui
dsh plugin --profile tui add @dsh-tui/dsh-tui
dsh --profile tui
```

装完先体检：

```bash
dsh-tui doctor      # 主仓库版；移植版直接 dsh --profile tui 启动
```

关键是 tmux。手机网络很脆，锁屏、切 Wi-Fi、进电梯都会断；断了不可怕，可怕的是 agent 正在改配置，连接一断进程跟着没。

```bash
tmux new -s ops     # 在里面启动 dsh-tui
# 脱离：Ctrl+b 然后按 d
# 回来：tmux attach -t ops
# 看有哪些：tmux ls
```

`~/.tmux.conf` 加两行，为通知服务：

```tmux
set -g allow-passthrough on
set -g focus-events on
```

断了重连回来，会话和上下文都还在。tmux 也没了（比如服务器重启），用 `dst --resume` 或进去之后 `/resume`，DSH 的会话是落盘的。

## 安全边界，这节别跳

- **手机操控不等于远程控服务器**。DSH Go 的「手机操控」（读屏、点按）只对本机引擎开放；连着远程主机时用不了。远程主机上它能做的是聊天、跑工具、审批。
- **权限分三档**：逐次询问、自动审查、完全权限。生产环境别图省事开完全权限；`/permission` 可以临时切。
- **凭据各归各位**：模型 Key 在主机上；SSH 密码、私钥、登录令牌只存在手机的安全存储里。
- **SSH 该加固就加固**：密钥登录、禁 root、上 fail2ban。为了这个 App 单独把端口开到公网，是本末倒置——它本来就只需要 SSH。
- **首次连接核对指纹**，别一路点「信任」。
- **后台保活**：Android 会杀后台，去 `设置 › 后台运行` 关掉电池优化、保留通知、在最近任务里锁定 App。远程主机的提醒还要求 App 在线。

## 两条路怎么选

- 掏手机就要处置：**DSH Go**。看状态、改一行配置、重启服务、查日志，最顺手。
- 要读 diff、长时间重构、跑长命令：**SSH + tmux + dsh-tui**，或者干脆等回到电脑。
- 服务器不在同一网络、没有公网 IP：**DSH Remote**（同一生态里的远程通道，端到端加密，需要在主机上装远程插件），或者确认 22 端口可达后用 SSH。

## 常见问题

- **连不上**：远程主机页会按原因给修复按钮（重新连接、重新登录、重新信任）。先查端口、令牌和 SSH 本身。
- **发了没反应**：看对话列表底部的主机状态；模型没配好时，选择模型里会提示填 Key 或加渠道。
- **App 能聊，`dsh --profile headless` 却报 `MISSING_CREDENTIAL`**：headless 不读 App 里保存的凭据，要在服务器的环境变量或 `.env` 里单独配 `DEEPSEEK_API_KEY`。
- **切后台回来引擎没了**：按上面「后台保活」逐项放行，各品牌策略不同。
- **iOS / 鸿蒙**：还没适配，作者在推进。

## 最小的可复刻清单

```bash
# 服务器
npm i -g @deepseek-ai/dsh
export DEEPSEEK_API_KEY=sk-...
dsh web                      # 或用 App 的托管启动，让它替你起
```

手机：装 APK → 添加 SSH 主机 → 测试连接 → 核对指纹 → 新对话。

电脑端备用：

```bash
npm i -g @deepseek-harness-tui/dsh-tui && dst
```

一个内核，两个前端。手机负责「马上能动手」，终端负责「改得清楚」。行李越少，越能在需要的时候拿得出手。

<!-- tags: dsh-go, dsh-tui, 运维, 安卓, 远程 -->
<!-- category: 技术 -->
