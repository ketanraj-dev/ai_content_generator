'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { generatePost, publishPost, getLinkedInStatus } from '@/lib/api';
import { useToast } from '@/components/ui/ToastProvider';
import GeneratePanel from '@/components/dashboard/GeneratePanel';
import DraftEditor from '@/components/dashboard/DraftEditor';
import HistoryPanel from '@/components/dashboard/HistoryPanel';
import LinkedInStatus from '@/components/dashboard/LinkedInStatus';
import type { Post } from '@/lib/types';

export default function Dashboard() {
  const router = useRouter();
  const { showToast } = useToast();
  const [draft, setDraft] = useState('');
  const [postId, setPostId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [linkedinConnected, setLinkedinConnected] = useState(false);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [authChecked, setAuthChecked] = useState(false);

  // Load history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('content_history');
      if (stored) setPosts(JSON.parse(stored));
    } catch {
      /* empty */
    }
  }, []);

  const saveHistory = useCallback(
    (updatedPosts: Post[]) => {
      setPosts(updatedPosts);
      localStorage.setItem(
        'content_history',
        JSON.stringify(updatedPosts.slice(0, 50))
      );
    },
    []
  );

  // Check authentication + LinkedIn status
  useEffect(() => {
    async function checkStatus() {
      try {
        const data = await getLinkedInStatus();
        setLinkedinConnected(data.connected);
        setAuthChecked(true);
      } catch {
        router.push('/login');
      }
    }
    checkStatus();
  }, [router]);

  async function handleGenerate(youtubeUrl: string) {
    try {
      setLoading(true);
      setError('');
      const data = await generatePost(youtubeUrl);
      setDraft(data.draft);
      setPostId(data.id);
      showToast('success', 'Post generated successfully!');

      // Add to history
      const newPost: Post = {
        id: data.id,
        youtubeUrl,
        draft: data.draft,
        status: 'draft',
        createdAt: new Date().toISOString(),
      };
      saveHistory([newPost, ...posts]);
    } catch (err: any) {
      if (err.message.includes('Not authenticated')) {
        router.push('/login');
      } else {
        setError(err.message);
        showToast('error', err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handlePublish() {
    if (!postId) {
      showToast('error', 'No post to publish');
      return;
    }

    try {
      setPublishing(true);
      await publishPost(postId);
      setError('');
      showToast('success', 'Post published to LinkedIn!');

      // Update history
      const updated = posts.map((p) =>
        p.id === postId ? { ...p, status: 'published' as const } : p
      );
      saveHistory(updated);
    } catch (err: any) {
      setError(err.message);
      showToast('error', err.message);

      // If LinkedIn expired → refresh status
      if (err.message.includes('LinkedIn session expired')) {
        const status = await getLinkedInStatus();
        setLinkedinConnected(status.connected);
      }

      if (err.message.includes('Not authenticated')) {
        router.push('/login');
      }
    } finally {
      setPublishing(false);
    }
  }

  function handleSelectPost(post: Post) {
    setDraft(post.draft);
    setPostId(post.id);
  }

  if (!authChecked) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <svg
            className="w-8 h-8 text-indigo-600 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Transform YouTube videos into LinkedIn content
          </p>
        </div>
        <LinkedInStatus connected={linkedinConnected} />
      </div>

      {/* Error Banner */}
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-red-50 border border-red-200">
          <svg
            className="w-5 h-5 text-red-500 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          <p className="text-sm text-red-700 flex-1">{error}</p>
          <button
            onClick={() => setError('')}
            className="text-red-400 hover:text-red-600 transition-colors cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Generate + Draft */}
        <div className="lg:col-span-2 space-y-6">
          <GeneratePanel onGenerate={handleGenerate} loading={loading} />
          <DraftEditor
            draft={draft}
            onDraftChange={setDraft}
            onPublish={handlePublish}
            linkedinConnected={linkedinConnected}
            publishing={publishing}
          />
        </div>

        {/* Right column - History */}
        <div className="lg:col-span-1">
          <HistoryPanel posts={posts} onSelect={handleSelectPost} />
        </div>
      </div>
    </div>
  );
}