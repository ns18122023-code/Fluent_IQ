import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import {
  History,
  Calendar,
  Filter,
  Search,
  BookOpen,
  PenTool,
  Mic,
  BrainCircuit,
  Bot,
  Award,
  CheckCircle2,
} from 'lucide-react';

export default function LearningHistory() {
  const { activityLogs } = useLearning();

  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = activityLogs.filter((log) => {
    const matchesType = filterType === 'all' || log.type === filterType;
    const matchesSearch = log.title?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getModuleIcon = (type) => {
    switch (type) {
      case 'grammar':
        return BrainCircuit;
      case 'writing':
        return PenTool;
      case 'speaking':
        return Mic;
      case 'reading':
        return BookOpen;
      case 'assessment':
        return Award;
      case 'tutor':
        return Bot;
      default:
        return CheckCircle2;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
            <History className="w-3.5 h-3.5 text-slate-600" />
            <span>Audit Trail & Activity Log</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Learning History</h1>
          <p className="text-sm text-slate-600 mt-1">
            Chronological record of every completed quiz, tutor discussion, speaking attempt, and writing submission.
          </p>
        </div>

        <div className="text-xs font-semibold text-slate-500">
          Total Logs: <strong className="text-brand-600 font-bold">{activityLogs.length}</strong>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search past activities..."
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Module Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 text-xs">
          {['all', 'assessment', 'grammar', 'writing', 'speaking', 'reading', 'tutor'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-xl font-bold capitalize transition whitespace-nowrap ${
                filterType === t
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* History Log List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-3">
        {filteredLogs.length > 0 ? (
          filteredLogs.map((log) => {
            const Icon = getModuleIcon(log.type);
            return (
              <div
                key={log.id}
                className="p-4 rounded-xl bg-slate-50/80 border border-slate-100 hover:border-slate-200 transition flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-brand-600 flex items-center justify-center shrink-0 shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{log.title}</h4>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      {new Date(log.timestamp).toLocaleString([], {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}{' '}
                      • {log.durationMinutes} minutes
                    </span>
                  </div>
                </div>

                {log.score !== null && log.score !== undefined && (
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-200">
                      Score: {log.score}%
                    </span>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold text-slate-700">No matching activities found.</p>
            <p className="text-xs text-slate-500">
              Start practicing in any module to build your personal learning history.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
