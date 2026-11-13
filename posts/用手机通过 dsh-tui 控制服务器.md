凌晨一点，手机弹出一条告警：磁盘占用 92%。笔记本在另一个房间，孩子刚睡着。你需要的不是一台电脑，而是一条能执行命令的通道。

如果服务器上跑着 dsh-tui，这条通道就是一个 SSH 连接：手机连上去，用自然语言让它查、让它改，改完它自己验证。这篇写怎么把这条链路搭起来，以及在手机上哪些操作真的顺手、哪些坑要提前躲开。

## 链路长什么样

```text
手机（Termius / Termux）
   │  SSH，密钥登录
   ▼
服务器
   └─ tmux 会话（断线不丢）
        └─ dsh-tui
             └─ DSH agent ──► shell / 文件 / systemd
```

三个组件各管一件事：SSH 负责「连得上」，tmux 负责「断不了」，dsh-tui 负责「听得懂」。少一个，手机运维的体验都会塌。

## 一、服务器端：先装好，再体检

```bash
node -v                       # DSH 目前要求 24.9 以上
npm i -g pnpm                 # 首次初始化 profile 要用
npm i -g @deepseek-ai/dsh @deepseek-harness-tui/dsh-tui
dsh-tui doctor
```

`doctor` 会逐项打勾：node、dsh、pnpm、profile、启动器版本、API key、配置文件路径。有一项不对就先修，别急着启动。

API key 放环境变量，不要写进命令行：

```bash
echo 'export DEEPSEEK_API_KEY=sk-...' >> ~/.bashrc
```

然后建一个干活的账号。别用 root 跑 agent——它拿到的是 shell，你在手机上敲的每一句都可能变成 `rm`：

```bash
useradd -m -s /bin/bash ops
mkdir -p /srv/ops && chown ops:ops /srv/ops
```

真要 sudo，就按具体命令配白名单，别图省事给 `NOPASSWD: ALL`。

## 二、手机端：挑一个顺手的 SSH 客户端

iOS 上的 Termius、Blink、ShellFish 都行；Android 用 Termius、JuiceSSH，或者干脆上 Termux。功能差别不大，值得花十分钟调的是这三件事：

- **密钥登录**。手机上生成 ed25519 密钥，公钥贴进服务器的 `~/.ssh/authorized_keys`，然后关掉密码登录。
- **辅助键栏**。软键盘没有 Ctrl 和 Esc，客户端一般能加一排按键，把 Ctrl、Esc、Tab、方向键放上去。没有这一排，`Ctrl+C` 都得长按复制粘贴。
- **关掉空闲自动断开**，或者把时间调长。切个微信回来就重连，节奏全断。

服务器侧顺手加固：

```bash
# /etc/ssh/sshd_config
PasswordAuthentication no
PermitRootLogin no
```

## 三、tmux：这一步不做，后面全白搭

手机的网络比你想象的脆：锁屏、切 Wi-Fi 和 4G、进电梯，SSH 都会断。断了不可怕，可怕的是 agent 正在改配置，连接一断进程跟着没。

```bash
apt install -y tmux           # Debian / Ubuntu

tmux new -s ops               # 新建会话，然后在里面启动 dsh-tui
# 脱离：Ctrl+b 然后按 d
# 回来：tmux attach -t ops
# 看有哪些：tmux ls
```

`~/.tmux.conf` 加三行：

```tmux
set -g allow-passthrough on
set -g focus-events on
set -g history-limit 50000
```

前两行是为通知服务的：`allow-passthrough` 让 OSC 通知序列能穿过 tmux，`focus-events` 让「窗口失焦才提醒」这类逻辑正常工作。手机 SSH 客户端多半不弹系统通知，但桌面端和部分客户端会，配了不亏。

## 四、第一次启动

```bash
su - ops
cd /srv/ops
dst
```

`dst` 是 `dsh-tui` 的短别名，两者完全等价。首次启动会自动初始化 profile，然后走四步向导：账号与模型、语言与主题、模型与工作区、快捷键。选错了用 `/setup` 重跑，不用重装。

几个马上会用到的命令：

- `/model`：换模型、调推理档位
- `/new`：开新会话
- `/resume`：回到某个历史会话
- `/settings`：界面、语言、通知
- `/export`：把这段对话导出成 Markdown

手机屏幕窄，界面会自动降级：启动页的大块装饰被砍掉，侧栏放不下时面板改成全屏。这不是 bug，是设计过的妥协。

## 五、三个真用得上的场景

### 磁盘告警

别一上来就说「清理磁盘」。先把边界说清楚：

> 查一下 /var 里哪些目录占空间最大，只读排查，不要删任何东西，把结论列出来。

它跑 `du`、`find`，给你一张清单。你看完再决定删哪个——决策权留在自己手里，这是手机运维最重要的习惯。

### 改一行 nginx 配置

> 备份 /etc/nginx/sites-enabled/blog，把 client_max_body_size 改成 64m；先 nginx -t，通过再 reload；不通过就还原备份并告诉我错在哪。

一句话把「备份、校验、回滚」三件事都写进去。省掉这句，它可能直接 reload。

### 服务起不来

> 看 blog-web.service 最近 50 行日志，找出 5xx 的原因，先别重启。

排查和修复分开下指令。手机屏幕小，一次只推进一件事，比一口气让它「修好」靠谱得多。

## 六、手机上怎么把话说清楚

打字慢是硬约束，绕不过去就利用它：

- **语音输入**。整句说，比戳键盘快五倍，中文识别已经够用。
- **短指令加一句「先看现状再动手」**。这七个字能省掉一堆来回。
- **`@路径` 引用文件，`#L12-14` 直接指行号**。不用把配置粘进对话框。
- **`Tab` 补全、`Ctrl+R` 翻历史、`Ctrl+B` 开关侧栏**。三个键顶半块键盘。
- **长得离谱的指令别在手机上敲**。在电脑上写进服务器的 `notes.md`，手机上 `@notes.md` 一句话带过。

## 七、安全边界：这节别跳

agent 拿到的权限就是你的权限，区别只在于它不会累、也不会犹豫。

- **不用 root 跑**。单独用户、限定工作目录，别在 `/` 下启动。
- **权限分档**。只读排查用 `read-only`，改文件用 `workspace-write`，`danger-full-access` 留给一次性容器。
- **生产改动三件套**：先备份、先校验、留回滚命令。写进提示词，别靠自觉。
- **API key 只走环境变量或密钥管理**，别进 `history`，别出现在截图里。
- **SSH 只开密钥、禁 root、上 fail2ban**，管理端口不要裸奔在公网。

## 八、断线之后

- 切网、锁屏导致 SSH 断：`tmux attach -t ops` 回来，会话和上下文都在。
- tmux 也没了（比如服务器重启）：`dst --resume`，或者进去之后 `/resume`。DSH 的会话是落盘的，重启不丢历史。
- 一次性任务（cron、脚本）：`dst -p "..."`。注意 `dst cli` 目前校验的 DSH 版本最高到 0.2.1-rc.5，版本再新可能报 `ADAPTER_UNAVAILABLE`，那就直接用 TUI，或用 `dst dsh` 转发给官方 CLI。
- 跑很久的任务，别让手机当唯一连接：让它后台跑、写日志，你过一会儿回来看结果。

## 九、几个坑

- **方向键打出 `^[[A`**：终端类型没被识别。进 tmux 通常自动正常，否则设 `TERM=xterm-256color`。
- **中文和 emoji 错位**：换等宽字体，确认 `LANG` 是 UTF-8。
- **锁屏回来花屏**：`Ctrl+L` 重绘，或者重新 `tmux attach`。
- **想翻历史**：`Ctrl+b` 再按 `[` 进 copy-mode，方向键滚动，`q` 退出。
- **通知不响**：tmux 要开 `allow-passthrough`；而且多数手机 SSH 客户端根本不支持 OSC，别指望弹窗。

## 十、什么时候别用手机

手机适合：看状态、重启服务、改一行配置、查日志、跑一条命令。

不适合：大重构、需要认真读 diff 的合并、连续几小时的调试。屏幕就那么大，别跟它较劲。

## 最小的可复刻清单

```bash
# 服务器
npm i -g pnpm @deepseek-ai/dsh @deepseek-harness-tui/dsh-tui
dsh-tui doctor
tmux new -s ops
dst

# 手机
ssh ops@your-server
tmux attach -t ops
```

一条 SSH、一个 tmux 会话、一个会自己查证的 agent。行李越少，越能在需要的时候拿得出手。

<!-- tags: dsh-tui,运维,ssh,移动办公 -->
<!-- category: 技术 -->
