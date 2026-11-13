<!-- title: 小白版第11周：把学习作品变成一个别人能打开的网页 -->
<!-- slug: harness-beginner-week-11 -->
<!-- date: 2026-11-14 00:01:09 -->
<!-- tags: 零基础, DeepSeek Harness, AI入门 -->
<!-- category: 小白十二周教程 -->
<!-- description: 从零开始，逐步操作：把学习作品变成一个别人能打开的网页。说明在哪里点、输入什么、看到什么和出错怎么办。 -->

[回到课程目录](harness-beginner.html) · [上一课](harness-beginner-week-10.html) · [下一课](harness-beginner-week-12.html) · [卡住了看这里](harness-beginner-help.html)


## 这周只做一件事：让别人点开网页就能看懂你的练习

上周的仓库像网上文件夹，这周做一个项目介绍网页。GitHub Pages 就是把仓库里的网页文件发布成网站的功能。

**它不是运行 AI 的服务器。** 网页只是介绍作品，不会运行 Python，不放 API Key，也不提供让所有人花你余额的模型按钮。

## 第71天：先在自己电脑上看模板

打开练习目录，进入 site-example 文件夹，找到 index.html，双击。一般会在浏览器打开一个简单页面。

.html 是网页文件。浏览器负责显示它，记事本可以编辑里面的文字。不需要先学完整前端开发。

应该看到我的第一个 DeepSeek Harness 练习，以及几个待填写区域。这是模板，不是你的真实成果，先不要直接发布。

## 第72天：让 DSH 帮忙，只改介绍文字

把你真实完成的三件事写在 learn.txt，注意不要含 Key。回到 DSH，确认工作目录，发送：

```text
请先读取 site-example/index.html，暂时不要修改。
我想把介绍改成我的真实学习成果：这里填三件确实做过的事。
未完成的 API／Skill 功能必须写未完成，不能替我编造数据。
只改这个网页的文字，不加外部脚本、不联网、不加模型调用。
先说准备改哪里，等我确认。
```

审核后批准改动。自己重新双击 index.html，或在浏览器按 Ctrl+R 刷新，核对内容。没有真实做过的能力直接删掉或写待完成。

## 第73天：上传网页，只选 index.html

打开 GitHub 的 my-ai-learning 仓库，回到最外层的文件列表，也就是能同时看到 README.md 和 report.py 的页面。

选择 Add file → Upload files，进入本地 site-example，选里面的 index.html 上传。**上传的是文件本身，不是整个 site-example 文件夹。**

写一句添加项目介绍页，点 Commit changes。完成后，仓库最外层应直接看到 index.html。若变成 site-example/index.html，先停止，按当前页面的移动／上传操作求助，不要乱删其他文件。

## 第74天：开启 Pages

在你自己的仓库页点 Settings，不是账号头像里的全局设置。在侧边栏找 Pages，常见在 Code and automation 分组下。

在构建与发布区域，按当前 GitHub 页面选择：

```text
Source：Deploy from a branch（从分支发布）
Branch：main（以你仓库真实默认分支名为准）
Folder：/ (root)（仓库最外层）
```

点 Save。不要填自定义域名，也不需要绑定银行卡。若页面只有其他选项，先对照[GitHub 官方 Pages 帮助](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)，别随便开启付费计划。

之所以选 root，是因为上一天把 index.html 放在最外层；路径和文件位置必须对应。

## 第75天：等待，然后用正确的网址访问

发布可能需要几分钟。等 Pages 页面提示已发布或给出网站地址，再点 Visit site 或复制该地址。

常见格式像 https://你的用户名.github.io/my-ai-learning/，但以 GitHub 实际给出的地址为准。不要把带中文的示例网址原样当自己的网址。

**完成标志：** 打开的是你的介绍网页，不是 GitHub 文件列表，也不是 index.html 的源代码页。

## 第76天：排查最常见的404

404 可以先理解为这个网址暂时没有找到页面。按顺序检查：

1. 仓库最外层有没有 index.html，注意不是 index.html.txt，也不是 Index.html。
2. Pages 是否选对分支、是否选 root，而不是 docs。
3. 是否已经等待发布完成，网址有没有漏掉 my-ai-learning。
4. 页面显示发布失败时，先读失败信息或求助，不连续重新上传相同文件。

如果网页还显示旧文字，先刷新或用无痕窗口看；后台未发布完成时不只是浏览器缓存问题。

## 第77天：像陌生读者一样检查

用无痕窗口打开网站，检查中文是否正常、内容有没有虚构、有没有账号信息或密钥、项目链接是否正确。再请朋友看一句：你能看懂我做了什么吗？

把真实的网址写在 learn.txt。没有发布成功，就写未成功，不为了简历贴一个打不开的链接。

**本周过关：** 你有一份真实、无秘密、别人能打开的静态介绍页。它不需要漂亮，更不需要一个实际消耗 API 余额的在线演示。

## 学会一句话解释

GitHub 仓库保存项目文件；GitHub Pages 把其中的静态网页展示出来；运行 Python 和调用 API 是另外的事情。把这三个分清，你已经跨过了很多第一次用 GitHub 的困惑。


---

[回到课程目录](harness-beginner.html) · [上一课](harness-beginner-week-10.html) · [下一课](harness-beginner-week-12.html) · [卡住了看这里](harness-beginner-help.html)
