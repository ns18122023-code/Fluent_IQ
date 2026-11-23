import React from 'react';
import { useLearning } from '../context/LearningContext';
import {
  Sparkles,
  Bot,
  BrainCircuit,
  PenTool,
  Mic,
  BookOpen,
  Award,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Globe2,
} from 'lucide-react';

export default function LandingPage() {
  const { setActiveTab, stats } = useLearning();

  const features = [
    {
      icon: Bot,
      title: 'AI Personal Tutor',
      description: 'Engage in fluid, context-aware conversations powered by Gemini Flash. Receive instant corrections, natural phrasing, and level-adapted explanations.',
      badge: 'Gemini Flash AI',
      color: 'from-purple-500 to-indigo-600',
    },
    {
      icon: PenTool,
      title: 'Writing Studio',
      description: 'Submit essays, workplace emails, or creative stories. Get deep linguistic evaluation on coherence, grammar, vocabulary upgrades, and tone.',
      badge: 'Real-Time Review',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      icon: Mic,
      title: 'Speaking & Pronunciation',
      description: 'Speak aloud into the browser. Analyze speech fluency, eliminate filler words, compare transcripts, and listen to model pronunciation.',
      badge: 'Web Speech API',
      color: 'from-amber-500 to-orange-600',
    },
    {
      icon: BrainCircuit,
      title: 'AI Mistake Memory & Grammar',
      description: 'Master 10 core grammar topics across 3 difficulty tiers with deterministic scoring. Fluent IQ automatically tracks recurring mistakes until resolved.',
      badge: 'Adaptive Engine',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      icon: BookOpen,
      title: 'Reading & Comprehension',
      description: 'Explore curated passages across business, science, and literature with interactive vocabulary tooltips and comprehension assessments.',
      badge: 'CEFR Graded',
      color: 'from-rose-500 to-pink-600',
    },
    {
      icon: TrendingUp,
      title: 'Progress & Analytics',
      description: 'Comprehensive skill breakdown, CEFR level tracking from A1 to C2, and learning streaks computed from real activity logs.',
      badge: 'Data-Driven',
      color: 'from-indigo-500 to-purple-600',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Initial Diagnostic',
      desc: 'Take an 18-question diagnostic to benchmark your starting CEFR level from A1 to C2.',
    },
    {
      step: '02',
      title: 'Adaptive Learning Path',
      desc: 'Get personalized daily challenges and grammar drills targeting your identified weak areas.',
    },
    {
      step: '03',
      title: 'Interactive Multi-Modal Practice',
      desc: 'Write essays, speak topics aloud, and consult your AI Tutor whenever you need guidance.',
    },
    {
      step: '04',
      title: 'Mastery & Growth',
      desc: 'Watch your Mistake Memory resolve errors, unlock achievements, and level up your English.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-800">
      {/* Top Navbar */}
      <nav className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-brand-500/25">
              <span className="font-extrabold text-xl">IQ</span>
            </div>
            <div>
              <span className="font-extrabold text-2xl text-slate-900 tracking-tight">Fluent</span>
              <span className="font-extrabold text-2xl text-brand-600 tracking-tight">IQ</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
            >
              Open Dashboard
            </button>
            <button
              onClick={() => setActiveTab('assessment')}
              className="px-5 py-2 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-sm hover:shadow transition flex items-center gap-2"
            >
              <span>Take Diagnostic</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold uppercase tracking-wider mb-6 animate-pulse">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span>Next-Generation AI English Learning Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
            Speak Smart. Write Better.{' '}
            <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Communicate Confidently.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Fluent IQ combines real-time Gemini Flash intelligence, adaptive mistake memory, and interactive speech recognition to accelerate your journey to English fluency.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setActiveTab('assessment')}
              className="px-8 py-4 text-base font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:-translate-y-0.5 transition flex items-center gap-3"
            >
              <span>Start Free CEFR Assessment</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="px-8 py-4 text-base font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-xs hover:shadow transition flex items-center gap-2"
            >
              <span>Explore Platform Demo</span>
            </button>
          </div>

          {/* Quick status trust bar */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-medium text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Deterministic CEFR Scoring</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Secure Gemini Flash Backend</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-brand-600" />
              <span>Full Browser Speech Recognition</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 bg-slate-50/60 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-2">Core Capabilities</h2>
            <p className="text-3xl font-bold text-slate-900 tracking-tight">Everything You Need for Total English Mastery</p>
            <p className="mt-3 text-slate-600 text-sm">
              From grammar fundamentals to executive presentation practice, Fluent IQ adapts to your learning pace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs hover:shadow-md transition-card flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${feat.color} flex items-center justify-center text-white shadow-sm`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                        {feat.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2">{feat.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-2">The Methodology</h2>
            <p className="text-3xl font-bold text-slate-900 tracking-tight">How Fluent IQ Transforms Your Skills</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((st, i) => (
              <div key={i} className="relative p-6 rounded-2xl bg-slate-50/80 border border-slate-200/60">
                <span className="text-4xl font-extrabold text-brand-200/70 block mb-3 font-mono">{st.step}</span>
                <h4 className="text-base font-bold text-slate-900 mb-2">{st.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-sm">
              IQ
            </div>
            <span className="font-bold text-lg text-white">Fluent IQ</span>
            <span className="text-xs text-slate-500">| Intelligent English Learning Assistant</span>
          </div>

          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Fluent IQ. Designed for students, professionals, and language enthusiasts.
          </p>

          <button
            onClick={() => setActiveTab('dashboard')}
            className="text-xs font-semibold text-brand-400 hover:text-brand-300 transition"
          >
            Launch Platform →
          </button>
        </div>
      </footer>
    </div>
  );
}

