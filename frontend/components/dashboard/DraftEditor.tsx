'use client';

import Card, { CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

interface DraftEditorProps {
  draft: string;
  onDraftChange: (value: string) => void;
  onPublish: () => Promise<void>;
  linkedinConnected: boolean;
  publishing?: boolean;
}

export default function DraftEditor({
  draft,
  onDraftChange,
  onPublish,
  linkedinConnected,
  publishing,
}: DraftEditorProps) {
  if (!draft) return null;

  const wordCount = draft
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const charCount = draft.length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Draft Editor</CardTitle>
          <Badge variant="info">Draft</Badge>
        </div>
        <span className="text-xs text-gray-400">
          {wordCount} words &middot; {charCount} chars
        </span>
      </CardHeader>

      <textarea
        value={draft}
        onChange={(e) => onDraftChange(e.target.value)}
        className="w-full min-h-[280px] rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-800 leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all duration-200"
        placeholder="Your generated content will appear here..."
      />

      <div className="flex items-center justify-between mt-4">
        <p className="text-xs text-gray-400">
          {linkedinConnected
            ? 'Ready to publish'
            : 'Connect LinkedIn to publish'}
        </p>
        <Button
          variant="success"
          onClick={onPublish}
          disabled={!linkedinConnected || publishing}
          loading={publishing}
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
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
          {publishing ? 'Publishing...' : 'Publish to LinkedIn'}
        </Button>
      </div>
    </Card>
  );
}
