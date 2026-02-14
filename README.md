# NyaaByte CMS

一个基于 GitHub API 的 Headless CMS，用于管理 NyaaByte 博客的文章。

## 功能特性

- 🔐 通过 GitHub Personal Access Token 认证
- 📝 富文本编辑器（支持 Markdown、代码高亮、表格、图片等）
- 🖼️ 图片拖拽上传
- 🏷️ 标签管理
- 🚀 一键发布到博客仓库

## 技术栈

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- TipTap 编辑器
- GitHub REST API (@octokit/rest)

## 部署到 Vercel

### 1. 创建 Vercel 项目

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 部署
vercel
```

### 2. 配置环境变量

在 Vercel Dashboard 中设置以下环境变量：

- `GITHUB_TOKEN`: GitHub Personal Access Token
- `GITHUB_OWNER`: GitHub 用户名 (J621111)
- `GITHUB_REPO`: 博客仓库名 (NyaaByte-Blog)
- `GITHUB_CONTENT_PATH`: 文章存放路径 (content)

### 3. GitHub Token 权限

确保你的 GitHub Token 有以下权限：
- `repo` - 完全控制仓库

## 本地开发

```bash
# 安装依赖
npm install

# 配置环境变量
cp .env.local.example .env.local
# 编辑 .env.local 填入你的配置

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000

## 使用方法

1. 打开 CMS 首页查看所有文章
2. 点击"新建文章"创建新文章
3. 在编辑器中编写内容（支持富文本和 Markdown）
4. 点击"保存文章"自动 commit 到博客仓库
5. 博客站点会自动获取最新内容

## 注意事项

- 文章会自动生成 slug（URL 友好的标识符）
- 图片会上传到博客仓库的 `public/images/` 目录
- 文章保存后会立即推送到 GitHub
