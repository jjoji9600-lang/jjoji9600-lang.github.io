# 让编码 Agent 少写旧式 JavaScript：Modern Web Guidance 的检索式知识补丁

同一个网页需求，编码 Agent 可能熟练地写出旧式变通方案，却忽略浏览器已经提供的能力。Modern Web Guidance 试图补上这段知识落差：不是重新训练模型，而是在实现前，把与当前任务有关的平台指南送进上下文。

**本文是原创中文摘要与编者解读，不是全文译文。** 项目事实依据 README 与 SKILL；建议部分为编者分析，不代表 HN 社区共识。

## 先找能力，再读指南

项目由 Google Chrome、Microsoft Edge、Mozilla Firefox、MDN 团队与社区协作，为编码 Agent 提供现代 Web 平台的实现模式和兼容性信息。README 描述的流程是：激活相关 skill、本地搜索、按指南 ID 读取内容。搜索结合语义检索与 BM25，目标不是塞入整套文档，而是取回当前实现需要的模式、陷阱与回退办法。

SKILL 建议用二至五个词表达一个动作，每次聚焦一种 UI 能力，避免混入框架名或产品名。编者理解，这种约束是在把宽泛产品需求拆成浏览器能回答的技术问题。检索结果仍须阅读；拿到标题，不等于完成实现依据核对。

## 现代不等于兼容性豁免

项目要求：若能力尚未达到 Baseline Widely available，应遵循指南的回退策略，或尊重用户明确给出的支持政策。因此，原生 API 不代表所有目标设备都支持。

编者建议把验收分为三步：先写清支持哪些浏览器和版本，再确认指南的可用性与回退要求，最后测试不支持时的路径。对企业内网、嵌入式 WebView 或长期不更新的终端，设备实际环境比技术的新旧更重要。知识检索能减少过时方案，却不能代替真实浏览器测试、可访问性检查和代码审查。

## 本地搜索，不等于全程零网络

README 称搜索使用本地模型、自包含包，不需要远程检索 API 密钥；但首次通过 npx 获取包仍需要网络。隐私章节明确说明有匿名用量遥测，包含调用 Agent 名称、指南 ID 和 Agent 生成的搜索词，不收集原始用户提示。可通过环境变量 `DISABLE_TELEMETRY=1` 退出。

团队不能仅凭离线检索就认定整个工具从不联网或不产生遥测。涉及内部项目时，应先审核数据政策与安装来源，避免在搜索词中带入机密。这是编者的部署建议，并非项目已完成的合规保证。

## 它适合补知识，不适合替判断

最适合的场景，是 Agent 已能写代码，但需要在具体 Web 能力上查询较新的实现依据。它既不会升级模型本身，也不能保证每个建议都正确。检索命中、兼容性判断、实现与测试，应当是一条闭环，而非安装 skill 后就自动完成的承诺。

编者也建议把采用的指南与测试结果记入评审说明。这样后续维护者能知道为何选择某项原生能力、为何保留回退，而不必把检索结果当成无法追溯的模型直觉。

## 来源与日期

- 原始项目标题：[Modern Web Guidance](https://github.com/GoogleChrome/modern-web-guidance)；作者/维护者：上述浏览器团队、MDN 与社区。依据 README 和仓库内 [SKILL](https://github.com/GoogleChrome/modern-web-guidance/blob/main/skills/modern-web-guidance/SKILL.md)；原文未明示首发日期，查阅快照为 2026-11-13。
- [HN 讨论](https://news.ycombinator.com/item?id=50443812)：Show HN: Get your coding agent off ~2019 JavaScript, onto modern web primitives；提交于 2026-11-10 18:01（UTC），不是原文首发日。本文未采纳讨论区评论作为事实依据。
- 许可：项目代码 Apache-2.0，指南内容 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)，部分文档源自 MDN 与标准组织。本文重新组织为中文摘要并加入分析，未复制图表或整篇指南；不暗示原作者背书。

<!-- date: 2026-11-14 -->
<!-- tags: JavaScript, Web平台, AI编程, 兼容性 -->
<!-- category: 技术解读 -->
<!-- title: 让编码 Agent 少写旧式 JavaScript：Modern Web Guidance 的检索式知识补丁 -->
