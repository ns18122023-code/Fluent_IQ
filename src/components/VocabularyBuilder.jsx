import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { VOCABULARY_CATALOG, getWordOfTheDay } from '../data/vocabularyData';
import {
  Bookmark,
  Volume2,
  Sparkles,
  CheckCircle2,
  Trash2,
  Search,
  BookOpen,
  Filter,
  Plus,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function VocabularyBuilder() {
  const { vocabulary, saveWord, updateWordStatus, removeWord, logActivity, unlockAchievement } = useLearning();

  const dailyWord = getWordOfTheDay();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all'); // 'all' | 'learning' | 'mastered' | 'difficult'
  const [quizMode, setQuizMode] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const playTTS = (word) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleSaveDaily = () => {
    saveWord({
      word: dailyWord.word,
      phonetic: dailyWord.phonetic,
      pos: dailyWord.pos,
      cefr: dailyWord.cefr,
      meaning: dailyWord.meaning,
      example: dailyWord.example,
      synonyms: dailyWord.synonyms,
      antonyms: dailyWord.antonyms,
    });
    alert(`"${dailyWord.word}" added to your Saved Vocabulary!`);
  };

  // Combine pre-curated catalog + user saved vocabulary
  const allWords = [...vocabulary];
  VOCABULARY_CATALOG.forEach((catWord) => {
    if (!allWords.some((w) => w.word.toLowerCase() === catWord.word.toLowerCase())) {
      allWords.push({ ...catWord, status: 'catalog' });
    }
  });

  const filteredWords = allWords.filter((w) => {
    const matchesSearch =
      w.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.meaning.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedFilter === 'all') return true;
    return w.status === selectedFilter;
  });

  const activeQuizWord = filteredWords[quizIndex] || filteredWords[0];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-semibold mb-2">
            <Bookmark className="w-3.5 h-3.5 text-violet-600" />
            <span>Lexicon Mastery & Spaced Retrieval</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Vocabulary Builder & Word Bank</h1>
          <p className="text-sm text-slate-600 mt-1">
            Build your active English vocabulary with phonetic audio, contextual collocations, and revision quizzes.
          </p>
        </div>

        <button
          onClick={() => {
            setQuizMode(!quizMode);
            setShowAnswer(false);
          }}
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition"
        >
          {quizMode ? 'Back to Word List' : 'Start Vocabulary Flashcards'}
        </button>
      </div>

      {/* Word of the Day Banner */}
      <div className="bg-gradient-to-tr from-brand-600 via-indigo-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white shadow-lg shadow-brand-500/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-200 px-2 py-0.5 rounded bg-white/10">
              Word of the Day • {dailyWord.cefr}
            </span>
            <div className="flex items-center gap-3 mt-2">
              <h2 className="text-3xl font-extrabold tracking-tight">{dailyWord.word}</h2>
              <button
                onClick={() => playTTS(dailyWord.word)}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition text-white"
                title="Listen to pronunciation"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <span className="text-xs text-brand-200 font-mono">{dailyWord.phonetic}</span>
            </div>
            <p className="text-xs text-brand-100 italic mt-0.5">{dailyWord.pos}</p>
          </div>

          <button
            onClick={handleSaveDaily}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-brand-700 hover:bg-brand-50 transition shadow-sm shrink-0"
          >
            + Save to My Vocab
          </button>
        </div>

        <p className="text-sm text-white/90 mt-4 leading-relaxed font-medium">{dailyWord.meaning}</p>
        <p className="text-xs text-brand-100 bg-white/10 p-3 rounded-xl mt-3 italic border border-white/10">
          "{dailyWord.example}"
        </p>

        <div className="flex flex-wrap items-center gap-2 mt-4 text-[11px]">
          <span className="text-brand-200 font-semibold">Synonyms:</span>
          {dailyWord.synonyms?.map((syn, idx) => (
            <span key={idx} className="px-2 py-0.5 rounded bg-white/20 text-white font-medium">
              {syn}
            </span>
          ))}
        </div>
      </div>

      {quizMode ? (
        /* Flashcards Quiz Interface */
        activeQuizWord && (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 text-center max-w-xl mx-auto space-y-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Flashcard {quizIndex + 1} of {filteredWords.length}
            </span>

            <div className="py-6">
              <h3 className="text-3xl font-extrabold text-slate-900">{activeQuizWord.word}</h3>
              <p className="text-xs text-slate-400 font-mono mt-1">{activeQuizWord.phonetic}</p>
              <button
                onClick={() => playTTS(activeQuizWord.word)}
                className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Listen</span>
              </button>
            </div>

            {showAnswer ? (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-2">
                <p className="text-sm font-semibold text-slate-900">{activeQuizWord.meaning}</p>
                <p className="text-xs text-slate-600 italic">"{activeQuizWord.example}"</p>
              </div>
            ) : (
              <button
                onClick={() => setShowAnswer(true)}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-brand-600 bg-brand-50 hover:bg-brand-100 border border-brand-200 transition"
              >
                Reveal Meaning & Example
              </button>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  updateWordStatus(activeQuizWord.id || activeQuizWord.word, 'difficult');
                  setShowAnswer(false);
                  if (quizIndex < filteredWords.length - 1) setQuizIndex((p) => p + 1);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 transition"
              >
                Mark Difficult
              </button>

              <button
                onClick={() => {
                  updateWordStatus(activeQuizWord.id || activeQuizWord.word, 'mastered');
                  setShowAnswer(false);
                  if (quizIndex < filteredWords.length - 1) {
                    setQuizIndex((p) => p + 1);
                  } else {
                    setQuizIndex(0);
                  }
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition"
              >
                Mark Mastered ✓
              </button>
            </div>
          </div>
        )
      ) : (
        /* Word Catalog Search & List */
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search words or meanings..."
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs">
              {['all', 'learning', 'mastered', 'difficult'].map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFilter(f)}
                  className={`px-3 py-1 rounded-lg font-bold capitalize transition ${
                    selectedFilter === f ? 'bg-white text-brand-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWords.map((item, idx) => {
              const isSaved = vocabulary.some(
                (w) => w.word.toLowerCase() === item.word.toLowerCase()
              );

              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-card space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-base text-slate-900">{item.word}</h4>
                        <button
                          onClick={() => playTTS(item.word)}
                          className="text-slate-400 hover:text-brand-600 transition"
                          title="Listen"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                        {item.cefr || 'B2'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 font-mono mt-0.5">{item.phonetic}</p>
                    <p className="text-xs text-slate-700 mt-2 leading-relaxed">{item.meaning}</p>
                    <p className="text-[11px] text-slate-500 italic bg-slate-50 p-2 rounded-lg mt-2">
                      "{item.example}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    {isSaved ? (
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {item.status || 'learning'}
                        </span>
                        <button
                          onClick={() => removeWord(item.id || item.word)}
                          className="text-slate-400 hover:text-rose-600"
                          title="Remove from My Vocab"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          saveWord(item);
                          alert(`Saved "${item.word}" to your vocabulary!`);
                        }}
                        className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Save to Vocab</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

