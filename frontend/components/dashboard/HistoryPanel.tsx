'use client';

import Card, { CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import type { Post } from '@/lib/types';

interface HistoryPanelProps {
  posts: Post[];
  onSelect?: (post: Post) => void;
}

export default function HistoryPanel({ posts, onSelect }: HistoryPanelProps) {
  if (posts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
        </CardHeader>
        <div className="flex flex-col items-center justify-center py-8 text-center">
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
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-500 font-medium">No posts yet</p>
          <p className="text-xs text-gray-400 mt-1">
            Generate your first post to see it here
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card padding={false}>
      <div className="px-6 pt-6 pb-3">
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
          <span className="text-xs text-gray-400">{posts.length} posts</span>
        </CardHeader>
      </div>
      <div className="max-h-[400px] overflow-y-auto">
        {posts.map((post) => (
          <button
            key={post.id}
            onClick={() => onSelect?.(post)}
            className="w-full text-left px-6 py-3.5 border-t border-gray-100 hover:bg-gray-50 transition-colors duration-150 group cursor-pointer"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm text-gray-700 line-clamp-2 group-hover:text-gray-900 transition-colors">
                {post.draft.slice(0, 120)}
                {post.draft.length > 120 ? '...' : ''}
              </p>
              <Badge
                variant={post.published ? 'success' : 'neutral'}
                className="shrink-0"
              >
                {post.published ? 'Published' : 'Draft'}
              </Badge>
            </div>
            <p className="text-xs text-gray-400 mt-1.5">
              {new Date(post.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </button>
        ))}
      </div>
    </Card>
  );
}
