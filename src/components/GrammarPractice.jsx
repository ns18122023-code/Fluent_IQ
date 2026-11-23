import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { GRAMMAR_TOPICS } from '../data/grammarData';
import { generateGrammarQuestions } from '../services/geminiService';
import {
  BrainCircuit,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Award,
  Layers,
  BookOpen,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function GrammarPractice() {
  const { recordMistake, logActivity, unlockAchievement } = useLearning();

  const [selectedTopic, setSelectedTopic] = useState(GRAMMAR_TOPICS[0]);
  const [difficulty, setDifficulty] = useState('beginner'); // 'beginner' | 'intermediate' | 'advanced'
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [score, setScore] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiQuestions, setAiQuestions] = useState([]);

  // Active question set
  const standardQuestions = selectedTopic.levels[difficulty] || [];
  const activeQuestions = aiQuestions.length > 0 ? aiQuestions : standardQuestions;
  const currentQ = activeQuestions[currentQIndex] || activeQuestions[0];
  const totalQuestions = activeQuestions.length;

  const handleSelectAnswer = (index) => {
    if (checkedQuestions[currentQ.id]) return; // already locked
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: index,
    }));
  };

  const handleCheckAnswer = () => {
    const userChoice = selectedAnswers[currentQ.id];
    if (userChoice === undefined) return;

    const isCorrect = userChoice === currentQ.correctIndex;
    setCheckedQuestions((prev) => ({
      ...prev,
      [currentQ.id]: true,
    }));

    if (isCorrect) {
      setScore((prev) => prev + 1);
    } else {
      // Auto-record to Mistake Memory!
      recordMistake({
        module: 'grammar',
        topic: selectedTopic.title,
        original: currentQ.options[userChoice],
        correction: currentQ.options[currentQ.correctIndex],
        explanation: currentQ.explanation,
      });
    }

    // Check if this was the last question in the set
    if (currentQIndex === totalQuestions - 1) {
      const finalScore = isCorrect ? score + 1 : score;
      const percentage = Math.round((finalScore / totalQuestions) * 100);

      logActivity({
        type: 'grammar',
        title: `Grammar Drill: ${selectedTopic.title} (${difficulty.toUpperCase()})`,
        score: percentage,
        durationMinutes: 5,
        details: { topic: selectedTopic.title, difficulty },
      });

      if (difficulty === 'advanced' && percentage >= 90) {
        unlockAchievement('grammar_ace');
      }

      if (percentage >= 80) {
        try {
          confetti({ particleCount: 60, spread: 50 });
        } catch (e) {}
      }
    }
  };

  const handleNext = () => {
    if (currentQIndex < totalQuestions - 1) {
      setCurrentQIndex((prev) => prev + 1);
    }
  };

  const handleResetDrill = () => {
    setCurrentQIndex(0);
    setSelectedAnswers({});
    setCheckedQuestions({});
    setScore(0);
    setAiQuestions([]);
  };

  const handleGenerateAIQuestions = async () => {
    setIsGenerating(true);
    try {
      const result = await generateGrammarQuestions({
        topic: selectedTopic.title,
        difficulty,
        count: 3,
      });

      if (result && result.questions && result.questions.length > 0) {
        setAiQuestions(result.questions);
        setCurrentQIndex(0);
        setSelectedAnswers({});
        setCheckedQuestions({});
        setScore(0);
      }
    } catch (err) {
      console.error('Failed to generate AI questions:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2">
            <BrainCircuit className="w-3.5 h-3.5 text-emerald-600" />
            <span>Deterministic Grammar Engine</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Grammar Practice & Mastery</h1>
          <p className="text-sm text-slate-600 mt-1">
            Explore 10 foundational topics across 3 tiers with instant rule-based validation and mistake memory tracking.
          </p>
        </div>
      </div>

      {/* Topic Cards Carousel / Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {GRAMMAR_TOPICS.map((topic) => {
          const isSelected = selectedTopic.id === topic.id;
          return (
            <button
              key={topic.id}
              onClick={() => {
                setSelectedTopic(topic);
                handleResetDrill();
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-brand-50 border-brand-500 shadow-xs ring-1 ring-brand-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <h3 className={`text-xs font-bold truncate ${isSelected ? 'text-brand-900' : 'text-slate-800'}`}>
                {topic.title}
              </h3>
              <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{topic.description}</p>
            </button>
          );
        })}
      </div>

      {/* Topic Rule Summary Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">{selectedTopic.title}</h2>
            <p className="text-xs text-slate-600 mt-1">{selectedTopic.ruleSummary}</p>
          </div>

          {/* Difficulty Tiers */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl shrink-0">
            {['beginner', 'intermediate', 'advanced'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  setDifficulty(lvl);
                  handleResetDrill();
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition ${
                  difficulty === lvl ? 'bg-white text-brand-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Examples pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {selectedTopic.examples.map((ex, i) => (
            <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
              <p className="font-semibold text-slate-800 font-sans">"{ex.text}"</p>
              <span className="text-[10px] text-brand-600 font-medium block mt-1">Rule: {ex.note}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Practice Drill Interface */}
      {currentQ && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>
              Question {currentQIndex + 1} of {totalQuestions}
            </span>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 capitalize font-bold">
                {difficulty} Tier
              </span>
              <span>Score: {score} / {totalQuestions}</span>
            </div>
          </div>

          {/* Question Text */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 leading-relaxed">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedAnswers[currentQ.id] === idx;
              const isChecked = checkedQuestions[currentQ.id];
              const isCorrectAnswer = idx === currentQ.correctIndex;

              let style = 'bg-white border-slate-200 hover:border-slate-300 text-slate-700';

              if (isChecked) {
                if (isCorrectAnswer) {
                  style = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                } else if (isSelected && !isCorrectAnswer) {
                  style = 'bg-rose-50 border-rose-500 text-rose-900 font-bold';
                } else {
                  style = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              } else if (isSelected) {
                style = 'bg-brand-50 border-brand-500 text-brand-900 ring-2 ring-brand-500/20 font-semibold';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(idx)}
                  disabled={isChecked}
                  className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center justify-between ${style}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isChecked && isCorrectAnswer && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                  {isChecked && isSelected && !isCorrectAnswer && <XCircle className="w-5 h-5 text-rose-600" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {checkedQuestions[currentQ.id] && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
              <p className="font-bold text-slate-900">Grammar Rule Explanation:</p>
              <p>{currentQ.explanation}</p>
            </div>
          )}

          {/* Controls Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
            <button
              onClick={handleResetDrill}
              className="text-xs font-medium text-slate-400 hover:text-slate-600 flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Restart Drill</span>
            </button>

            <div className="flex items-center gap-3">
              {!checkedQuestions[currentQ.id] ? (
                <button
                  onClick={handleCheckAnswer}
                  disabled={selectedAnswers[currentQ.id] === undefined}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm disabled:opacity-40 transition"
                >
                  Check Answer
                </button>
              ) : currentQIndex < totalQuestions - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition flex items-center gap-2"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleResetDrill}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition"
                >
                  Drill Finished! Retake or Switch Topic
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Gemini AI Question Generator Box */}
      <div className="bg-gradient-to-r from-brand-50 to-indigo-50 rounded-2xl p-6 border border-brand-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-brand-700 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span>AI Dynamic Generator</span>
          </div>
          <p className="text-sm font-bold text-slate-900">Want fresh unpracticed questions?</p>
          <p className="text-xs text-slate-600 mt-0.5">
            Gemini Flash can instantly generate 3 new practice questions tailored to {selectedTopic.title} ({difficulty}).
          </p>
        </div>

        <button
          onClick={handleGenerateAIQuestions}
          disabled={isGenerating}
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm disabled:opacity-50 transition flex items-center gap-2 shrink-0"
        >
          {isGenerating ? (
            <>
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Generating with Gemini...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate New Questions</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

