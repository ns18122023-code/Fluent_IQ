import React from 'react';
import { useLearning } from '../context/LearningContext';
import { getWordOfTheDay } from '../data/vocabularyData';
import {
  Flame,
  Award,
  Clock,
  BookOpen,
  PenTool,
  Mic,
  BrainCircuit,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Volume2,
  Calendar,
} from 'lucide-react';

export default function Dashboard() {
  const {
    profile,
    stats,
    activityLogs,
    dailyChallenge,
    setShowChallengeModal,
    setShowStyleCoachModal,
    setActiveTab,
    saveWord,
  } = useLearning();

  const dailyWord = getWordOfTheDay();
  const recentLogs = activityLogs.slice(0, 5);

  const playTTS = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    window.speechSynthesis.speak(u);
  };

  const completedTasksCount = dailyChallenge?.tasks?.filter((t) => t.completed).length || 0;
  const challengeProgress = Math.round((completedTasksCount / 4) * 100);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white shadow-lg shadow-brand-500/20 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-brand-200" />
              <span>Welcome Back, {profile.name}!</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Your English Mastery Journey
            </h1>
            <p className="text-sm text-brand-100 max-w-xl leading-relaxed">
              Target CEFR Proficiency: <strong className="text-white">C1/C2 Advanced Fluency</strong>. Practice consistently to sharpen grammar, expand active vocabulary, and speak effortlessly.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {stats.estimatedLevel === 'Not Assessed' ? (
              <button
                onClick={() => setActiveTab('assessment')}
                className="px-5 py-3 rounded-xl text-xs font-bold bg-white text-brand-700 hover:bg-brand-50 transition shadow-md flex items-center gap-2"
              >
                <span>Take Diagnostic Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/20 text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-200 block">
                  Estimated Level
                </span>
                <span className="text-xl font-extrabold text-white mt-0.5 block">
                  {stats.estimatedLevel}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Streak */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6 fill-orange-500" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Daily Streak</span>
            <p className="text-xl font-extrabold text-slate-900 mt-0.5">{stats.streakDays} Days</p>
          </div>
        </div>

        {/* Study Time */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Time Practiced</span>
            <p className="text-xl font-extrabold text-slate-900 mt-0.5">{stats.totalMinutes} Mins</p>
          </div>
        </div>

        {/* Activities Completed */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Exercises Done</span>
            <p className="text-xl font-extrabold text-slate-900 mt-0.5">{stats.totalCompleted}</p>
          </div>
        </div>

        {/* Words Saved */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Vocabulary Bank</span>
            <p className="text-xl font-extrabold text-slate-900 mt-0.5">{stats.wordsSaved} Words</p>
          </div>
        </div>
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Daily Challenge & Skill Modules */}
        <div className="lg:col-span-2 space-y-6">
          {/* Daily 10-Min Challenge Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Zap className="w-4 h-4 fill-amber-500" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">Daily 10-Minute Challenge</h3>
                  <p className="text-xs text-slate-500">4 micro-drills to maintain steady fluency gains</p>
                </div>
              </div>

              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                {completedTasksCount} / 4 Completed
              </span>
            </div>

            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 rounded-full"
                style={{ width: `${challengeProgress}%` }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {dailyChallenge?.tasks?.map((task) => (
                <div
                  key={task.id}
                  onClick={() => {
                    if (task.id === 'grammar') setActiveTab('grammar');
                    if (task.id === 'vocab') setActiveTab('vocabulary');
                    if (task.id === 'writing') setActiveTab('writing');
                    if (task.id === 'speaking') setActiveTab('speaking');
                  }}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                    task.completed
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                      : 'bg-slate-50 border-slate-200/70 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <span className="text-xs font-semibold">{task.title}</span>
                  {task.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Skill Performance Cards */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h3 className="font-bold text-base text-slate-900">Skill-Wise Activity</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div
                onClick={() => setActiveTab('grammar')}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 hover:border-brand-300 cursor-pointer transition text-center"
              >
                <BrainCircuit className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                <span className="text-xs font-bold text-slate-800 block">Grammar</span>
                <span className="text-xs text-slate-500">{stats.skillCounts.grammar} Drills</span>
                <p className="text-sm font-extrabold text-emerald-600 mt-1">
                  {stats.skillScores.grammar > 0 ? `${stats.skillScores.grammar}%` : '—'}
                </p>
              </div>

              <div
                onClick={() => setActiveTab('writing')}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 hover:border-brand-300 cursor-pointer transition text-center"
              >
                <PenTool className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <span className="text-xs font-bold text-slate-800 block">Writing</span>
                <span className="text-xs text-slate-500">{stats.skillCounts.writing} Submissions</span>
                <p className="text-sm font-extrabold text-blue-600 mt-1">
                  {stats.skillScores.writing > 0 ? `${stats.skillScores.writing}%` : '—'}
                </p>
              </div>

              <div
                onClick={() => setActiveTab('speaking')}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 hover:border-brand-300 cursor-pointer transition text-center"
              >
                <Mic className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                <span className="text-xs font-bold text-slate-800 block">Speaking</span>
                <span className="text-xs text-slate-500">{stats.skillCounts.speaking} Sessions</span>
                <p className="text-sm font-extrabold text-amber-600 mt-1">
                  {stats.skillScores.speaking > 0 ? `${stats.skillScores.speaking}%` : '—'}
                </p>
              </div>

              <div
                onClick={() => setActiveTab('reading')}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 hover:border-brand-300 cursor-pointer transition text-center"
              >
                <BookOpen className="w-6 h-6 text-rose-600 mx-auto mb-2" />
                <span className="text-xs font-bold text-slate-800 block">Reading</span>
                <span className="text-xs text-slate-500">{stats.skillCounts.reading} Passages</span>
                <p className="text-sm font-extrabold text-rose-600 mt-1">
                  {stats.skillScores.reading > 0 ? `${stats.skillScores.reading}%` : '—'}
                </p>
              </div>
            </div>
          </div>

          {/* Recent Activity Timeline */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900">Recent Learning Activity</h3>
              <button
                onClick={() => setActiveTab('history')}
                className="text-xs font-semibold text-brand-600 hover:text-brand-700"
              >
                View Full History →
              </button>
            </div>

            {recentLogs.length > 0 ? (
              <div className="space-y-3">
                {recentLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-semibold text-slate-800">{log.title}</p>
                      <span className="text-[10px] text-slate-400">
                        {new Date(log.timestamp).toLocaleDateString()} • {log.durationMinutes} mins
                      </span>
                    </div>
                    {log.score !== null && (
                      <span className="font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                        {log.score}%
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs">
                <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p>No activity recorded yet today. Complete your initial assessment or a grammar drill to begin!</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: AI Mistake Memory & Daily Vocab */}
        <div className="space-y-6">
          {/* AI Mistake Memory Widget */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <h3 className="font-bold text-base text-slate-900">AI Mistake Memory</h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                {stats.activeMistakesCount} Active
              </span>
            </div>

            {stats.weakAreas && stats.weakAreas.length > 0 ? (
              <div className="space-y-3">
                <p className="text-xs text-slate-500">
                  Recurring mistakes detected in your recent submissions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {stats.weakAreas.map((area, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-800"
                    >
                      {area}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setActiveTab('grammar')}
                  className="w-full py-2.5 rounded-xl text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 transition"
                >
                  Review Targeted Grammar Rules →
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs text-center border border-emerald-100">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                <p className="font-bold">Zero Recurring Mistakes!</p>
                <p className="text-[11px] text-emerald-700 mt-0.5">Keep up the flawless practice.</p>
              </div>
            )}
          </div>

          {/* Daily Word of the Day Widget */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600">
                Daily Word • {dailyWord.cefr}
              </span>
              <button
                onClick={() => playTTS(dailyWord.word)}
                className="text-slate-400 hover:text-brand-600 transition"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div>
              <h4 className="text-xl font-extrabold text-slate-900">{dailyWord.word}</h4>
              <p className="text-xs text-slate-400 font-mono">{dailyWord.phonetic}</p>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{dailyWord.meaning}</p>
              <p className="text-[11px] text-slate-500 italic bg-slate-50 p-2.5 rounded-lg mt-2">
                "{dailyWord.example}"
              </p>
            </div>

            <button
              onClick={() => {
                saveWord(dailyWord);
                alert(`Saved "${dailyWord.word}" to your vocabulary!`);
              }}
              className="w-full py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 transition"
            >
              + Save to My Vocab
            </button>
          </div>

          {/* Communication Style Coach Banner */}
          <div className="bg-gradient-to-tr from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200 p-6 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <h4 className="font-bold text-sm text-indigo-950">Communication Style Coach</h4>
            </div>
            <p className="text-xs text-indigo-800 leading-relaxed">
              Compare how casual, workplace, academic, and interview English phrasing changes the tone of your message.
            </p>
            <button
              onClick={() => setShowStyleCoachModal(true)}
              className="w-full py-2 rounded-xl text-xs font-bold bg-white text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition"
            >
              Launch Style Coach
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
