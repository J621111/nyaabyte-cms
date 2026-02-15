'use client';

import { useState } from 'react';
import { Post } from '@/types/post';
import RichTextEditor from '@/components/Editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import slugify from 'slugify';
import { Sparkles, Save, X } from 'lucide-react';

interface PostEditorProps {
  post: Post | null;
  isNew: boolean;
}

export default function PostEditor({ post, isNew }: PostEditorProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    slug: post?.slug || '',
    title: post?.title || '',
    description: post?.description || '',
    content: post?.content || '',
    image: post?.image || '',
    tags: post?.tags?.join(', ') || '',
  });

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: isNew ? slugify(title, { lower: true, strict: true }) : prev.slug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      };

      const url = isNew ? '/api/posts' : `/api/posts/${formData.slug}`;
      const method = isNew ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push('/');
        router.refresh();
      } else if (response.status === 401) {
        alert('会话已过期，请重新登录喵~');
        router.push('/login');
      } else {
        const error = await response.text();
        alert(`保存失败: ${error}`);
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('保存失败喵~');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 🎀 文章信息卡片 */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl border-2 border-pink-200 p-6 shadow-[0_6px_0_0_rgb(251,207,232)]">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">📋</span>
          <h2 className="text-lg font-bold text-pink-600">文章信息</h2>
          <Sparkles className="h-4 w-4 text-yellow-400" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-pink-600 font-bold flex items-center gap-1">
              <span>📝</span> 标题 *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="给文章起个可爱的标题吧~"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug" className="text-pink-600 font-bold flex items-center gap-1">
              <span>🔗</span> Slug *
            </Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="article-url-slug"
              required
              disabled={!isNew}
            />
          </div>
        </div>

        <div className="space-y-2 mt-5">
          <Label htmlFor="description" className="text-pink-600 font-bold flex items-center gap-1">
            <span>💭</span> 描述 *
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="写一段简短的描述，让大家了解文章内容~"
            rows={2}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <div className="space-y-2">
            <Label htmlFor="image" className="text-pink-600 font-bold flex items-center gap-1">
              <span>🖼️</span> 封面图片 URL
            </Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              placeholder="https://example.com/cute-image.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags" className="text-pink-600 font-bold flex items-center gap-1">
              <span>🏷️</span> 标签
            </Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="cute, kawaii, blog"
            />
          </div>
        </div>
      </div>

      {/* 🌸 内容编辑区 */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl border-2 border-pink-200 p-6 shadow-[0_6px_0_0_rgb(251,207,232)]">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">✏️</span>
          <h2 className="text-lg font-bold text-pink-600">文章内容</h2>
          <Sparkles className="h-4 w-4 text-yellow-400" />
        </div>
        <RichTextEditor
          content={formData.content}
          onChange={(content) => setFormData(prev => ({ ...prev, content }))}
          placeholder="开始你的创作之旅吧~✨"
        />
      </div>

      {/* 🎀 操作按钮 */}
      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/')}
        >
          <X className="h-4 w-4 mr-2" />
          取消
        </Button>
        <Button type="submit" disabled={saving} size="lg">
          {saving ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">🌸</span>
              保存中...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              保存文章
            </span>
          )}
        </Button>
      </div>
    </form>
  );
}
