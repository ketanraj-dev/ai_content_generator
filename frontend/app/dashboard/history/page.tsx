'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Card, { CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { getUserPosts } from '@/lib/api';
import type { Post } from '@/lib/types';

export default function HistoryPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getUserPosts();
        setPosts(data);
      } catch {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, [router]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Post History</h1>
        <p className="text-sm text-gray-500 mt-1">
          View all your generated and published posts
        </p>
      </div>

      {loading ? (
        <Card>
          <div className="flex items-center justify-center py-12">
            <svg className="w-6 h-6 text-indigo-600 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        </Card>
      ) : posts.length === 0 ? (
        <Card>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-sm text-gray-500 font-medium">No history yet</p>
            <p className="text-xs text-gray-400 mt-1">
              Generated posts will appear here
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <Card key={post.id}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 line-clamp-3">
                    {post.draft}
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-xs text-gray-400">
                      {new Date(post.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    {post.youtube_url && (
                      <a
                        href={post.youtube_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-indigo-600 hover:text-indigo-700 transition-colors"
                      >
                        View source
                      </a>
                    )}
                  </div>
                </div>
                <Badge
                  variant={post.published ? 'success' : 'neutral'}
                >
                  {post.published ? 'Published' : 'Draft'}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
