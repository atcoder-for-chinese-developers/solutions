# Atcoder for Chinese 题解仓库

## 基本信息

一个简易的存放文章的仓库，用于存放 Atcoder for Chinese 的题解的仓库。

## 使用方法

### 如何贡献

Fork 之后直接在仓库中新建文章或修改文章。

仓库采用 GitHub Actions 自动部署。修改完文章后，待 GitHub Actions 执行完毕，就可以在 GitHub Pages 里面下载文章或获取文章列表 `list.json`。

文章的基本格式如下：

```markdown
---
title: "<文章标题>"
tags: [ "<标签 1>", "<标签 2>", "<...>" ]
author: "<原作者（转载 / 翻译请注意版权问题）>"
created: "<创作时间（格式比较随意，但需要保证能够被识别）>"
---

<!-- 以上内容在发布时会被删除，并以 JSON 格式写入 list.json -->

<!-- 下面是正文 -->

...
```

文章命名采用 `<比赛编号>.<题目编号>.<标识符>.md`，并且需要保证其中没有多余的 `.`。

### 如何使用

等待 GitHub Actions 成功执行后，会将仓库内容部署到 GitHub Pages。

访问 `<你的 GitHub Pages 网址，如 https://example.github.io>/solutions/<比赛编号>.<题目编号>.<标识符>.md` 可以下载对应文章的 Markdown 源码；

访问 `<你的 GitHub Pages 网址，如 https://example.github.io>/solutions/list.json` 可以下载 `list.json` 文件。

`list.json` 文件包含了文章列表和所有文章的头部信息，格式如下：

```json
{
    "<比赛编号>": {
        "<题目编号>": {
            "<标识符>": {
                "title": "<...>",
                "tags": [ "<标签 1>", "<标签 2>", "<...>" ],
                "author": "<...>",
                "created": "<...>"
                /* 还有剩余的一些非必要但出现在文章头部的信息 */
            }
        }
    }
}
```
