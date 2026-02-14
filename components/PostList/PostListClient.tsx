'use client';

import { useState } from 'react';
import { Post } from '@/types/post';
import PostList from './index';

interface PostListClientProps {
  initialPosts: Post[];
}

export default function PostListClient({ initialPosts }: PostListClientProps) {
  const [posts, setPosts] = useState(initialPosts);

  const handleDelete = async (slug: string) => {
    if (!confirm('确定要删除这篇文章吗？此操作无法撤销。')) {
      return;
    }

    try {
      const response = await fetch(`/api/posts/${slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPosts(posts.filter((p) => p.slug !== slug));
      } else {
        alert('删除失败');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('删除失败');
    }
  };

  return <PostList posts={posts} onDelete={handleDelete} />;
}
