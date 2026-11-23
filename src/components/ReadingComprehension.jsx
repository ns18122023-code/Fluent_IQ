import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { READING_PASSAGES } from '../data/readingData';
import { generateReadingPassage } from '../services/geminiService';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  Clock,
  Layers,
  Award,
  HelpCircle,
  RefreshCw,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ReadingComprehension() {
  const { logActivity, saveWord } = useLearning();

  const [passages, setPassages] = useState(READING_PASSAGES);
  const [selectedPassage, setSelectedPassage] = useState(READING_PASSAGES[0]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSelectOption = (qId, optionIdx) => {
    if (submitted) return;
    setAnswers((prev) => ({
      ...prev,
      [qId]: optionIdx,
    }));
  };

  const handleSubmit = () => {
    let earned = 0;
    selectedPassage.questions.forEach((q) => {
      if (answers[q.id] === q.correctIndex) {
        earned += 1;
      }
    });

    setScore(earned);
    setSubmitted(true);
    const percentage = Math.round((earned / selectedPassage.questions.length) * 100);

    logActivity({
      type: 'reading',
      title: `Reading: ${selectedPassage.title}`,
      score: percentage,
      durationMinutes: 8,
      details: { passageId: selectedPassage.id, level: selectedPassage.level },
    });

    if (percentage >= 80) {
      try {
        confetti({ particleCount: 50, spread: 50 });
      } catch (e) {}
    }
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const handleGenerateFreshPassage = async () => {
    setIsGenerating(true);
    try {
      const fresh = await generateReadingPassage({
        level: selectedPassage.level || 'Intermediate',
        topic: 'Emerging Science & Technology Innovations',
      });

      if (fresh) {
        const customEntry = {
          id: 'gen_' + Date.now(),
          ...fresh,
          readTime: '4 min read',
          category: 'AI Generated',
        };
        setPassages((prev) => [customEntry, ...prev]);
        setSelectedPassage(customEntry);
        handleReset();
      }
    } catch (err) {
      console.error('Failed to generate reading passage:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5 text-rose-600" />
            <span>Reading & Comprehension Lab</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Active Reading & Critical Analysis</h1>
          <p className="text-sm text-slate-600 mt-1">
            Read curated passages across business, science, and life. Expand vocabulary and verify comprehension.
          </p>
        </div>

        <button
          onClick={handleGenerateFreshPassage}
          disabled={isGenerating}
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm disabled:opacity-50 transition flex items-center gap-2"
        >
          {isGenerating ? (
            <>
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Generating Passage...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate AI Passage</span>
            </>
          )}
        </button>
      </div>

      {/* Passage Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {passages.map((p) => {
          const isSelected = selectedPassage.id === p.id;
          return (
            <button
              key={p.id}
              onClick={() => {
                setSelectedPassage(p);
                handleReset();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition ${
                isSelected
                  ? 'bg-brand-50 border-brand-500 text-brand-900 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{p.title}</span>
              <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                {p.level}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Passage Text */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600">
                  {selectedPassage.category} • {selectedPassage.level}
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">{selectedPassage.title}</h2>
              </div>
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{selectedPassage.readTime}</span>
              </span>
            </div>

            {/* Passage Body */}
            <div className="text-sm text-slate-700 leading-relaxed space-y-4 whitespace-pre-line font-sans">
              {selectedPassage.content}
            </div>
          </div>

          {/* Comprehension Quiz */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Comprehension Assessment</h3>
              {submitted && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-brand-50 text-brand-700">
                  Score: {score} / {selectedPassage.questions.length} (
                  {Math.round((score / selectedPassage.questions.length) * 100)}%)
                </span>
              )}
            </div>

            <div className="space-y-6">
              {selectedPassage.questions.map((q, idx) => {
                const userChoice = answers[q.id];
                const isCorrect = userChoice === q.correctIndex;

                return (
                  <div key={q.id} className="space-y-3">
                    <p className="text-sm font-semibold text-slate-900">
                      {idx + 1}. {q.question}
                    </p>

                    <div className="space-y-2">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = userChoice === oIdx;
                        let optStyle = 'bg-white border-slate-200 hover:border-slate-300 text-slate-700';

                        if (submitted) {
                          if (oIdx === q.correctIndex) {
                            optStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold';
                          } else if (isSelected && !isCorrect) {
                            optStyle = 'bg-rose-50 border-rose-500 text-rose-900 line-through';
                          } else {
                            optStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                          }
                        } else if (isSelected) {
                          optStyle = 'bg-brand-50 border-brand-500 text-brand-900 ring-2 ring-brand-500/20 font-semibold';
                        }

                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleSelectOption(q.id, oIdx)}
                            disabled={submitted}
                            className={`w-full text-left p-3.5 rounded-xl border text-xs transition flex items-center justify-between ${optStyle}`}
                          >
                            <span>{opt}</span>
                            {submitted && oIdx === q.correctIndex && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                            {submitted && isSelected && !isCorrect && (
                              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {submitted && (
                      <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <strong className="text-slate-800">Explanation:</strong> {q.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={handleReset}
                className="text-xs font-medium text-slate-400 hover:text-slate-600"
              >
                Reset Answers
              </button>

              {!submitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={Object.keys(answers).length < selectedPassage.questions.length}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm disabled:opacity-40 transition"
                >
                  Submit Answers
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition"
                >
                  Retake Quiz
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Key Vocabulary */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-brand-600" />
              <span>In-Context Vocabulary</span>
            </h3>

            <div className="space-y-3">
              {(selectedPassage.vocabulary || selectedPassage.keyVocabulary || []).map((v, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 capitalize">{v.word}</span>
                    <button
                      onClick={() => {
                        saveWord({
                          word: v.word,
                          meaning: v.meaning,
                          example: `Found in "${selectedPassage.title}"`,
                          pos: 'noun / adj',
                          cefr: selectedPassage.level?.slice(0, 2) || 'B2',
                        });
                        alert(`"${v.word}" saved to your personal vocabulary catalog!`);
                      }}
                      className="text-[11px] font-bold text-brand-600 hover:text-brand-700"
                    >
                      + Save Word
                    </button>
                  </div>
                  <p className="text-xs text-slate-600">{v.meaning}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

