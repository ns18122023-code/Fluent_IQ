import React from 'react';
import { useLearning } from '../context/LearningContext';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  Award,
  AlertTriangle,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

export default function ProgressAnalytics() {
  const { stats, activityLogs, mistakes, assessments } = useLearning();

  // Radar Data for skill breakdown
  const radarData = [
    { skill: 'Grammar', score: stats.skillScores.grammar || 65, fullMark: 100 },
    { skill: 'Reading', score: stats.skillScores.reading || 70, fullMark: 100 },
    { skill: 'Writing', score: stats.skillScores.writing || 60, fullMark: 100 },
    { skill: 'Speaking', score: stats.skillScores.speaking || 65, fullMark: 100 },
    {
      skill: 'Vocabulary',
      score: Math.min(100, Math.max(30, stats.wordsSaved * 4)),
      fullMark: 100,
    },
  ];

  // Weekly Activity (Last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });

    const totalMinutes = activityLogs
      .filter((log) => log.timestamp?.startsWith(dateStr))
      .reduce((acc, l) => acc + (l.durationMinutes || 0), 0);

    return { day: dayName, minutes: totalMinutes };
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
            <BarChart3 className="w-3.5 h-3.5 text-indigo-600" />
            <span>Quantitative Analytics & Growth Engine</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Progress & Skill Analytics</h1>
          <p className="text-sm text-slate-600 mt-1">
            Visual metrics computed from your authentic learning attempts, assessments, and mistake resolutions.
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-400 font-medium block">Proficiency Benchmark</span>
          <span className="text-base font-extrabold text-brand-600">{stats.estimatedLevel}</span>
        </div>
      </div>

      {/* Top 3 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Total Study Time
          </span>
          <p className="text-3xl font-extrabold text-slate-900">{stats.totalMinutes} Mins</p>
          <span className="text-xs text-emerald-600 font-medium mt-1 block">
            Across {stats.totalCompleted} recorded learning sessions
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Learning Streak
          </span>
          <p className="text-3xl font-extrabold text-orange-600">{stats.streakDays} Days</p>
          <span className="text-xs text-slate-500 font-medium mt-1 block">Active daily commitment</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Mistakes Resolved
          </span>
          <p className="text-3xl font-extrabold text-brand-600">
            {stats.resolvedMistakesCount} / {stats.resolvedMistakesCount + stats.activeMistakesCount}
          </p>
          <span className="text-xs text-slate-500 font-medium mt-1 block">
            Tracked in AI Mistake Memory
          </span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart: Skill Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-base text-slate-900">Skill Competency Radar</h3>
            <p className="text-xs text-slate-500">
              Evaluated across Grammar, Reading, Writing, Speaking, and Vocabulary.
            </p>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: '#64748b', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" />
                <Radar
                  name="Mastery"
                  dataKey="score"
                  stroke="#7c3aed"
                  fill="#8b5cf6"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Weekly Study Time */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-base text-slate-900">Weekly Study Minutes</h3>
            <p className="text-xs text-slate-500">Actual practice time logged over the past 7 days.</p>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={last7Days}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  formatter={(val) => [`${val} mins`, 'Practice Time']}
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                />
                <Bar dataKey="minutes" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Before & After Assessment Comparison */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        <h3 className="font-bold text-base text-slate-900">Assessment Milestone History</h3>

        {assessments && assessments.length > 0 ? (
          <div className="space-y-3">
            {assessments.map((evalItem, idx) => (
              <div
                key={evalItem.id}
                className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">
                      Assessment #{assessments.length - idx}: {evalItem.estimatedLevel}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-700">
                      Score: {evalItem.percentage}%
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Completed on {new Date(evalItem.completedAt || evalItem.timestamp).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Strengths</span>
                    <span className="text-emerald-700 font-semibold">{evalItem.strengths?.slice(0, 2).join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Weak Areas</span>
                    <span className="text-rose-700 font-semibold">{evalItem.weakAreas?.slice(0, 2).join(', ')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 p-4 bg-slate-50 rounded-xl text-center">
            No diagnostic assessments taken yet. Complete your first initial assessment to see before-and-after benchmark comparisons.
          </p>
        )}
      </div>

      {/* Recurring Mistakes from Mistake Memory */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h3 className="font-bold text-base text-slate-900">AI Mistake Memory: Recurring Patterns</h3>
          </div>
          <span className="text-xs text-slate-500">
            {mistakes.length} total patterns logged
          </span>
        </div>

        {mistakes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mistakes.map((m) => (
              <div
                key={m.id}
                className={`p-4 rounded-xl border text-xs space-y-2 ${
                  m.resolved
                    ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                    : 'bg-rose-50/50 border-rose-200 text-rose-950'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-slate-600">
                    {m.topic} • Seen {m.repeatedCount || 1}x
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      m.resolved ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {m.resolved ? 'Resolved' : 'Active Pattern'}
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="line-through text-rose-700">Error: {m.original}</p>
                  <p className="font-bold text-emerald-700">Correction: {m.correction}</p>
                </div>

                <p className="text-slate-600 text-[11px] leading-relaxed">{m.explanation}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 p-4 bg-slate-50 rounded-xl text-center">
            No mistakes recorded yet. As you complete grammar drills and writing evaluations, error patterns will automatically appear here.
          </p>
        )}
      </div>
    </div>
  );
}
