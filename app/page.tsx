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
      <header className="sticky top-4 z-50 px-4 mb-8">
        <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-6 py-3 flex items-center justify-between transition-all hover:shadow-[0_8px_30px_rgb(236,72,153,0.1)]">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 via-pink-300 to-purple-400 rounded-full flex items-center justify-center shadow-inner border-2 border-white">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-extrabold text-pink-600 tracking-wide">NyaaByte</h1>
              </div>
            </div>
            {authenticated && (
              <span className="ml-1 px-2.5 py-1 bg-green-100 text-green-600 text-xs font-bold rounded-full border border-green-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"/>
                已登录
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <span className="hidden sm:flex text-xs font-medium text-pink-500 bg-pink-50 px-3 py-1.5 rounded-full border border-pink-100 items-center gap-1.5">
              <Sparkles className="h-3 w-3" />
              {posts.length} 篇文章
            </span>
            {authenticated ? (
              <>
                <Link href="/posts/new">
                  <Button size="sm" className="rounded-full shadow-pink-200/50">
                    <Plus className="h-4 w-4 mr-1.5" />
                    写文章
                  </Button>
                </Link>
                <LogoutButton />
              </>
            ) : (
              <Link href="/login">
                <Button 
                  size="sm"
                  variant="outline" 
                  className="rounded-full border-pink-200 text-pink-500 hover:bg-pink-50"
                >
                  <LogIn className="h-4 w-4 mr-1.5" />
                  登录
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* 🎀 Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-4 relative z-10 flex flex-col items-center">
        {/* 欢迎语卡片 */}
        <div className="w-full mb-8 text-center">
          <div className="inline-flex flex-col md:flex-row items-center gap-6 bg-white/80 backdrop-blur-sm px-10 py-8 rounded-[2.5rem] border border-white/60 shadow-[0_20px_40px_-15px_rgba(236,72,153,0.15)] hover:scale-[1.01] transition-transform duration-300">
            <div className="relative">
              <span className="text-5xl animate-bounce inline-block">🌸</span>
              <div className="absolute -bottom-2 -right-2 bg-yellow-100 rounded-full p-1">
                <Sparkles className="h-4 w-4 text-yellow-500" />
              </div>
            </div>
            <div className="text-center md:text-left">
              <p className="text-2xl font-black text-gray-800 tracking-tight">
                {authenticated ? '欢迎回来喵！' : '欢迎访客喵！'}
              </p>
              <p className="text-pink-400 font-medium mt-2 text-base">
                {authenticated ? '今天也要元气满满地创作哦~ ✨' : '登录后就可以管理这些可爱的文章啦~ ✨'}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full">
          <PostListClient initialPosts={posts} isAuthenticated={authenticated} />
        </div>
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