import React from 'react';
import { useLearning } from '../context/LearningContext';
import { Zap, X, CheckCircle2, ArrowRight } from 'lucide-react';

export default function DailyChallengeModal() {
  const { showChallengeModal, setShowChallengeModal, dailyChallenge, setActiveTab } = useLearning();

  if (!showChallengeModal) return null;

  const handleGoToTask = (taskId) => {
    setShowChallengeModal(false);
    if (taskId === 'grammar') setActiveTab('grammar');
    if (taskId === 'vocab') setActiveTab('vocabulary');
    if (taskId === 'writing') setActiveTab('writing');
    if (taskId === 'speaking') setActiveTab('speaking');
  };

  const completedCount = dailyChallenge?.tasks?.filter((t) => t.completed).length || 0;
  const progressPercent = Math.round((completedCount / 4) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Zap className="w-5 h-5 fill-amber-500" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">Daily 10-Minute Challenge</h3>
              <p className="text-xs text-slate-500">4 micro-drills to maintain steady fluency gains</p>
            </div>
          </div>

          <button
            onClick={() => setShowChallengeModal(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span>Overall Completion</span>
            <span>{completedCount} of 4 ({progressPercent}%)</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {dailyChallenge?.tasks?.map((task) => (
            <div
              key={task.id}
              onClick={() => handleGoToTask(task.id)}
              className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                task.completed
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                  : 'bg-slate-50 border-slate-200 hover:border-brand-300 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                {task.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0" />
                )}
                <span className="text-xs font-semibold">{task.title}</span>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-400" />
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowChallengeModal(false)}
          className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
