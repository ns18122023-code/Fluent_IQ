import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import {
  Settings,
  User,
  Award,
  Flame,
  RotateCcw,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Lock,
  ExternalLink,
} from 'lucide-react';

export default function ProfileSettings() {
  const { profile, updateProfile, achievements, resetAllProgress, stats, setActiveTab } = useLearning();

  const [name, setName] = useState(profile.name || '');
  const [email, setEmail] = useState(profile.email || '');
  const [dailyGoal, setDailyGoal] = useState(profile.dailyGoalMinutes || 20);
  const [isSaved, setIsSaved] = useState(false);
  const [apiTesting, setApiTesting] = useState(false);
  const [apiTestResult, setApiTestResult] = useState(null);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      dailyGoalMinutes: Number(dailyGoal),
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleTestGeminiApi = async () => {
    setApiTesting(true);
    setApiTestResult(null);
    const start = Date.now();
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: 'Respond with the single word "ONLINE" to confirm operational readiness.',
        }),
      });
      const data = await res.json();
      const elapsed = Date.now() - start;

      if (res.ok) {
        setApiTestResult({
          success: true,
          latency: `${elapsed}ms`,
          message: 'Gemini Flash backend endpoint is operational and responding securely.',
        });
      } else {
        setApiTestResult({
          success: false,
          error: data.error || data.message || `HTTP ${res.status}`,
          code: data.code,
        });
      }
    } catch (err) {
      setApiTestResult({
        success: false,
        error: err.message,
      });
    } finally {
      setApiTesting(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all progress, activity logs, and mistake memories? This action cannot be undone.')) {
      resetAllProgress();
      alert('Application data reset to clean initial state.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
            <Settings className="w-3.5 h-3.5 text-slate-600" />
            <span>Account & Configuration</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Profile & Learning Preferences</h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage your student profile, target goals, and inspect your unlocked achievements.
          </p>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
        <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
          Student Information
        </h3>

        <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Daily Practice Target (Minutes)
            </label>
            <input
              type="number"
              min={5}
              max={120}
              value={dailyGoal}
              onChange={(e) => setDailyGoal(e.target.value)}
              className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition"
            >
              Save Profile Updates
            </button>
            {isSaved && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Saved successfully!</span>
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Backend & Environment Health Diagnostic */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900">AI Backend Diagnostics</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Secure Vercel serverless / local proxy status for Google Gemini Flash requests.
            </p>
          </div>

          <button
            onClick={handleTestGeminiApi}
            disabled={apiTesting}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm disabled:opacity-50 transition flex items-center gap-2"
          >
            {apiTesting ? (
              <>
                <Zap className="w-3.5 h-3.5 animate-spin" />
                <span>Pinging Endpoint...</span>
              </>
            ) : (
              <>
                <Zap className="w-3.5 h-3.5" />
                <span>Run API Diagnostics</span>
              </>
            )}
          </button>
        </div>

        {apiTestResult && (
          <div
            className={`p-4 rounded-xl border text-xs space-y-1 ${
              apiTestResult.success
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}
          >
            <div className="flex items-center gap-2 font-bold">
              {apiTestResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <Zap className="w-4 h-4 text-amber-600" />
              )}
              <span>
                {apiTestResult.success
                  ? `Gemini Connection Verified (Latency: ${apiTestResult.latency})`
                  : 'Gemini Configuration Notice'}
              </span>
            </div>
            <p className="text-slate-600">
              {apiTestResult.message || apiTestResult.error}
            </p>
            {!apiTestResult.success && (
              <p className="text-[11px] text-slate-500 mt-1">
                Tip: Ensure <code>GEMINI_API_KEY</code> is set in your server environment variables or <code>.env</code> file.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Achievements Showcase */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        <h3 className="font-bold text-base text-slate-900">Achievements & Badges</h3>
        <p className="text-xs text-slate-500">
          Earn real milestones by completing assessments, submitting writings, and mastering grammar.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-xl border flex items-center gap-3 transition ${
                ach.unlocked
                  ? 'bg-brand-50/60 border-brand-200 text-brand-950'
                  : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  ach.unlocked ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-500'
                }`}
              >
                {ach.unlocked ? <Award className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
              </div>

              <div>
                <h4 className="font-bold text-xs text-slate-900">{ach.title}</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">{ach.description}</p>
                {ach.unlocked && (
                  <span className="text-[9px] font-bold text-brand-600 block mt-1">
                    Unlocked on {new Date(ach.unlockedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone: Reset Data */}
      <div className="bg-rose-50/60 rounded-2xl border border-rose-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-sm text-rose-900">Reset Local Learning Profile</h3>
          <p className="text-xs text-rose-700 mt-0.5">
            Clear all saved assessments, mistake memory, activity logs, and custom vocabulary for testing purposes.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-xl text-xs font-bold text-rose-700 bg-white hover:bg-rose-100 border border-rose-300 transition flex items-center gap-1.5 shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Progress</span>
        </button>
      </div>
    </div>
  );
}
