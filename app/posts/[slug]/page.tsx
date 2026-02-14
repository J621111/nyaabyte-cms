import { getPostBySlug } from '@/lib/github';
import PostEditor from '@/components/Editor/PostEditor';
import { ArrowLeft } from 'lucide-react';
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
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">
              {isNew ? '新建文章' : '编辑文章'}
            </h1>
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
