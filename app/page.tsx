import { getAllPosts } from '@/lib/github';
import { Button } from '@/components/ui/button';
import { Plus, FileText, LogIn, Sparkles, Heart } from 'lucide-react';
import Link from 'next/link';
import PostListClient from '@/components/PostList/PostListClient';
import { isAuthenticated } from '@/lib/auth';
import LogoutButton from '@/components/Auth/LogoutButton';

export const revalidate = 60;

export default async function Home() {
  const posts = await getAllPosts();
  const authenticated = await isAuthenticated();

  return (
    <main className="min-h-screen">
      {/* 🌸 可爱Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b-2 border-pink-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-400 rounded-2xl flex items-center justify-center shadow-[0_4px_0_0_rgb(219,39,119)] border-2 border-white">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-pink-600">NyaaByte CMS</h1>
              <div className="flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-yellow-400" />
                <span className="text-xs text-pink-400">可爱文章管理器</span>
              </div>
            </div>
            {authenticated && (
              <span className="ml-2 px-3 py-1 bg-gradient-to-r from-green-300 to-green-400 text-white text-xs rounded-full shadow-sm border border-green-300">
                ✓ 已登录
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-pink-400 bg-pink-50 px-3 py-1 rounded-full border border-pink-200">
              📝 共 {posts.length} 篇文章
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

      {/* 🎀 Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 欢迎语 */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl border-2 border-pink-200 shadow-[0_4px_0_0_rgb(251,207,232)]">
            <span className="text-2xl">🌸</span>
            <div className="text-left">
              <p className="text-pink-600 font-bold">
                {authenticated ? '欢迎回来！开始创作吧喵~' : '欢迎访客！登录后可管理文章哦~'}
              </p>
              <p className="text-pink-400 text-sm">
                {authenticated ? '你可以创建、编辑和删除文章' : '你可以浏览所有已发布的文章'}
              </p>
            </div>
            <span className="text-2xl">🐱</span>
          </div>
        </div>

        <PostListClient initialPosts={posts} isAuthenticated={authenticated} />
      </div>
      
      {/* 底部装饰 */}
      <footer className="mt-16 pb-8 text-center">
        <div className="flex justify-center gap-3 mb-4">
          <span className="animate-bounce" style={{animationDelay: '0s'}}>🌸</span>
          <span className="animate-bounce" style={{animationDelay: '0.15s'}}>💖</span>
          <span className="animate-bounce" style={{animationDelay: '0.3s'}}>✨</span>
          <span className="animate-bounce" style={{animationDelay: '0.45s'}}>🐾</span>
          <span className="animate-bounce" style={{animationDelay: '0.6s'}}>💕</span>
          <span className="animate-bounce" style={{animationDelay: '0.75s'}}>🌸</span>
        </div>
        <p className="text-pink-400 text-sm">
          Made with <Heart className="h-4 w-4 inline fill-pink-400 text-pink-400" /> by NyaaByte
        </p>
      </footer>
    </main>
  );
}
