<!-- title: 小白版第10周：第一次使用 GitHub，不需要先学 Git 命令 -->
<!-- slug: harness-beginner-week-10 -->
<!-- date: 2026-11-14 00:01:10 -->
<!-- tags: 零基础, DeepSeek Harness, AI入门 -->
<!-- category: 小白十二周教程 -->
<!-- description: 从零开始，逐步操作：第一次使用 GitHub，不需要先学 Git 命令。说明在哪里点、输入什么、看到什么和出错怎么办。 -->

[回到课程目录](harness-beginner.html) · [上一课](harness-beginner-week-09.html) · [下一课](harness-beginner-week-11.html) · [卡住了看这里](harness-beginner-help.html)


## 这周只做一件事：让自己的作品有一个网上的位置

GitHub 是放代码与项目资料的网站。你可以把仓库理解成网上的项目文件夹。Git 则是管理修改记录的工具，和 GitHub 不是同一个东西。

**本周只用浏览器，不安装 Git、不用命令行上传。** 仓库设为公开后，别人可能看得到内容，所以先学会不上传秘密。

## 第64天：注册自己的 GitHub 账号

打开 [https://github.com/](https://github.com/)，找到 Sign up，按页面提示填写账号信息、完成邮箱验证与平台要求的验证步骤。已经有账号就登录。

常见英文：Sign up 是注册，Sign in 是登录，Username 是用户名，Password 是密码。用户名以后可能出现在网址里，选一个你愿意公开的，不放身份证号或手机号。

无法访问或验证失败时暂停，按官方帮助处理；不买共享账号，不把邮箱验证码和密码发给助手。

## 第65天：创建第一个仓库

登录后找右上角加号中的 New repository，或个人主页的 Repositories → New。页面位置可能调整，但目标是新建仓库。

填写：

- Repository name：my-ai-learning，这是项目名字。
- Description：我的 DeepSeek Harness 学习练习，可选。
- 可见性：这份公开展示练习选 Public；仅放已经审查过的模拟材料。
- 如果有添加 README 的选项，勾上。README 是项目首页说明。

点 Create repository。不要加付费套餐或无关服务。

**完成标志：** 页面网址大致是 github.com/你的用户名/my-ai-learning，并能看到文件列表。

## 第66天：先只修改首页说明

在文件列表点 README.md，再找编辑按钮，通常是铅笔图标。把内容改成三句自己的话：

```text
这是我的第一个 DeepSeek Harness 学习项目。
目前我实际完成了：按真实情况填写。
仍然不会或没验证的是：按真实情况填写。
```

.md 是 Markdown 文本，普通文字也能用；今天不必学花式排版。点 Commit changes 或保存修改，按弹窗写一句修改说明，再确认。

Commit 可以先理解为保存这一版并留下记录，不是支付或公开 API 调用。

## 第67天：第一次上传文件，只选三个

先在本地确认原始 requests.csv 已恢复。回到仓库文件列表，找 Add file → Upload files。

点击选择文件，进入练习目录，**只选 report.py、test_report.py、requests.csv**，也可以分三次上传。不要拖整个 AI-Learn，更不要拖整个文档文件夹。

确认上传列表没有 Key、聊天截图、真实资料或备份。写一句上传模拟练习文件，再点 Commit changes。

**完成标志：** 仓库列表能看到三个文件，点开显示的是代码或模拟表格。

## 第68天：看一眼修改记录

在仓库或文件页面找到 History／Commits。你应该能看到自己编辑说明和上传文件的记录。

这就是为什么说 GitHub 不只是网盘：除了放文件，还能留修改记录。今天只看，不要求你会分支、合并或撤销。

注意：以后即使删掉文件，旧记录里也可能还有内容。因此 Key 泄露时首先撤销密钥，不能只在网页上删除文件了事。

## 第69天：模拟别人第一次访问

复制仓库网址，打开浏览器无痕／隐私窗口粘贴进去。不要在这个窗口输入自己的 GitHub 密码，只看公开页面是否能打开。

看 README 是否说明这是学习练习、哪些是参考材料、自己实际改了哪里。别人没看课程，能否知道这个项目是做什么的？不清楚就再改三句话。

## 第70天：本周过关

能登录、找到自己的仓库、编辑 README、上传指定文件、复制链接。知道公开就是别人可能看见，知道仓库不是电脑上的同名文件夹。

**还不需要会 Git 命令。** 浏览器上传已经够你迈出第一步，后面需要团队协作、频繁改代码时再补 Git。

## 卡住时这样求助

```text
我已经登录 GitHub，仓库名是 my-ai-learning。
我想上传三个无秘密的练习文件，现在停在这个页面。
请解释我看到的英文，并只告诉我下一次点哪里。
不要让我先安装 Git，也不要索要登录信息。
```

暂时不能注册或访问 GitHub时，先保留本地作品并标记未发布，继续阅读下一周，不虚构一个已上线链接。


---

[回到课程目录](harness-beginner.html) · [上一课](harness-beginner-week-09.html) · [下一课](harness-beginner-week-11.html) · [卡住了看这里](harness-beginner-help.html)
