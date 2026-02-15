'use client';

import { Post } from '@/types/post';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { Edit, Trash2, ExternalLink, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface PostListProps {
  posts: Post[];
  onDelete: (slug: string) => void;
  isAuthenticated: boolean;
}

export default function PostList({ posts, onDelete, isAuthenticated }: PostListProps) {
  return (
    <div className="space-y-4">
      {posts.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex flex-col items-center gap-4 bg-white/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-pink-200 shadow-[0_6px_0_0_rgb(251,207,232)]">
            <span className="text-6xl">📭</span>
            <div>
              <p className="text-xl text-pink-500 font-bold">还没有文章哦~</p>
              {isAuthenticated && (
                <p className="text-pink-400 mt-2">点击上方按钮创建新文章喵！</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {posts.map((post, index) => (
            <div
              key={post.slug}
              className="group bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-pink-100 p-5 hover:border-pink-300 hover:shadow-[0_6px_0_0_rgb(251,207,232)] transition-all duration-300"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-pink-700 group-hover:text-pink-500 transition-colors">
                      {post.title}
                    </h3>
                    <Sparkles className="h-4 w-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-pink-400 mb-2 flex items-center gap-1">
                    <span>📅</span>
                    {format(new Date(post.date), 'yyyy年MM月dd日 HH:mm', { locale: zhCN })}
                  </p>
                  <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">
                    {post.description}
                  </p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-600 text-xs rounded-full border border-pink-200 font-medium"
                        >
                          🏷️ {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  {isAuthenticated && (
                    <Link href={`/posts/${post.slug}`}>
                      <Button variant="secondary" size="icon" className="rounded-xl">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                  <Link href={`https://nyaabyte.com/posts/${post.slug}`} target="_blank">
                    <Button variant="outline" size="icon" className="rounded-xl">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                  {isAuthenticated && (
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => onDelete(post.slug)}
                      className="rounded-xl"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
