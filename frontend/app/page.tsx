import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* ─── Navbar ─── */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-gray-900">ContentAI</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">How it Works</a>
            <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors px-3 py-2">
              Log in
            </Link>
            <Link href="/register" className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors">
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-xs font-medium text-indigo-700">AI-Powered Content Generation</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
            Turn YouTube Videos into
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"> LinkedIn Gold</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Paste a YouTube link. Get a polished, ready-to-publish LinkedIn post in seconds.
            No writing, no editing, no effort.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:shadow-xl hover:shadow-indigo-200 hover:-translate-y-0.5">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
              Start Creating for Free
            </Link>
            <a href="#how-it-works" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white text-gray-700 font-medium border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all">
              See How It Works
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
            </a>
          </div>

          {/* Social proof */}
          <div className="mt-14 flex items-center justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Free to start
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Publish in 1 click
            </div>
          </div>
        </div>

        {/* Hero visual — Mock UI */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="rounded-2xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white shadow-2xl shadow-gray-200/50 overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-100 bg-white">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-md bg-gray-100 text-xs text-gray-400 font-mono">contentai.app/dashboard</div>
              </div>
            </div>
            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Left — Input */}
                <div className="space-y-4">
                  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-gray-700 mb-3">Paste YouTube URL</p>
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200">
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                      </svg>
                      <span className="text-sm text-gray-400">https://youtube.com/watch?v=...</span>
                    </div>
                    <div className="mt-3 w-full py-2.5 rounded-lg bg-indigo-600 text-center text-sm font-medium text-white">
                      Generate Post
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 border border-green-200">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-xs text-green-700 font-medium">LinkedIn Connected</span>
                  </div>
                </div>
                {/* Right — Output */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-medium text-gray-700">Generated Post</p>
                    <span className="text-[10px] font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">AI Generated</span>
                  </div>
                  <div className="space-y-2.5">
                    <div className="h-3 bg-gray-200 rounded-full w-full animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded-full w-11/12" />
                    <div className="h-3 bg-gray-100 rounded-full w-full" />
                    <div className="h-3 bg-gray-100 rounded-full w-10/12" />
                    <div className="h-3 bg-gray-100 rounded-full w-full" />
                    <div className="h-3 bg-gray-50 rounded-full w-9/12" />
                    <div className="h-3 bg-gray-50 rounded-full w-11/12" />
                    <div className="h-3 bg-gray-50 rounded-full w-7/12" />
                  </div>
                  <div className="mt-5 flex gap-2">
                    <div className="flex-1 py-2 rounded-lg bg-indigo-600 text-center text-xs font-medium text-white">Publish to LinkedIn</div>
                    <div className="py-2 px-3 rounded-lg border border-gray-200 text-center text-xs font-medium text-gray-500">Edit</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="features" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-indigo-600 tracking-wide uppercase">Features</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">Everything you need to own LinkedIn</h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">From video to viral post — automated, customizable, and ready to publish.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                ),
                title: "AI-Powered Writing",
                desc: "GPT-4 analyzes the transcript and crafts a polished LinkedIn post with the right hooks, structure, and hashtags.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                  </svg>
                ),
                title: "Custom Tone & Length",
                desc: "Choose professional, casual, or storytelling. Set post length from short to long. Your voice, automated.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                ),
                title: "1-Click Publish",
                desc: "Connect your LinkedIn account and publish directly from the dashboard. No copy-pasting, no switching tabs.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                ),
                title: "Edit Before Publishing",
                desc: "Review and tweak the generated content before it goes live. Full control over your final post.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Post History",
                desc: "All your generated and published posts saved in one place. Track what works and repurpose later.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
                  </svg>
                ),
                title: "Auto Hashtags",
                desc: "Set default hashtags that get appended to every post, or let AI pick the most relevant ones.",
              },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 p-7 hover:shadow-lg hover:border-gray-300 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                  {f.icon}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-indigo-600 tracking-wide uppercase">How It Works</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">Three steps. That&apos;s it.</h2>
          </div>

          <div className="space-y-12">
            {[
              {
                step: "01",
                title: "Paste a YouTube URL",
                desc: "Drop any YouTube video link into the dashboard. We extract the full transcript automatically — no downloads needed.",
                color: "from-indigo-500 to-indigo-600",
              },
              {
                step: "02",
                title: "AI generates your post",
                desc: "Our AI analyzes the video content and writes a LinkedIn-ready post with engaging hooks, clean formatting, and relevant hashtags — all matching your preferred tone and length.",
                color: "from-violet-500 to-violet-600",
              },
              {
                step: "03",
                title: "Review & publish",
                desc: "Edit the draft if you want, then hit publish. Your post goes live on LinkedIn instantly. Done in under 60 seconds.",
                color: "from-fuchsia-500 to-fuchsia-600",
              },
            ].map((s, i) => (
              <div key={i} className="flex gap-6 md:gap-8 items-start">
                <div className={`shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg`}>
                  <span className="text-lg font-bold text-white">{s.step}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{s.title}</h3>
                  <p className="mt-2 text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section id="pricing" className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-indigo-600 tracking-wide uppercase">Pricing</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">Simple, transparent pricing</h2>
            <p className="mt-4 text-gray-500">Start free. Upgrade when you need more.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Free */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <p className="text-sm font-semibold text-gray-900">Free</p>
              <p className="mt-4 text-4xl font-bold text-gray-900">
                &#8377;0
                <span className="text-base font-normal text-gray-400">/month</span>
              </p>
              <p className="mt-2 text-sm text-gray-500">Perfect for trying it out</p>
              <ul className="mt-8 space-y-3">
                {["3 posts per month", "AI content generation", "LinkedIn publishing", "Post history", "Basic tone controls"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/register" className="mt-8 block w-full py-3 rounded-xl text-center text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
                Get Started
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-white rounded-2xl border-2 border-indigo-500 p-8 relative shadow-lg shadow-indigo-100">
              <div className="absolute -top-3 left-8">
                <span className="bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-900">Pro</p>
              <p className="mt-4 text-4xl font-bold text-gray-900">
                &#8377;1,249
                <span className="text-base font-normal text-gray-400">/month</span>
              </p>
              <p className="mt-2 text-sm text-gray-500">For serious content creators</p>
              <ul className="mt-8 space-y-3">
                {["Unlimited posts", "Advanced AI models", "Custom tone & length", "Auto hashtags", "Priority support", "Post analytics (coming soon)"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-indigo-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/register" className="mt-8 block w-full py-3 rounded-xl text-center text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200">
                Start Free, Upgrade Later
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Ready to turn videos into
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"> LinkedIn content?</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500">Join creators who save hours every week with ContentAI.</p>
          <Link href="/register" className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:shadow-xl hover:shadow-indigo-200 hover:-translate-y-0.5">
            Get Started for Free
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-gray-200 py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-900">ContentAI</span>
          </div>
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} ContentAI. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">Privacy</a>
            <a href="#" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">Terms</a>
            <a href="mailto:hello@contentai.app" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
