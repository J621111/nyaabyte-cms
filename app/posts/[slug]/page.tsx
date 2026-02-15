'use client';

import { getPostBySlug } from '@/lib/github';
import PostEditor from '@/components/Editor/PostEditor';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface EditPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { slug } = await params;
  const isNew = slug === 'new';
  const post = isNew ? null : await getPostBySlug(slug);

  return (
    <main className="min-h-screen">
      {/* 🌸 可爱Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b-2 border-pink-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="icon" className="rounded-xl">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{isNew ? '✨' : '📝'}</span>
              <h1 className="text-lg font-bold text-pink-600">
                {isNew ? '新建文章' : '编辑文章'}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-400" />
            <span className="text-sm text-pink-400">加油创作喵~</span>
          </div>
        </div>
      </header>

      {/* Editor */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <PostEditor 
          post={post} 
          isNew={isNew}
        />
      </div>
    </main>
  );
}
