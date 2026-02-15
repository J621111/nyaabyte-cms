'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Sparkles, Heart } from 'lucide-react';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 🌸 可爱装饰 */}
        <div className="text-center mb-8 relative">
          <div className="absolute -top-8 -left-4 animate-float">
            <Sparkles className="h-6 w-6 text-yellow-400" />
          </div>
          <div className="absolute -top-4 -right-2 animate-float" style={{animationDelay: '0.5s'}}>
            <Heart className="h-5 w-5 text-pink-400 fill-pink-400" />
          </div>
          
          {/* 头像框 */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-pink-300 to-purple-400 rounded-full mb-4 shadow-[0_8px_0_0_rgb(219,39,119)] border-4 border-white">
            <span className="text-4xl">🐱</span>
          </div>
          
          <h1 className="text-2xl font-bold text-pink-600 mb-1">NyaaByte CMS</h1>
          <p className="text-pink-400 text-sm">✨ 欢迎回来喵~ ✨</p>
        </div>

        {/* 登录卡片 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-[0_8px_0_0_rgb(251,207,232)] border-2 border-pink-200 p-8 relative overflow-hidden">
          {/* 装饰背景 */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
          
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2 text-pink-600 font-bold">
                <Lock className="h-4 w-4" />
                密码
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="请输入管理员密码..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border-2 border-red-200 rounded-2xl text-sm text-red-500 flex items-center gap-2">
                <span>😿</span>
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">🌸</span>
                  登录中...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span>🐾</span>
                  进入后台
                </span>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t-2 border-pink-100 text-center">
            <p className="text-xs text-pink-400">
              🔒 受保护的管理后台喵~
            </p>
          </div>
        </div>
        
        {/* 底部装饰 */}
        <div className="flex justify-center gap-2 mt-6">
          <span className="animate-bounce" style={{animationDelay: '0s'}}>🌸</span>
          <span className="animate-bounce" style={{animationDelay: '0.1s'}}>⭐</span>
          <span className="animate-bounce" style={{animationDelay: '0.2s'}}>💖</span>
          <span className="animate-bounce" style={{animationDelay: '0.3s'}}>⭐</span>
          <span className="animate-bounce" style={{animationDelay: '0.4s'}}>🌸</span>
        </div>
      </div>
    </div>
  );
}
