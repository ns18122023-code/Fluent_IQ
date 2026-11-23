import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { evaluateWriting } from '../services/geminiService';
import {
  PenTool,
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  RefreshCw,
  BookOpen,
  ArrowRight,
  PlusCircle,
  FileText,
  Sliders,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WritingStudio() {
  const { profile, recordMistake, logActivity, unlockAchievement } = useLearning();

  const [writingType, setWritingType] = useState('Professional Email');
  const [promptTopic, setPromptTopic] = useState('Requesting an extension on a quarterly project deadline');
  const [targetTone, setTargetTone] = useState('Polite & Professional');
  const [text, setText] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'comparison' | 'mistakes' | 'vocabulary'

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  const writingTemplates = [
    { type: 'Professional Email', topic: 'Requesting an extension on a project deadline from a manager' },
    { type: 'Academic Essay', topic: 'The impact of social media on teenage attention spans and education' },
    { type: 'Opinion Paragraph', topic: 'Should remote work become a permanent standard for tech companies?' },
    { type: 'Creative Story', topic: 'An unexpected encounter at an abandoned train station in autumn' },
    { type: 'Cover Letter', topic: 'Applying for an International Project Lead position' },
  ];

  const handleApplyTemplate = (tpl) => {
    setWritingType(tpl.type);
    setPromptTopic(tpl.topic);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!text.trim() || isEvaluating) return;

    setIsEvaluating(true);
    setApiError(null);

    try {
      const result = await evaluateWriting({
        text,
        writingType,
        promptTopic,
        targetTone,
      });

      setFeedback(result);
      unlockAchievement('first_writing');

      // Log activity
      logActivity({
        type: 'writing',
        title: `Writing Studio: ${writingType}`,
        score: result.score || 75,
        durationMinutes: 10,
        details: { wordCount, cefr: result.cefrEstimate },
      });

      // Auto-record identified mistakes to Mistake Memory
      if (result.mistakes && Array.isArray(result.mistakes)) {
        result.mistakes.forEach((m) => {
          recordMistake({
            module: 'writing',
            topic: m.type || 'Grammar',
            original: m.original,
            correction: m.correction,
            explanation: m.explanation,
          });
        });
      }

      if (result.score >= 80) {
        try {
          confetti({ particleCount: 70, spread: 60 });
        } catch (e) {}
      }
    } catch (err) {
      console.error('Writing evaluation error:', err);
      setApiError(err.message || 'Failed to evaluate writing with Gemini Flash.');
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
            <PenTool className="w-3.5 h-3.5 text-blue-600" />
            <span>AI Writing Studio</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Writing & Composition Analysis</h1>
          <p className="text-sm text-slate-600 mt-1">
            Submit essays, emails, or stories. Receive CEFR scoring, side-by-side corrections, and vocabulary enhancements.
          </p>
        </div>
      </div>

      {/* Editor & Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Form & Controls */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            {/* Type & Tone selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                  Writing Format
                </label>
                <select
                  value={writingType}
                  onChange={(e) => setWritingType(e.target.value)}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="Professional Email">Professional Email</option>
                  <option value="Academic Essay">Academic Essay</option>
                  <option value="Opinion Paragraph">Opinion Paragraph</option>
                  <option value="Creative Story">Creative Story</option>
                  <option value="Cover Letter / Resume">Cover Letter / Resume</option>
                  <option value="Free-form Writing">Free-form Writing</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                  Target Tone
                </label>
                <select
                  value={targetTone}
                  onChange={(e) => setTargetTone(e.target.value)}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="Polite & Professional">Polite & Professional</option>
                  <option value="Formal & Academic">Formal & Academic</option>
                  <option value="Casual & Conversational">Casual & Conversational</option>
                  <option value="Persuasive & Confident">Persuasive & Confident</option>
                </select>
              </div>
            </div>

            {/* Prompt / Topic */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                Topic or Prompt
              </label>
              <input
                type="text"
                value={promptTopic}
                onChange={(e) => setPromptTopic(e.target.value)}
                placeholder="What are you writing about?"
                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
              />
            </div>

            {/* Writing Textarea */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Your Draft
                </label>
                <span className="text-xs text-slate-400">
                  {wordCount} words • {charCount} chars
                </span>
              </div>
              <textarea
                rows={9}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your English text here..."
                className="w-full text-sm bg-slate-50/50 border border-slate-200 rounded-xl p-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 leading-relaxed font-sans"
              />
            </div>

            {/* Submit Bar */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setText('')}
                className="text-xs font-medium text-slate-400 hover:text-slate-600"
              >
                Clear Draft
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!text.trim() || isEvaluating}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/25 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-2"
              >
                {isEvaluating ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Analyzing with Gemini Flash...</span>
                  </>
                ) : (
                  <>
                    <span>Evaluate Writing</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Suggested Prompts */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Suggested Writing Prompts</span>
            </h3>
            <div className="space-y-2">
              {writingTemplates.map((tpl, i) => (
                <button
                  key={i}
                  onClick={() => handleApplyTemplate(tpl)}
                  className="w-full text-left p-3 rounded-xl border border-slate-100 hover:border-brand-200 hover:bg-brand-50/50 transition group"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 block mb-0.5">
                    {tpl.type}
                  </span>
                  <p className="text-xs text-slate-700 font-medium line-clamp-2 group-hover:text-brand-900">
                    {tpl.topic}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Error state */}
      {apiError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-3">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <p>{apiError}</p>
        </div>
      )}

      {/* AI Evaluation Results */}
      {feedback && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
          {/* Header Score Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-600 text-white flex items-center justify-center font-extrabold text-xl shadow-md shadow-brand-500/25">
                  {feedback.score}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900">Comprehensive Feedback</h2>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                      Level: {feedback.cefrEstimate}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{feedback.summary}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Submetrics Breakdown */}
          {feedback.metrics && (
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {Object.entries(feedback.metrics).map(([key, val]) => (
                <div key={key} className="bg-slate-50 p-3 rounded-xl text-center border border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <span className="text-lg font-extrabold text-slate-800">{val}%</span>
                </div>
              ))}
            </div>
          )}

          {/* Result Tabs */}
          <div className="flex border-b border-slate-200 text-sm font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 px-4 border-b-2 transition ${
                activeTab === 'overview'
                  ? 'border-brand-600 text-brand-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Side-by-Side Polish
            </button>
            <button
              onClick={() => setActiveTab('mistakes')}
              className={`pb-3 px-4 border-b-2 transition flex items-center gap-1.5 ${
                activeTab === 'mistakes'
                  ? 'border-brand-600 text-brand-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>Identified Mistakes</span>
              <span className="px-1.5 py-0.5 rounded-full bg-slate-100 text-[10px] text-slate-600">
                {feedback.mistakes?.length || 0}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('vocabulary')}
              className={`pb-3 px-4 border-b-2 transition flex items-center gap-1.5 ${
                activeTab === 'vocabulary'
                  ? 'border-brand-600 text-brand-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>Vocabulary Upgrades</span>
              <span className="px-1.5 py-0.5 rounded-full bg-slate-100 text-[10px] text-slate-600">
                {feedback.betterVocabularySuggestions?.length || 0}
              </span>
            </button>
          </div>

          {/* Tab 1: Side-by-Side Polish */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Original Draft
                </span>
                <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{text}</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Flawless Polished Version</span>
                </span>
                <p className="text-sm text-emerald-950 whitespace-pre-wrap leading-relaxed font-medium">
                  {feedback.correctedVersion}
                </p>
              </div>
            </div>
          )}

          {/* Tab 2: Identified Mistakes */}
          {activeTab === 'mistakes' && (
            <div className="space-y-3 pt-2">
              {feedback.mistakes && feedback.mistakes.length > 0 ? (
                feedback.mistakes.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 text-sm space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 uppercase tracking-wider">
                        {m.type}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="text-rose-700 bg-white p-2 rounded border border-rose-100 line-through">
                        {m.original}
                      </div>
                      <div className="text-emerald-700 bg-white p-2 rounded border border-emerald-100 font-semibold">
                        {m.correction}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{m.explanation}</p>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-slate-500 text-sm">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                  <p className="font-semibold text-slate-800">No major grammatical errors detected!</p>
                  <p className="text-xs text-slate-500 mt-1">Excellent clarity and syntactic precision.</p>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Vocabulary Upgrades */}
          {activeTab === 'vocabulary' && (
            <div className="space-y-3 pt-2">
              {feedback.betterVocabularySuggestions && feedback.betterVocabularySuggestions.length > 0 ? (
                feedback.betterVocabularySuggestions.map((v, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/40 text-sm space-y-2">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-medium">
                        Used: <strong>{v.originalWord}</strong>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-indigo-500" />
                      <span className="px-2 py-0.5 rounded bg-indigo-600 text-white font-bold">
                        Upgrade: {v.upgradedWord}
                      </span>
                    </div>
                    <p className="text-xs text-indigo-900 italic bg-white p-2.5 rounded border border-indigo-100">
                      "{v.context}"
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 p-4">No specific vocabulary replacements suggested.</p>
              )}
            </div>
          )}

          {/* Actionable Recommendations */}
          {feedback.recommendations && feedback.recommendations.length > 0 && (
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Actionable Recommendations
              </h4>
              <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                {feedback.recommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

