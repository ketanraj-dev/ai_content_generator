'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Card, { CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Spinner from '@/components/ui/Spinner';
import { useToast } from '@/components/ui/ToastProvider';
import {
  getUserProfile,
  getUserPreferences,
  updateUserPreferences,
  getLinkedInStatus,
  deleteAccount,
} from '@/lib/api';

type Tone = 'professional' | 'casual' | 'storytelling';
type PostLength = 'short' | 'medium' | 'long';

interface Preferences {
  tone: Tone;
  postLength: PostLength;
  hashtags: string;
}

const defaultPrefs: Preferences = {
  tone: 'professional',
  postLength: 'medium',
  hashtags: '',
};

export default function SettingsPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [prefs, setPrefs] = useState<Preferences>(defaultPrefs);
  const [linkedinConnected, setLinkedinConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Profile / plan data
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState<'free' | 'pro'>('free');
  const [postsUsed, setPostsUsed] = useState(0);
  const [postsLimit, setPostsLimit] = useState(3);

  // Load profile, preferences, and LinkedIn status from API
  useEffect(() => {
    async function load() {
      try {
        const [profile, prefData, linkedin] = await Promise.all([
          getUserProfile(),
          getUserPreferences(),
          getLinkedInStatus(),
        ]);

        setEmail(profile.email);
        setPlan(profile.plan);
        setPostsUsed(profile.posts_used);
        setPostsLimit(profile.posts_limit);

        setPrefs({
          tone: prefData.tone,
          postLength: prefData.post_length,
          hashtags: prefData.hashtags,
        });

        setLinkedinConnected(linkedin.connected);
      } catch {
        showToast('error', 'Failed to load settings');
      } finally {
        setLoading(false);
      }
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function savePreferences() {
    setSaving(true);
    try {
      await updateUserPreferences({
        tone: prefs.tone,
        post_length: prefs.postLength,
        hashtags: prefs.hashtags,
      });
      showToast('success', 'Preferences saved');
    } catch {
      showToast('error', 'Failed to save preferences');
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteAccount() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setDeleting(true);
    try {
      await deleteAccount();
      document.cookie = 'access_token=; Max-Age=0; path=/';
      router.push('/login');
    } catch {
      showToast('error', 'Failed to delete account');
      setDeleting(false);
      setConfirmDelete(false);
    }
  }

  function handleConnectLinkedin() {
    window.location.href = 'http://localhost:8000/auth/linkedin/login';
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  const usagePercent = Math.min((postsUsed / postsLimit) * 100, 100);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your account, integrations, and content preferences
        </p>
      </div>

      {/* ─── Profile ─── */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
            <svg className="w-7 h-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{email}</p>
            <p className="text-xs text-gray-500 mt-0.5">Manage your account and content preferences</p>
          </div>
          <Badge variant={plan === 'pro' ? 'success' : 'info'} className="ml-auto shrink-0">
            {plan === 'pro' ? 'Pro Plan' : 'Free Plan'}
          </Badge>
        </div>
      </Card>

      {/* ─── LinkedIn Integration ─── */}
      <Card>
        <CardHeader>
          <CardTitle>LinkedIn Account</CardTitle>
        </CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${linkedinConnected ? 'bg-blue-100' : 'bg-gray-100'}`}>
              <svg className={`w-5 h-5 ${linkedinConnected ? 'text-blue-600' : 'text-gray-400'}`} viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {linkedinConnected ? 'Connected' : 'Not Connected'}
              </p>
              <p className="text-xs text-gray-500">
                {linkedinConnected
                  ? 'Your LinkedIn account is linked and ready to publish'
                  : 'Connect your LinkedIn account to publish posts'}
              </p>
            </div>
          </div>

          <Button
            variant={linkedinConnected ? 'ghost' : 'primary'}
            size="sm"
            onClick={handleConnectLinkedin}
          >
            {linkedinConnected ? 'Reconnect' : 'Connect'}
          </Button>
        </div>
      </Card>

      {/* ─── Content Preferences ─── */}
      <Card>
        <CardHeader>
          <CardTitle>Content Preferences</CardTitle>
        </CardHeader>
        <div className="space-y-5">
          {/* Tone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Writing Tone
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['professional', 'casual', 'storytelling'] as Tone[]).map(
                (tone) => (
                  <button
                    key={tone}
                    onClick={() => setPrefs({ ...prefs, tone })}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-all duration-150 cursor-pointer ${
                      prefs.tone === tone
                        ? 'bg-indigo-50 border-indigo-300 text-indigo-700 ring-2 ring-indigo-100'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {tone === 'professional' && '💼 '}
                    {tone === 'casual' && '😊 '}
                    {tone === 'storytelling' && '📖 '}
                    {tone.charAt(0).toUpperCase() + tone.slice(1)}
                  </button>
                )
              )}
            </div>
            <p className="text-xs text-gray-400 mt-1.5">
              Sets the voice and style of your generated content
            </p>
          </div>

          {/* Post Length */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default Post Length
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['short', 'medium', 'long'] as PostLength[]).map((len) => (
                <button
                  key={len}
                  onClick={() => setPrefs({ ...prefs, postLength: len })}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-all duration-150 cursor-pointer ${
                    prefs.postLength === len
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-700 ring-2 ring-indigo-100'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {len === 'short' && '~100 words'}
                  {len === 'medium' && '~200 words'}
                  {len === 'long' && '~350 words'}
                </button>
              ))}
            </div>
          </div>

          {/* Default Hashtags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Default Hashtags
            </label>
            <input
              type="text"
              value={prefs.hashtags}
              onChange={(e) => setPrefs({ ...prefs, hashtags: e.target.value })}
              placeholder="#ai #linkedin #contentcreation"
              className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
            <p className="text-xs text-gray-400 mt-1.5">
              Appended to every generated post. Separate with spaces.
            </p>
          </div>

          <div className="pt-2">
            <Button onClick={savePreferences} disabled={saving}>
              {saving ? 'Saving…' : 'Save Preferences'}
            </Button>
          </div>
        </div>
      </Card>

      {/* ─── Plan & Usage ─── */}
      <Card>
        <div id="plan" className="scroll-mt-24">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>Plan &amp; Usage</CardTitle>
              <Badge variant={plan === 'pro' ? 'success' : 'info'}>
                {plan === 'pro' ? 'Pro' : 'Free'}
              </Badge>
            </div>
          </CardHeader>

          <div className="space-y-4">
            {/* Usage bar */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Posts this month</span>
                <span className="text-sm font-medium text-gray-900">
                  {postsUsed} / {postsLimit}
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    usagePercent >= 100
                      ? 'bg-red-500'
                      : usagePercent >= 66
                        ? 'bg-amber-500'
                        : 'bg-indigo-500'
                  }`}
                  style={{ width: `${usagePercent}%` }}
                />
              </div>
              {usagePercent >= 100 && (
                <p className="text-xs text-red-600 mt-1.5">
                  You&apos;ve reached your free limit. Upgrade to continue.
                </p>
              )}
            </div>

            {/* Plan comparison */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {/* Free plan */}
              <div className={`rounded-xl p-4 ${plan === 'free' ? 'border-2 border-indigo-500 bg-indigo-50/30' : 'border border-gray-200'}`}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-gray-900">Free</p>
                  {plan === 'free' && <Badge variant="info">Current</Badge>}
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  $0<span className="text-sm font-normal text-gray-400">/mo</span>
                </p>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-center gap-2 text-xs text-gray-600">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    3 posts / month
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-600">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Basic AI content
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-600">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    LinkedIn publishing
                  </li>
                </ul>
              </div>

              {/* Pro plan */}
              <div className={`rounded-xl p-4 relative ${plan === 'pro' ? 'border-2 border-indigo-500 bg-indigo-50/50' : 'border border-gray-200'}`}>
                <div className="absolute -top-2.5 left-4">
                  <span className="bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                    Popular
                  </span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-gray-900">Pro</p>
                  {plan === 'pro' ? <Badge variant="success">Current</Badge> : <Badge variant="info">Upgrade</Badge>}
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  $15<span className="text-sm font-normal text-gray-400">/mo</span>
                </p>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-center gap-2 text-xs text-gray-700">
                    <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Unlimited posts
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-700">
                    <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Advanced AI models
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-700">
                    <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Tone &amp; length controls
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-700">
                    <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Priority support
                  </li>
                </ul>
                {plan !== 'pro' && (
                  <Button className="w-full mt-4" size="sm" onClick={() => showToast('info', 'Payment integration coming soon — contact us to upgrade')}>
                    Upgrade to Pro
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* ─── Danger Zone ─── */}
      <Card>
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
        </CardHeader>
        <div className="flex items-center justify-between p-4 rounded-lg border border-red-200 bg-red-50">
          <div>
            <p className="text-sm font-medium text-red-900">Delete Account</p>
            <p className="text-xs text-red-600 mt-0.5">
              Permanently delete your account and all data. This action cannot be undone.
            </p>
          </div>
          <Button
            variant="danger"
            size="sm"
            disabled={deleting}
            onClick={handleDeleteAccount}
          >
            {deleting ? 'Deleting…' : confirmDelete ? 'Confirm Delete' : 'Delete'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
