# NyaaByte CMS

一个基于 GitHub API 的 Headless CMS，用于管理 NyaaByte 博客的文章。

## 功能特性

- 🔐 **管理员认证系统** - 密码保护的管理后台
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
- Cookie-based Session 认证

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

**GitHub 配置：**
- `GITHUB_TOKEN`: GitHub Personal Access Token
- `GITHUB_OWNER`: GitHub 用户名
- `GITHUB_REPO`: 博客仓库名
- `GITHUB_CONTENT_PATH`: 文章存放路径 (默认为 content)

**CMS 管理员配置（新增）：**
- `CMS_ADMIN_PASSWORD`: 管理员登录密码（必需，否则无法登录管理后台）

### 3. GitHub Token 权限

确保你的 GitHub Token 有以下权限：
- `repo` - 完全控制仓库

## 本地开发

```bash
# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 填入你的配置

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000

## 使用方法

### 公开访问
- 文章列表页面可以公开访问，无需登录
- 任何人都可以查看已发布的文章

### 管理功能（需要登录）
1. 访问 `/login` 页面
2. 输入管理员密码（环境变量 `CMS_ADMIN_PASSWORD` 中设置的密码）
3. 登录后可以：
   - 创建新文章
   - 编辑现有文章
   - 删除文章
   - 上传图片

### 会话管理
- 登录会话有效期为 7 天
- 可以随时点击"登出"按钮退出登录
- 会话过期后需要重新登录

## 安全注意事项

1. **强密码策略**: 请使用强密码作为 `CMS_ADMIN_PASSWORD`
2. **Token 保密**: 永远不要将 `GITHUB_TOKEN` 提交到代码仓库
3. **环境变量**: 在生产环境使用 Vercel 或其他平台的环境变量功能
4. **HTTPS**: 确保生产环境使用 HTTPS，以保护会话 Cookie

## 注意事项

- 文章会自动生成 slug（URL 友好的标识符）
- 图片会上传到博客仓库的 `public/images/` 目录
- 文章保存后会立即推送到 GitHub
- 所有修改操作（创建、编辑、删除、上传）都需要管理员登录

## 更新日志

### 2024-02-15
- ✨ 新增管理员认证系统
- 🔒 API 路由添加认证保护
- 🔒 管理界面添加登录保护
- 📄 更新文档说明
