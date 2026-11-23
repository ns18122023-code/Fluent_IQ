import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { analyzeCommunicationStyles } from '../services/geminiService';
import {
  Sparkles,
  X,
  Send,
  MessageCircle,
  Briefcase,
  GraduationCap,
  Users,
  Copy,
  CheckCircle2,
} from 'lucide-react';

export default function StyleCoachModal() {
  const { showStyleCoachModal, setShowStyleCoachModal } = useLearning();

  const [inputSentence, setInputSentence] = useState('I need this file right now because my boss is angry.');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [copiedTone, setCopiedTone] = useState(null);

  if (!showStyleCoachModal) return null;

  const handleAnalyze = async (e) => {
    e?.preventDefault();
    if (!inputSentence.trim() || isAnalyzing) return;

    setIsAnalyzing(true);
    try {
      const data = await analyzeCommunicationStyles(inputSentence.trim());
      setResult(data);
    } catch (err) {
      console.error('Style coach error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopy = (tone, text) => {
    navigator.clipboard.writeText(text);
    setCopiedTone(tone);
    setTimeout(() => setCopiedTone(null), 2000);
  };

  const getStyleIcon = (tone) => {
    switch (tone?.toLowerCase()) {
      case 'casual':
        return MessageCircle;
      case 'professional':
        return Briefcase;
      case 'academic':
        return GraduationCap;
      case 'job interview':
        return Users;
      default:
        return Sparkles;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">Communication Style Coach</h3>
              <p className="text-xs text-slate-500">
                Observe how wording shifts across casual, workplace, academic, and interview settings.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowStyleCoachModal(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleAnalyze} className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Enter a Thought or Sentence to Compare
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputSentence}
              onChange={(e) => setInputSentence(e.target.value)}
              placeholder="e.g. I can't do this meeting tomorrow..."
              className="flex-1 text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <button
              type="submit"
              disabled={!inputSentence.trim() || isAnalyzing}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm disabled:opacity-50 transition flex items-center gap-1.5 shrink-0"
            >
              {isAnalyzing ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>Converting...</span>
                </>
              ) : (
                <>
                  <span>Compare Styles</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Variations List */}
        {result?.styles && (
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Style Variations & Linguistic Rationale
            </h4>

            {result.styles.map((s, idx) => {
              const Icon = getStyleIcon(s.tone);
              return (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-indigo-600" />
                      <span className="font-bold text-xs text-slate-900">{s.tone} Style</span>
                    </div>
                    <button
                      onClick={() => handleCopy(s.tone, s.sentence)}
                      className="text-xs font-semibold text-slate-500 hover:text-indigo-600 flex items-center gap-1 transition"
                    >
                      {copiedTone === s.tone ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copiedTone === s.tone ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>

                  <p className="text-sm font-semibold text-slate-800 bg-white p-3 rounded-lg border border-slate-100">
                    "{s.sentence}"
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong className="text-slate-700">Why this works:</strong> {s.explanation}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    <strong>Best for:</strong> {s.appropriateness}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

