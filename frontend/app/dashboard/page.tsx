"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { generatePost, publishPost } from "@/lib/api";

export default function Dashboard() {
    
  const router = useRouter();
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [draft, setDraft] = useState("");
  const [postId, setPostId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  async function handleGenerate() {
    if (!youtubeUrl) return;
    try {
      setLoading(true);
      const data = await generatePost(youtubeUrl);
      setDraft(data.draft);
      setPostId(data.id);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex justify-center py-16 px-4">
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-3xl p-10 flex flex-col gap-8">

        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            AI Content Engine
          </h1>
          <p className="text-gray-500 text-lg">
            Turn YouTube videos into high-performing LinkedIn content.
          </p>
        </div>

        {/* Input Section */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Paste YouTube URL here..."
            className="flex-1 rounded-xl border border-gray-300 bg-white px-5 py-3 text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
          />

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="relative px-8 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-600 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60"
          >
            {loading ? (
              <span className="animate-pulse">Generating...</span>
            ) : (
              "Generate Post"
            )}
          </button>
        </div>

        {/* Draft Section */}
        {draft && (
          <div className="space-y-4 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-800">
                Generated Draft
              </h2>
              <span className="text-sm text-gray-400">
                Edit before publishing
              </span>
            </div>

            <textarea
              className="w-full min-h-[280px] rounded-2xl border border-gray-300 p-5 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />

            <div className="flex justify-end">
                <button
                    onClick={async () => {
                        if (!postId) {
                            alert("No post to publish");
                            return;
                        }

                        try {
                            await publishPost(postId);
                            alert("Post published successfully!");
                        } catch (err: any) {
                            alert(err.message);
                        }
                    }}
                    className="px-8 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-emerald-500 to-green-600 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                    Publish to LinkedIn
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}