import React from 'react';
import { useLearning } from '../context/LearningContext';
import {
  Sparkles,
  Flame,
  Award,
  Menu,
  Clock,
  MessageSquare,
  Zap,
  CheckCircle2,
} from 'lucide-react';

export default function Navbar({ onToggleMobileSidebar }) {
  const { profile, stats, dailyChallenge, setShowChallengeModal, setShowStyleCoachModal, setActiveTab } = useLearning();

  const isChallengeDone = dailyChallenge?.tasks?.every((t) => t.completed);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <span className="font-bold text-lg tracking-tight">IQ</span>
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">Fluent</span>
                <span className="font-extrabold text-lg text-brand-600 tracking-tight">IQ</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200">
                  AI
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Communication Style Coach shortcut */}
          <button
            onClick={() => setShowStyleCoachModal(true)}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200/70 transition"
            title="Open Communication Style Coach"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Style Coach</span>
          </button>

          {/* Daily 10-Min Challenge shortcut */}
          <button
            onClick={() => setShowChallengeModal(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition border ${
              isChallengeDone
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-amber-50 text-amber-800 border-amber-200/80 hover:bg-amber-100'
            }`}
            title="Daily 10-Minute Challenge"
          >
            {isChallengeDone ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            )}
            <span className="hidden sm:inline">10-Min Challenge</span>
            <span className="sm:hidden">Challenge</span>
          </button>

          {/* Streak pill */}
          <div
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-700 text-xs font-bold shadow-sm"
            title={`${stats.streakDays} Day Learning Streak`}
          >
            <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500 animate-pulse" />
            <span>{stats.streakDays}d</span>
          </div>

          {/* CEFR Level Pill */}
          <button
            onClick={() => setActiveTab('assessment')}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-200 transition"
            title="View or Retake Diagnostic Assessment"
          >
            <Award className="w-3.5 h-3.5 text-brand-600" />
            <span>
              {profile.estimatedLevel?.split(' ')[0] !== 'Not'
                ? profile.estimatedLevel?.split(' ')[0]
                : 'Take Diagnostic'}
            </span>
          </button>

          {/* User Avatar & Demo badge */}
          <button
            onClick={() => setActiveTab('settings')}
            className="flex items-center gap-2 pl-1 group focus:outline-none"
            title="Profile & Settings"
          >
            <img
              src={profile.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'}
              alt={profile.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500/20 group-hover:ring-brand-500 transition"
            />
            <div className="hidden xl:block text-left text-xs">
              <p className="font-semibold text-slate-800 leading-tight group-hover:text-brand-600 transition">
                {profile.name}
              </p>
              <span className="text-[10px] text-emerald-600 font-medium">Local Demo Active</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
