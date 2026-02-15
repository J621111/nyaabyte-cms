import { getAllPosts } from '@/lib/github';
import { Button } from '@/components/ui/button';
import { Plus, FileText, LogIn, Sparkles, Heart, Cat } from 'lucide-react';
import Link from 'next/link';
import PostListClient from '@/components/PostList/PostListClient';
import { isAuthenticated } from '@/lib/auth';
import LogoutButton from '@/components/Auth/LogoutButton';

export const revalidate = 60;

export default async function Home() {
  const posts = await getAllPosts();
  const authenticated = await isAuthenticated();

  return (
    <main className="min-h-screen relative">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl translate-x-1/2" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-pink-100/30 rounded-full blur-3xl" />
      </div>

      {/* 🌸 可爱Header */}
      <header className="bg-white/80 backdrop-blur-md border-b-2 border-pink-200/50 sticky top-0 z-50 relative">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 via-pink-300 to-purple-400 rounded-2xl flex items-center justify-center shadow-[0_6px_0_0_rgb(190,24,93)] border-3 border-white">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-pink-600 tracking-wide">NyaaByte CMS</h1>
                <div className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-yellow-400" />
                  <span className="text-xs text-pink-400 font-medium">可爱文章管理器</span>
                </div>
              </div>
            </div>
            {authenticated && (
              <span className="ml-2 px-3 py-1.5 bg-gradient-to-r from-green-400 to-emerald-400 text-white text-xs font-bold rounded-full shadow-md border-2 border-green-300">
                ✓ 已登录
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-pink-500 bg-pink-50 px-4 py-2 rounded-full border-2 border-pink-200">
              📝 {posts.length} 篇文章
            </span>
            {authenticated ? (
              <>
                <Link href="/posts/new">
                  <Button className="shadow-lg">
                    <Plus className="h-5 w-5 mr-2" />
                    新建文章
                  </Button>
                </Link>
                <LogoutButton />
              </>
            ) : (
              <Link href="/login">
                <Button 
                  variant="outline" 
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0 hover:from-pink-600 hover:to-purple-600 shadow-lg"
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  登录
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* 🎀 Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-10 relative z-10">
        {/* 欢迎语卡片 */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-4 bg-white/90 backdrop-blur-md px-8 py-5 rounded-[2rem] border-3 border-pink-200 shadow-[0_10px_40px_-15px_rgb(219,39,119,0.3)]">
            <span className="text-4xl animate-pulse">🌸</span>
            <div className="text-left">
              <p className="text-xl font-extrabold text-pink-600">
                {authenticated ? '欢迎回来！开始创作吧喵~' : '欢迎访客！登录后可管理文章哦~'}
              </p>
              <p className="text-pink-400 font-medium mt-1">
                {authenticated ? '你可以创建、编辑和删除文章' : '你可以浏览所有已发布的文章'}
              </p>
            </div>
            <span className="text-4xl animate-pulse" style={{ animationDelay: '0.5s' }}>🐱</span>
          </div>
        </div>

        <PostListClient initialPosts={posts} isAuthenticated={authenticated} />
      </div>
      
      {/* 底部装饰 */}
      <footer className="mt-20 pb-10 text-center relative z-10">
        <div className="flex justify-center gap-3 mb-6">
          {['🌸', '✨', '💖', '⭐', '🐾', '💕', '🌸'].map((emoji, i) => (
            <span 
              key={i} 
              className="animate-bounce text-2xl"
              style={{ animationDelay: `${i * 0.1}s`, animationDuration: '1s' }}
            >
              {emoji}
            </span>
          ))}
        </div>
        <p className="text-pink-400/80 text-sm font-medium flex items-center justify-center gap-2">
          Made with <Heart className="h-4 w-4 inline fill-pink-400 text-pink-400 animate-pulse" /> by NyaaByte
        </p>
      </footer>
    </main>
  );
}