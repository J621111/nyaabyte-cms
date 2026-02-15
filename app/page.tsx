import { getAllPosts } from '@/lib/github';
import { Button } from '@/components/ui/button';
import { Plus, FileText, LogIn } from 'lucide-react';
import Link from 'next/link';
import PostListClient from '@/components/PostList/PostListClient';
import { isAuthenticated } from '@/lib/auth';
import LogoutButton from '@/components/Auth/LogoutButton';

export const revalidate = 60;

export default async function Home() {
  const posts = await getAllPosts();
  const authenticated = await isAuthenticated();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">NyaaByte CMS</h1>
            {authenticated && (
              <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                已登录
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              共 {posts.length} 篇文章
            </span>
            {authenticated ? (
              <>
                <Link href="/posts/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    新建文章
                  </Button>
                </Link>
                <LogoutButton />
              </>
            ) : (
              <Link href="/login">
                <Button variant="outline">
                  <LogIn className="h-4 w-4 mr-2" />
                  登录
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <PostListClient initialPosts={posts} isAuthenticated={authenticated} />
      </div>
    </main>
  );
}