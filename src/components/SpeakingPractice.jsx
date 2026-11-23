import React, { useState, useEffect, useRef } from 'react';
import { useLearning } from '../context/LearningContext';
import { evaluateSpeaking } from '../services/geminiService';
import { SPEAKING_PROMPTS, REPEAT_PRACTICE_SENTENCES } from '../data/speakingPrompts';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Send,
  Award,
  Layers,
  Edit3,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SpeakingPractice() {
  const { logActivity, unlockAchievement } = useLearning();

  const [activeMode, setActiveMode] = useState('prompt'); // 'prompt' | 'repeat'
  const [selectedPrompt, setSelectedPrompt] = useState(SPEAKING_PROMPTS[0]);
  const [selectedSentence, setSelectedSentence] = useState(REPEAT_PRACTICE_SENTENCES[0]);

  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isEditable, setIsEditable] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [isSupported, setIsSupported] = useState(true);
  const [repeatMatchScore, setRepeatMatchScore] = useState(null);

  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let fullText = '';
      for (let i = 0; i < event.results.length; i++) {
        fullText += event.results[i][0].transcript + ' ';
      }
      setTranscript(fullText.trim());
    };

    recognition.onerror = (e) => {
      console.warn('Speech recognition error:', e);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const toggleRecording = () => {
    if (!isSupported) return;

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      setTranscript('');
      setAnalysis(null);
      setRepeatMatchScore(null);
      setApiError(null);
      setIsRecording(true);
      recognitionRef.current?.start();
    }
  };

  const playTTS = (textToSpeak) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const calculateSimilarity = (str1, str2) => {
    const s1 = str1.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/);
    const s2 = str2.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/);
    let matched = 0;
    s2.forEach((w) => {
      if (s1.includes(w)) matched += 1;
    });
    return Math.min(100, Math.round((matched / s2.length) * 100));
  };

  const handleAnalyze = async () => {
    if (!transcript.trim() || isAnalyzing) return;

    setIsAnalyzing(true);
    setApiError(null);

    try {
      if (activeMode === 'repeat') {
        const sim = calculateSimilarity(transcript, selectedSentence.sentence);
        setRepeatMatchScore(sim);
      }

      const res = await evaluateSpeaking({
        transcript,
        topicPrompt: activeMode === 'prompt' ? selectedPrompt.prompt : 'Repeat-and-Practice target sentence',
        expectedSentence: activeMode === 'repeat' ? selectedSentence.sentence : null,
      });

      setAnalysis(res);
      unlockAchievement('first_speaking');

      logActivity({
        type: 'speaking',
        title: `Speaking Practice: ${activeMode === 'prompt' ? selectedPrompt.category : 'Repeat & Practice'}`,
        score: res.overallScore || 80,
        durationMinutes: 5,
        details: { transcriptLength: transcript.length, fluency: res.fluencyScore },
      });

      if ((res.overallScore || 0) >= 80) {
        try {
          confetti({ particleCount: 60, spread: 50 });
        } catch (e) {}
      }
    } catch (err) {
      console.error('Speaking analysis error:', err);
      setApiError(err.message || 'Gemini Flash speaking evaluation error.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold mb-2">
            <Mic className="w-3.5 h-3.5 text-amber-600" />
            <span>Voice Lab & Fluency Coach</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Speaking & Pronunciation Practice</h1>
          <p className="text-sm text-slate-600 mt-1">
            Record spoken responses, eliminate filler words, and verify pronunciation against native models.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => { setActiveMode('prompt'); setAnalysis(null); setTranscript(''); }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              activeMode === 'prompt' ? 'bg-white text-brand-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Spontaneous Prompts
          </button>
          <button
            onClick={() => { setActiveMode('repeat'); setAnalysis(null); setTranscript(''); }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              activeMode === 'repeat' ? 'bg-white text-brand-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Repeat & Practice
          </button>
        </div>
      </div>

      {!isSupported && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-3">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <p>
            Your current browser does not natively support the Web Speech API recognition interface. You can type your spoken transcript below to still receive full Gemini Flash fluency analysis!
          </p>
        </div>
      )}

      {/* Main Workspace */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
        {/* Practice Prompt Display */}
        {activeMode === 'prompt' ? (
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                {selectedPrompt.category}
              </span>
              <select
                value={selectedPrompt.id}
                onChange={(e) => {
                  const p = SPEAKING_PROMPTS.find((x) => x.id === e.target.value);
                  if (p) { setSelectedPrompt(p); setTranscript(''); setAnalysis(null); }
                }}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 font-medium text-slate-700"
              >
                {SPEAKING_PROMPTS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/70">
              <h2 className="text-base font-bold text-slate-900 mb-2">{selectedPrompt.prompt}</h2>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="text-[11px] font-semibold text-slate-500">Target words to use:</span>
                {selectedPrompt.targetVocabulary.map((v, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-white border border-amber-200 text-[11px] text-amber-800 font-medium">
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Target Sentence ({selectedSentence.level})
              </span>
              <select
                value={selectedSentence.id}
                onChange={(e) => {
                  const s = REPEAT_PRACTICE_SENTENCES.find((x) => x.id === e.target.value);
                  if (s) { setSelectedSentence(s); setTranscript(''); setAnalysis(null); }
                }}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 font-medium text-slate-700"
              >
                {REPEAT_PRACTICE_SENTENCES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.level}: {s.sentence.slice(0, 30)}...
                  </option>
                ))}
              </select>
            </div>

            <div className="p-5 rounded-xl bg-indigo-50/60 border border-indigo-200 flex items-start justify-between gap-4">
              <div>
                <p className="text-base font-bold text-slate-900 leading-relaxed">
                  "{selectedSentence.sentence}"
                </p>
                <p className="text-xs text-indigo-700 mt-1 font-medium">
                  Pronunciation Focus: {selectedSentence.focus}
                </p>
              </div>

              <button
                onClick={() => playTTS(selectedSentence.sentence)}
                className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shrink-0 shadow-sm transition"
                title="Listen to Model Pronunciation"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Recording Controls & Live Transcript */}
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200/80">
            <button
              onClick={toggleRecording}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg ${
                isRecording
                  ? 'bg-rose-500 hover:bg-rose-600 text-white ring-8 ring-rose-200 animate-pulse'
                  : 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-500/30 hover:scale-105'
              }`}
            >
              {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </button>

            <span className="text-xs font-bold mt-4 text-slate-700">
              {isRecording ? 'Listening... Tap to Stop' : 'Tap to Start Speaking'}
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Powered by Browser Web Speech Recognition
            </p>
          </div>

          {/* Transcript Box */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Speech Recognition Transcript</span>
              <button
                onClick={() => setIsEditable(!isEditable)}
                className="flex items-center gap-1 text-brand-600 hover:text-brand-700"
              >
                <Edit3 className="w-3 h-3" />
                <span>{isEditable ? 'Lock Transcript' : 'Edit Transcript'}</span>
              </button>
            </div>

            {isEditable ? (
              <textarea
                rows={3}
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Spoken words will appear here. You can also edit or type manually..."
                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-800"
              />
            ) : (
              <p className="text-sm text-slate-800 min-h-[50px] p-2 bg-slate-50 rounded-lg">
                {transcript || (
                  <span className="text-slate-400 italic">No speech recorded yet. Tap the microphone and speak clearly.</span>
                )}
              </p>
            )}

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setTranscript('')}
                className="text-xs font-medium text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>

              <button
                onClick={handleAnalyze}
                disabled={!transcript.trim() || isAnalyzing}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm disabled:opacity-40 transition flex items-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing Fluency with Gemini...</span>
                  </>
                ) : (
                  <>
                    <span>Analyze Spoken Fluency</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Error notification */}
        {apiError && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-3">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <p>{apiError}</p>
          </div>
        )}

        {/* Repeat Accuracy Score */}
        {repeatMatchScore !== null && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Word-for-Word Transcription Match
              </span>
              <p className="text-xs text-slate-600 mt-0.5">
                Calculated based on detected transcript tokens versus model sentence.
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-brand-600">{repeatMatchScore}%</span>
            </div>
          </div>
        )}

        {/* Gemini Feedback Analysis */}
        {analysis && (
          <div className="pt-4 border-t border-slate-100 space-y-6">
            <h3 className="text-base font-bold text-slate-900">Fluency & Communication Feedback</h3>

            {/* Score Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-50 p-3 rounded-xl text-center border border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Overall
                </span>
                <span className="text-xl font-extrabold text-brand-600">{analysis.overallScore}%</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl text-center border border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Fluency
                </span>
                <span className="text-xl font-extrabold text-slate-800">{analysis.fluencyScore}%</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl text-center border border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Grammar
                </span>
                <span className="text-xl font-extrabold text-slate-800">{analysis.grammarScore}%</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl text-center border border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Filler Words
                </span>
                <span className="text-xl font-extrabold text-amber-600">
                  {analysis.fillerWordCount || analysis.detectedFillerWords?.length || 0}
                </span>
              </div>
            </div>

            {/* Polished Spoken Version */}
            {analysis.correctedTranscript && (
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Polished Spoken English Alternative</span>
                  </span>
                  <button
                    onClick={() => playTTS(analysis.correctedTranscript)}
                    className="text-xs text-emerald-700 font-bold hover:underline flex items-center gap-1"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>Listen</span>
                  </button>
                </div>
                <p className="text-sm text-emerald-950 font-medium">"{analysis.correctedTranscript}"</p>
              </div>
            )}

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                <span className="font-bold text-slate-700 block mb-1">Observed Strengths:</span>
                {(analysis.strengths || []).map((s, i) => (
                  <p key={i} className="text-slate-600">• {s}</p>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                <span className="font-bold text-slate-700 block mb-1">Actionable Suggestions:</span>
                {(analysis.suggestions || []).map((s, i) => (
                  <p key={i} className="text-slate-600">• {s}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

