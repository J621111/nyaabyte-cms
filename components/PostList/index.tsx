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
          <div className="inline-flex flex-col items-center gap-5 bg-white/90 backdrop-blur-md rounded-[2rem] p-12 border-3 border-pink-200 shadow-[0_15px_50px_-20px_rgb(219,39,119,0.3)]">
            <div className="relative">
              <span className="text-7xl">📭</span>
              <Sparkles className="absolute -top-2 -right-4 h-6 w-6 text-yellow-400 animate-pulse" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-pink-500">还没有文章哦~</p>
              {isAuthenticated && (
                <p className="text-pink-400 mt-3 font-medium">点击上方按钮创建新文章喵！✨</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        posts.map((post, index) => (
          <article
            key={post.slug}
            className="group bg-white/90 backdrop-blur-md rounded-[1.5rem] border-3 border-pink-100 p-6 hover:border-pink-300 hover:shadow-[0_15px_40px_-15px_rgb(219,39,119,0.25)] transition-all duration-300 hover:-translate-y-1"
            style={{animationDelay: `${index * 0.05}s`}}
          >
            <div className="flex items-start justify-between gap-6">
              {/* 左侧内容 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-extrabold text-pink-700 group-hover:text-pink-500 transition-colors truncate">
                    {post.title}
                  </h3>
                  <Sparkles className="h-5 w-5 text-yellow-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm text-pink-400 flex items-center gap-1.5 font-medium">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(post.date), 'yyyy年MM月dd日 HH:mm', { locale: zhCN })}
                  </span>
                </div>
                
                <p className="text-gray-600 line-clamp-2 text-base leading-relaxed mb-4">
                  {post.description}
                </p>
                
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-1.5 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-600 text-sm font-semibold rounded-full border-2 border-pink-200"
                      >
                        🏷️ {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 右侧操作按钮 */}
              <div className="flex flex-col gap-2 shrink-0">
                {isAuthenticated && (
                  <Link href={`/posts/${post.slug}`}>
                    <Button 
                      variant="secondary" 
                      size="icon" 
                      className="rounded-xl h-10 w-10 shadow-md hover:shadow-lg"
                    >
                      <Edit className="h-5 w-5" />
                    </Button>
                  </Link>
                )}
                <Link href={`https://nyaabyte.com/posts/${post.slug}`} target="_blank">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-xl h-10 w-10 shadow-md hover:shadow-lg"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </Button>
                </Link>
                {isAuthenticated && (
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => onDelete(post.slug)}
                    className="rounded-xl h-10 w-10 shadow-md hover:shadow-lg"
                  >
                    <Trash2 className="h-5 w-5" />
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