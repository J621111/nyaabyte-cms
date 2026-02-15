'use client';

import { Post } from '@/types/post';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { Edit, Trash2, ExternalLink, Sparkles, Calendar, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface PostListProps {
  posts: Post[];
  onDelete: (slug: string) => void;
  isAuthenticated: boolean;
}

export default function PostList({ posts, onDelete, isAuthenticated }: PostListProps) {
  return (
    <div className="grid gap-5">
      {posts.length === 0 ? (
        <div className="text-center py-20">
          <div className="inline-flex flex-col items-center gap-6 bg-white/50 backdrop-blur-sm rounded-[3rem] p-12 border border-white/60 shadow-lg">
            <div className="relative">
              <span className="text-6xl animate-bounce" style={{ animationDuration: '2s' }}>📭</span>
              <Sparkles className="absolute -top-1 -right-4 h-5 w-5 text-yellow-400 animate-pulse" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-700">还没有文章哦~</p>
              {isAuthenticated && (
                <p className="text-pink-400 mt-2 text-sm">点击右上角的按钮开始创作吧喵！✨</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        posts.map((post, index) => (
          <article
            key={post.slug}
            className="group bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 p-6 shadow-[0_4px_20px_rgb(236,72,153,0.05)] hover:shadow-[0_8px_30px_rgb(236,72,153,0.1)] transition-all duration-300 hover:-translate-y-1"
            style={{animationDelay: `${index * 0.05}s`}}
          >
            <div className="flex items-start justify-between gap-6">
              {/* 左侧内容 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-pink-500 transition-colors truncate">
                    {post.title}
                  </h3>
                  {isAuthenticated && (
                    <Sparkles className="h-4 w-4 text-yellow-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
                
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-xs text-pink-400 bg-pink-50 px-2.5 py-1 rounded-full border border-pink-100 flex items-center gap-1.5 font-medium">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(post.date), 'yyyy年MM月dd日 HH:mm', { locale: zhCN })}
                  </span>
                </div>
                
                <p className="text-gray-500 line-clamp-2 text-sm leading-relaxed mb-4">
                  {post.description}
                </p>
                
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-50 text-gray-500 text-xs font-medium rounded-full border border-gray-100 hover:bg-pink-50 hover:text-pink-500 hover:border-pink-100 transition-colors"
                      >
                        # {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 右侧操作按钮 */}
              <div className="flex flex-col gap-2 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                {isAuthenticated && (
                  <Link href={`/posts/${post.slug}`}>
                    <Button 
                      variant="secondary" 
                      size="icon" 
                      className="rounded-full h-9 w-9 shadow-sm hover:bg-pink-100 hover:text-pink-600 border-none"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
                <Link href={`https://nyaabyte.com/posts/${post.slug}`} target="_blank">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full h-9 w-9 text-gray-400 hover:text-pink-500 hover:bg-pink-50"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </Link>
                {isAuthenticated && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(post.slug)}
                    className="rounded-full h-9 w-9 text-gray-300 hover:text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </article>
        ))
      )}
    </div>
  );
}