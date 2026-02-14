'use client';

import { Post } from '@/types/post';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { Edit, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface PostListProps {
  posts: Post[];
  onDelete: (slug: string) => void;
}

export default function PostList({ posts, onDelete }: PostListProps) {
  return (
    <div className="space-y-4">
      {posts.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">暂无文章</p>
          <p className="text-sm mt-2">点击上方按钮创建新文章</p>
        </div>
      ) : (
        posts.map((post) => (
          <div
            key={post.slug}
            className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {format(new Date(post.date), 'yyyy年MM月dd日 HH:mm', { locale: zhCN })}
                </p>
                <p className="text-gray-600 mt-2 line-clamp-2">
                  {post.description}
                </p>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Link href={`/posts/${post.slug}`}>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href={`https://nyaabyte.com/posts/${post.slug}`} target="_blank">
                  <Button variant="ghost" size="icon">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(post.slug)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
