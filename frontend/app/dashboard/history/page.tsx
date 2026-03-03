'use client';

import { useEffect, useState } from 'react';
import Card, { CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import type { Post } from '@/lib/types';

export default function HistoryPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('content_history');
      if (stored) setPosts(JSON.parse(stored));
    } catch {
      /* empty */
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Post History</h1>
        <p className="text-sm text-gray-500 mt-1">
          View all your generated and published posts
        </p>
      </div>

      {posts.length === 0 ? (
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
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    {post.youtubeUrl && (
                      <a
                        href={post.youtubeUrl}
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
                  variant={post.status === 'published' ? 'success' : 'neutral'}
                >
                  {post.status === 'published' ? 'Published' : 'Draft'}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
