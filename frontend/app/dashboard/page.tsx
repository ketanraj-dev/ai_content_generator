"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { generatePost } from "@/lib/api";

export default function Dashboard() {
  const router = useRouter();
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  async function handleGenerate() {
    try {
      setLoading(true);
      const data = await generatePost(youtubeUrl);
      setDraft(data.draft);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen p-8 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Paste YouTube URL"
          className="border p-2 flex-1"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
        />
        <button
          onClick={handleGenerate}
          className="bg-black text-white px-4"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {draft && (
        <textarea
          className="border p-4 min-h-[200px]"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
      )}
    </div>
  );
}