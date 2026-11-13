<!-- title: 第 6 周｜用 Git、测试与审查约束 Agent -->
<!-- slug: harness-week-06 -->
<!-- date: 2026-11-14 00:00:07 -->
<!-- tags: Harness, DeepSeek, AI入门, 实战教程 -->
<!-- category: 十二周实战课 -->
<!-- description: 第 6 周：用 Git、测试与审查约束 Agent。含每日任务、操作步骤、提示词、验收与排错。 -->

[课程总览](harness-12-weeks.html) · [上一站](harness-week-05.html) · [下一站](harness-week-07.html)


## 本周目标

把 DSH 的改代码能力放进 Git 与测试的约束中，建立可审查、可回滚的修复循环。交付至少两次小提交、一项新增测试、一份 review 记录。

Git 是版本控制，不是备份所有文件的工具。测试也是行为证据，不是模型说已运行的一句总结。

## 每日教程：第 36—42 天

| 天 | 操作 | 当天证据 |
|---|---|---|
| 36 | 在解压目录初始化 Git，检查 .gitignore，逐项选择基础代码与模拟数据加入。 | 初始提交与文件列表 |
| 37 | 创建学习分支，运行现有 16 个测试，记录基线；测试数随后新增会变化。 | 基线命令与退出码 |
| 38 | 为 open 工单数或一个数据边界先写失败测试；不要同时修改实现。 | 确实失败的测试输出 |
| 39 | 让 DSH 只修复这项行为，不重构无关模块；运行针对测试与完整测试。 | 最小差异与通过证据 |
| 40 | 做代码审查：意外依赖、凭证、输入校验、错误处理、测试是否变弱。 | docs/review.md |
| 41 | 在测试分支尝试恢复一个已知小变更，理解 revert 与 restore 的区别；不执行不懂的破坏性命令。 | 回滚前后行为说明 |
| 42 | 新会话或新目录复现，确保不依赖未提交文件。整理一次 PR 风格说明。 | 提交、测试与复现记录 |

## 跟做：建立基线

首次独立练习目录才执行 init；在已有仓库不重复创建嵌套仓库：

```powershell
git init
git status --short
git add .gitignore README.md .env.example src tests data docs evals
git diff --cached --stat
git diff --cached
git commit -m 'Add harness lab baseline'
git switch -c learn/report-open-count
python -m unittest discover -s tests -v
```

提交前自己检查暂存差异。若 Git 要求身份，使用你希望公开的姓名与邮箱，必要时使用 GitHub 的隐私邮箱。不要盲目 git add 整个电脑目录，也不把 output、runs、真实 .env 提交。

## 交给 DSH 的修复任务

```text
先读取当前差异与需求，确认本次只增加 open 统计。
先给出测试计划，等我确认后修改相关测试和实现。
不得删除或跳过原测试，不改模拟输入来让测试通过。
不引入第三方依赖，不修改无关文件，不提交或推送。
每轮修改后运行针对测试，最后运行完整测试。
连续两轮相同失败后停止并说明假设与下一步。
```

要求它提交报告：改动文件、行为变化、测试命令、真实退出码、已知风险。真正的提交与推送由你批准。

## 读懂 Git 差异

```powershell
git status --short
git diff
git diff --check
python -m unittest discover -s tests -v
```

diff --check 主要查空白等问题，不证明逻辑正确。无测试失败也不证明业务正确，尤其测试可能根本没有覆盖新增 student 版本。

不要轻易使用 reset --hard、clean -fd 或强制推送。想撤销已提交的共享变更，通常考虑 git revert，并确认它会创建新提交；恢复未提交文件可能丢掉工作，先保存差异并确认目标。

## 必须保留的边界测试

缺文件、列不对、重复 id、非法 status、负数 minutes、路径越界、非 JSON 响应、非法标签。练习包已有部分覆盖，本周至少补充一种未覆盖情形，例如重复 CSV id 或 minutes=-1。

可以用临时目录与测试中构造的 CSV，不修改真实 data/tickets.csv。测试失败先看最小原因，不把所有断言改宽松。

## 面试与验收

问：Agent 改完测试全绿就能合并吗？答：还要检查覆盖、验收口径、权限、副作用与差异，关键变更需要人审。

问：红—绿—重构是什么？答：先证明测试能捕获目标行为缺失，再最小实现使其通过，最后在保持测试的前提下改进结构。

问：如何防止 Agent 无限修复？答：限制轮次、时间、预算，记录失败，满足停机条件就交给人，不让模型无止境试错。

验收：有基线与至少两次有意义的小提交；新增测试真实覆盖你的代码；完整测试通过；能说明如何安全撤销变更。失败记录可保留，敏感日志不可提交。


---

[课程总览](harness-12-weeks.html) · [上一站](harness-week-05.html) · [下一站](harness-week-07.html)
