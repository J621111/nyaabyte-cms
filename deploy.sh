#!/bin/bash

# NyaaByte CMS 部署脚本

echo "🚀 开始部署 NyaaByte CMS..."

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：请在 nyaabyte-cms 目录下运行此脚本"
    exit 1
fi

# 安装依赖
echo "📦 安装依赖..."
npm install

# 检查 .env.local 是否存在
if [ ! -f ".env.local" ]; then
    echo "⚠️  警告：未找到 .env.local 文件"
    echo "请创建 .env.local 文件并配置环境变量"
fi

# 构建项目
echo "🔨 构建项目..."
npm run build

# 检查是否安装了 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📥 安装 Vercel CLI..."
    npm i -g vercel
fi

# 部署到 Vercel
echo "🚀 部署到 Vercel..."
vercel --prod

echo "✅ 部署完成！"
echo ""
echo "请确保在 Vercel Dashboard 中设置以下环境变量："
echo "  - GITHUB_TOKEN"
echo "  - GITHUB_OWNER=J621111"
echo "  - GITHUB_REPO=NyaaByte-Blog"
echo "  - GITHUB_CONTENT_PATH=content"
