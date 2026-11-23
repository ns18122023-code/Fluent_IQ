import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import {
  ASSESSMENT_QUESTIONS,
  calculateAssessmentResult,
} from '../data/assessmentQuestions';
import {
  ClipboardCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Award,
  RefreshCw,
  TrendingUp,
  BookOpen,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InitialAssessment() {
  const { saveAssessment, stats, setActiveTab } = useLearning();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [showReview, setShowReview] = useState(false);

  const currentQ = ASSESSMENT_QUESTIONS[currentIndex];
  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const handleSelectOption = (index) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: index,
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    const res = calculateAssessmentResult(answers);
    setResult(res);
    setSubmitted(true);
    saveAssessment(res);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // safe fallback
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentIndex(0);
    setSubmitted(false);
    setResult(null);
    setShowReview(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold mb-2">
              <ClipboardCheck className="w-3.5 h-3.5 text-brand-600" />
              <span>CEFR Diagnostic Benchmark</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Initial English Proficiency Assessment</h1>
            <p className="text-sm text-slate-600 mt-1">
              Test your grammar, vocabulary, tenses, syntax, and reading comprehension across A1 to C2 levels.
            </p>
          </div>

          {stats.estimatedLevel !== 'Not Assessed' && !submitted && (
            <div className="text-right">
              <span className="text-xs text-slate-400 font-medium block">Current Level</span>
              <span className="text-sm font-bold text-brand-600">{stats.estimatedLevel}</span>
            </div>
          )}
        </div>
      </div>

      {!submitted ? (
        /* Assessment Question Interface */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
          {/* Progress Bar & Counter */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
              <span>
                Question {currentIndex + 1} of {totalQuestions}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                Target: {currentQ.level} • {currentQ.category}
              </span>
              <span>{progressPercent}% Complete</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-500 to-indigo-600 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Question Prompt */}
          <div className="py-2">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 leading-snug">
              {currentQ.question}
            </h2>
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = answers[currentQ.id] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-brand-50/70 border-brand-500 text-brand-900 ring-2 ring-brand-500/20 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                        isSelected
                          ? 'bg-brand-600 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isSelected && <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Navigation controls */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition ${
                currentIndex === 0
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentIndex === totalQuestions - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={answers[currentQ.id] === undefined}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
              >
                <span>Submit Assessment</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={answers[currentQ.id] === undefined}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results & Explanations Card */
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
            <div className="text-center max-w-xl mx-auto pb-6 border-b border-slate-100">
              <div className="w-16 h-16 rounded-2xl bg-brand-100 text-brand-600 flex items-center justify-center mx-auto mb-4 shadow-inner">
                <Award className="w-8 h-8" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                Diagnostic Complete
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-1">
                Estimated Level: {result.estimatedLevel}
              </h2>
              <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200/70 px-3 py-1.5 rounded-lg inline-block mt-3">
                * Note: Clearly labeled as an estimated CEFR placement based on this diagnostic, not an official certified exam score.
              </p>
            </div>

            {/* Score Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
              <div className="bg-slate-50 p-4 rounded-xl text-center">
                <span className="text-xs text-slate-500 font-medium">Raw Score</span>
                <p className="text-2xl font-extrabold text-slate-900 mt-1">
                  {result.score} / {result.total}
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl text-center">
                <span className="text-xs text-slate-500 font-medium">Accuracy</span>
                <p className="text-2xl font-extrabold text-brand-600 mt-1">{result.percentage}%</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl text-center">
                <span className="text-xs text-slate-500 font-medium">CEFR Grade</span>
                <p className="text-2xl font-extrabold text-indigo-600 mt-1">{result.rawLevel}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl text-center">
                <span className="text-xs text-slate-500 font-medium">Proficiency</span>
                <p className="text-xs font-bold text-slate-700 mt-2">{result.estimatedLevel.split('(')[1]?.replace(')', '') || 'Assessed'}</p>
              </div>
            </div>

            {/* Strengths and Weak Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/70">
                <h4 className="text-sm font-bold text-emerald-900 flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Identified Strengths</span>
                </h4>
                <ul className="text-xs text-emerald-800 space-y-1 list-disc list-inside">
                  {result.strengths.map((str, idx) => (
                    <li key={idx}>{str}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200/70">
                <h4 className="text-sm font-bold text-rose-900 flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>Recommended Focus Areas</span>
                </h4>
                <ul className="text-xs text-rose-800 space-y-1 list-disc list-inside">
                  {result.weakAreas.map((w, idx) => (
                    <li key={idx}>{w}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Next Steps CTA */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setActiveTab('dashboard')}
                className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/25 transition flex items-center gap-2"
              >
                <span>Go to Personalized Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowReview(!showReview)}
                className="px-5 py-3 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
              >
                {showReview ? 'Hide Explanations' : 'Review Detailed Answers'}
              </button>

              <button
                onClick={handleRetake}
                className="px-5 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition flex items-center gap-1.5"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retake Assessment</span>
              </button>
            </div>
          </div>

          {/* Detailed Question Review List */}
          {showReview && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-800 px-1">Detailed Explanations</h3>
              {ASSESSMENT_QUESTIONS.map((q, idx) => {
                const userChoice = answers[q.id];
                const isCorrect = userChoice === q.correctIndex;
                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border text-sm space-y-3 bg-white ${
                      isCorrect ? 'border-emerald-200' : 'border-rose-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {q.level} • {q.category}
                        </span>
                      </div>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>

                    <p className="font-semibold text-slate-900">{q.question}</p>

                    <div className="text-xs space-y-1">
                      <p className="text-slate-600">
                        <strong className="text-slate-700">Your answer:</strong>{' '}
                        {userChoice !== undefined ? q.options[userChoice] : 'Not answered'}
                      </p>
                      {!isCorrect && (
                        <p className="text-emerald-700">
                          <strong className="text-emerald-800">Correct answer:</strong> {q.options[q.correctIndex]}
                        </p>
                      )}
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 text-xs text-slate-700 leading-relaxed border border-slate-100">
                      <strong className="text-slate-900">Explanation:</strong> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

