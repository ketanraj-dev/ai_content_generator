'use client';

import { useState } from 'react';
import Card, { CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface GeneratePanelProps {
  onGenerate: (url: string) => Promise<void>;
  loading: boolean;
}

export default function GeneratePanel({
  onGenerate,
  loading,
}: GeneratePanelProps) {
  const [url, setUrl] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    await onGenerate(url.trim());
  }

  return (
    <Card>
      <CardHeader>
        <div className="space-y-1">
          <CardTitle>Generate Content</CardTitle>
          <p className="text-sm text-gray-500">
            Paste a YouTube URL to generate a LinkedIn post
          </p>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-gray-50 focus-within:border-indigo-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100 transition-all duration-200">
          <svg
            className="w-5 h-5 text-gray-400 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
            />
          </svg>
          <input
            type="url"
            placeholder="https://youtube.com/watch?v=..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none"
            disabled={loading}
          />
        </div>

        <Button
          type="submit"
          loading={loading}
          disabled={!url.trim()}
          className="w-full"
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
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
            />
          </svg>
          {loading ? 'Generating...' : 'Generate Post'}
        </Button>
      </form>

      {loading && (
        <div className="mt-4 flex items-center gap-3 p-4 rounded-lg bg-indigo-50 border border-indigo-100">
          <svg
            className="w-5 h-5 text-indigo-600 animate-spin"
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
          <div>
            <p className="text-sm font-medium text-indigo-700">
              Analyzing video content...
            </p>
            <p className="text-xs text-indigo-500 mt-0.5">
              This may take 30–60 seconds
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}
