import { getAllPosts } from '@/lib/github';
import { Button } from '@/components/ui/button';
import { Plus, FileText } from 'lucide-react';
import Link from 'next/link';
import PostListClient from '@/components/PostList/PostListClient';

export const revalidate = 60;

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">NyaaByte CMS</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              共 {posts.length} 篇文章
            </span>
            <Link href="/posts/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                新建文章
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <PostListClient initialPosts={posts} />
      </div>
    </main>
  );
}
