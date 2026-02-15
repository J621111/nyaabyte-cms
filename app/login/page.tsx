'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Sparkles, Heart, Cat } from 'lucide-react';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('请输入密码哦~');
      return;
    }
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/');
        router.refresh();
      } else {
        setError(data.error || '密码不对哦~再试一次吧！');
      }
    } catch (err) {
      setError('登录失败，请重试~');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-pink-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-purple-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-100/50 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* 🌸 标题区域 */}
        <div className="text-center mb-8">
          {/* 猫咪头像 */}
          <div className="relative inline-block mb-4">
            <div className="w-28 h-28 bg-gradient-to-br from-pink-400 via-pink-300 to-purple-400 rounded-full flex items-center justify-center shadow-[0_12px_0_0_rgb(190,24,93)] border-4 border-white relative">
              <Cat className="h-14 w-14 text-white" />
              {/* 蝴蝶结装饰 */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                <div className="w-8 h-4 bg-pink-500 rounded-full" />
                <div className="absolute -top-1 left-1 w-3 h-3 bg-pink-300 rounded-full" />
                <div className="absolute -top-1 right-1 w-3 h-3 bg-pink-300 rounded-full" />
              </div>
            </div>
            {/* 浮动装饰 */}
            <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-400 animate-pulse" />
            <Heart className="absolute -bottom-1 -right-1 h-5 w-5 text-pink-500 fill-pink-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          
          <h1 className="text-3xl font-extrabold text-pink-600 mb-2 tracking-wide">
            NyaaByte CMS
          </h1>
          <p className="text-pink-400 font-medium">✨ 欢迎回来喵~ ✨</p>
        </div>

        {/* 登录卡片 */}
        <div className="bg-white/95 backdrop-blur rounded-[2rem] shadow-[0_20px_60px_-15px_rgb(219,39,119,0.3)] border-4 border-pink-100 p-10 relative">
          {/* 顶部装饰 */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <div className="w-4 h-4 bg-pink-400 rounded-full" />
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 密码输入 */}
            <div className="space-y-3">
              <Label htmlFor="password" className="flex items-center gap-2 text-pink-600 font-bold text-lg ml-1">
                <Lock className="h-5 w-5" />
                管理员密码
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="请输入密码..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="h-14 text-base pl-5 pr-5 bg-pink-50/50 border-2 border-pink-200 focus:border-pink-400 rounded-2xl transition-all duration-300"
                />
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-pink-300" />
              </div>
            </div>

            {/* 错误提示 */}
            {error && (
              <div className="p-4 bg-red-50 border-2 border-red-200 rounded-2xl text-sm text-red-500 flex items-center gap-3">
                <span className="text-xl">😿</span>
                {error}
              </div>
            )}

            {/* 登录按钮 - 大幅改进 */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 text-lg font-bold rounded-2xl bg-gradient-to-r from-pink-500 via-pink-400 to-purple-500 hover:from-pink-600 hover:via-pink-500 hover:to-purple-600 text-white shadow-[0_8px_0_0_rgb(190,24,93),0_12px_20px_-5px_rgb(219,39,119,0.4)] hover:shadow-[0_4px_0_0_rgb(190,24,93),0_8px_15px_-3px_rgb(219,39,119,0.4)] hover:translate-y-[2px] transition-all duration-200 active:shadow-[0_2px_0_0_rgb(190,24,93)] active:translate-y-[4px]"
            >
              {isLoading ? (
                <span className="flex items-center gap-3">
                  <span className="animate-spin text-xl">🌸</span>
                  <span>登录中...</span>
                </span>
              ) : (
                <span className="flex items-center gap-3">
                  <Cat className="h-6 w-6" />
                  <span>点击进入后台</span>
                  <span>🐾</span>
                </span>
              )}
            </Button>
          </form>

          {/* 底部提示 */}
          <div className="mt-8 pt-6 border-t-2 border-pink-50">
            <p className="text-center text-sm text-pink-400 flex items-center justify-center gap-2">
              <Lock className="h-4 w-4" />
              受保护的管理后台
            </p>
          </div>
        </div>
        
        {/* 底部装饰 */}
        <div className="flex justify-center gap-4 mt-8">
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

        {/* 返回链接 */}
        <div className="text-center mt-6">
          <a href="/" className="text-pink-400 hover:text-pink-500 text-sm font-medium transition-colors">
            ← 返回首页
          </a>
        </div>
      </div>
    </div>
  );
}