import React, { useState, useEffect, useRef } from 'react';
import { useLearning } from '../context/LearningContext';
import { tutorChat } from '../services/geminiService';
import { storageService } from '../services/storageService';
import {
  Bot,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Trash2,
  RefreshCw,
  AlertCircle,
  Briefcase,
  GraduationCap,
  MessageCircle,
  Users,
  CheckCircle2,
  Copy,
} from 'lucide-react';

export default function AITutor() {
  const { profile, recordMistake, logActivity } = useLearning();

  const [mode, setMode] = useState('everyday'); // 'everyday' | 'professional' | 'academic' | 'interview'
  const [messages, setMessages] = useState(() => {
    const saved = storageService.getTutorHistory();
    if (saved && saved.length > 0) return saved;
    return [
      {
        id: 'msg_welcome',
        role: 'assistant',
        content: `Hello ${profile.name || 'there'}! I'm your Fluent IQ Personal AI Tutor.\n\nI can help you polish your grammar, roleplay workplace interviews, suggest natural vocabulary, or explain complex sentence structures. How can I assist your English practice today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  });

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    storageService.saveTutorHistory(messages);
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Speech Recognition setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleSpeechRecognition = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  // Text to Speech
  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (e) => {
    e?.preventDefault();
    const cleanInput = inputText.trim();
    if (!cleanInput || isLoading) return;

    setApiError(null);
    const userMsg = {
      id: 'usr_' + Date.now(),
      role: 'user',
      content: cleanInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputText('');
    setIsLoading(true);

    try {
      // Build history for Gemini
      const historyPayload = newMessages.slice(-8).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const reply = await tutorChat({
        message: cleanInput,
        history: historyPayload,
        userProfile: profile,
        mode,
      });

      const assistantMsg = {
        id: 'ast_' + Date.now(),
        role: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      logActivity({
        type: 'tutor',
        title: `Tutor Consultation (${mode.toUpperCase()})`,
        durationMinutes: 5,
        details: { mode },
      });
    } catch (err) {
      console.error('Tutor chat failed:', err);
      setApiError(
        err.message || 'Unable to connect to Gemini Flash. Please verify your GEMINI_API_KEY environment variable.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Clear your conversation with the AI Tutor?')) {
      storageService.clearTutorHistory();
      setMessages([
        {
          id: 'msg_welcome',
          role: 'assistant',
          content: `History cleared. What English topic would you like to explore now?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const modes = [
    { id: 'everyday', label: 'Everyday', icon: MessageCircle, desc: 'Casual, idioms & daily speech' },
    { id: 'professional', label: 'Workplace', icon: Briefcase, desc: 'Corporate emails & meetings' },
    { id: 'academic', label: 'Academic', icon: GraduationCap, desc: 'Essays, thesis & formal diction' },
    { id: 'interview', label: 'Interview', icon: Users, desc: 'STAR technique & confidence' },
  ];

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col space-y-4">
      {/* Header & Mode Selector */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-sm">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900">AI Personal Tutor</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                Gemini Flash
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Adapted to your level: <strong className="text-brand-600">{profile.estimatedLevel}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode pills */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            {modes.map((m) => {
              const Icon = m.icon;
              const isSelected = mode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  title={m.desc}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    isSelected ? 'bg-white text-brand-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{m.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={handleClearHistory}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-6 overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div key={msg.id} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
              {!isUser && (
                <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed ${
                isUser
                  ? 'bg-brand-600 text-white rounded-tr-xs shadow-xs'
                  : 'bg-slate-50 text-slate-800 rounded-tl-xs border border-slate-200/60'
              }`}>
                {/* Content */}
                <div className="whitespace-pre-wrap font-sans">{msg.content}</div>

                {/* Footer bar */}
                <div className={`mt-2 flex items-center justify-between gap-3 text-[10px] ${
                  isUser ? 'text-brand-100' : 'text-slate-400'
                }`}>
                  <span>{msg.timestamp}</span>

                  {!isUser && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => speakText(msg.content)}
                        className="hover:text-brand-600 transition"
                        title={isSpeaking ? 'Stop Audio' : 'Listen with Natural Audio'}
                      >
                        {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-brand-600" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="hover:text-brand-600 transition"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {isUser && (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200 shrink-0 mt-1"
                />
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 items-center">
            <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60 text-xs text-slate-500 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-600 animate-pulse" />
              <span>Fluent IQ Tutor is thinking...</span>
            </div>
          </div>
        )}

        {apiError && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start justify-between gap-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">AI Tutor Connection Error</p>
                <p className="mt-0.5 text-rose-700">{apiError}</p>
              </div>
            </div>
            <button
              onClick={handleSend}
              className="px-3 py-1 bg-white border border-rose-300 text-rose-700 font-bold rounded-lg hover:bg-rose-100 transition shrink-0"
            >
              Retry
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested quick questions */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 font-semibold shrink-0">Quick prompts:</span>
        <button
          onClick={() => setInputText('Can you explain when to use "who" vs "whom" with clear examples?')}
          className="px-3 py-1 rounded-full bg-slate-100 hover:bg-brand-50 hover:text-brand-700 border border-slate-200 transition shrink-0 text-slate-700"
        >
          "Who" vs "Whom"?
        </button>
        <button
          onClick={() => setInputText('How can I make my business emails sound more professional and polite?')}
          className="px-3 py-1 rounded-full bg-slate-100 hover:bg-brand-50 hover:text-brand-700 border border-slate-200 transition shrink-0 text-slate-700"
        >
          Polite Email Etiquette
        </button>
        <button
          onClick={() => setInputText('Check this sentence for grammar: "She don\'t know where is the meeting."')}
          className="px-3 py-1 rounded-full bg-slate-100 hover:bg-brand-50 hover:text-brand-700 border border-slate-200 transition shrink-0 text-slate-700"
        >
          Correct a Sentence
        </button>
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSend} className="bg-white rounded-2xl p-2.5 border border-slate-200/80 shadow-xs flex items-center gap-2">
        <button
          type="button"
          onClick={toggleSpeechRecognition}
          className={`p-2.5 rounded-xl transition ${
            isListening ? 'bg-rose-500 text-white animate-pulse' : 'text-slate-500 hover:text-brand-600 hover:bg-slate-100'
          }`}
          title={isListening ? 'Stop Speech Recognition' : 'Dictate with Voice (Web Speech API)'}
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Ask anything about English grammar, vocabulary, or communication...`}
          className="flex-1 text-sm bg-transparent border-0 focus:outline-none text-slate-800 placeholder-slate-400 px-2"
        />

        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="p-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

