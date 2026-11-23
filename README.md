# Fluent IQ — Intelligent AI English Learning Platform

> **"Speak Smart. Write Better. Communicate Confidently."**

Fluent IQ is a comprehensive, production-grade AI-powered English language learning platform designed to help students, job seekers, and professionals elevate their English communication, grammar, vocabulary, pronunciation, and writing skills through personalized exercises, multi-modal interaction, and adaptive intelligence.

---

## 🌟 Key Features

### 1. 🎯 Initial English Assessment (CEFR Benchmark)
- **18-Question Comprehensive Diagnostic** covering CEFR levels **A1 to C2**.
- Tests across: Grammar, Tenses, Articles, Prepositions, Vocabulary & Collocations, Sentence Correction, Reading Comprehension, and Syntax.
- **Deterministic rule-based scoring** with instant answer explanations.
- Diagnostic results clearly distinguish estimated CEFR levels from formal certification exams.
- Automatically initializes user strengths, recommended focus areas, and saves to the learning profile.

### 2. 🤖 AI Personal Tutor (Gemini Flash)
- **Multi-turn conversational coaching** with Google Gemini Flash.
- **Context-Aware**: Adapts explanations to the student's estimated CEFR level and addresses their recurring mistake history.
- **4 Coaching Modes**:
  - *Everyday*: Conversational idioms, natural fluency, and casual talk.
  - *Workplace / Professional*: Executive correspondence, meetings, and business etiquette.
  - *Academic*: Scholarly essays, thesis structures, and precision diction.
  - *Interview*: STAR response formulation and confident delivery.
- Supports **speech-to-text input** and **natural audio text-to-speech playback**.
- Resilient error handling with retry controls and zero simulated responses.

### 3. ✍️ Writing Studio
- Comprehensive evaluation for emails, academic essays, opinion paragraphs, creative stories, and cover letters.
- Real-time linguistic scoring across:
  - Grammar (0–100%)
  - Vocabulary sophistication (0–100%)
  - Coherence & structural flow (0–100%)
  - Spelling & Punctuation (0–100%)
  - Tone & Style clarity (0–100%)
- Side-by-side **Original vs. Flawless Polished Version**.
- Detailed error breakdown with explanations and automatic logging to **AI Mistake Memory**.
- Contextual vocabulary upgrade suggestions.

### 4. 🎙️ Speaking & Pronunciation Lab
- Voice recording and real-time speech recognition via the **Browser Web Speech API**.
- Live editable speech transcript.
- Gemini Flash evaluation of fluency, sentence formation, grammar, and filler words (`um`, `like`, `uh`).
- **Repeat & Practice Mode**: Listen to native model pronunciation via Web Speech Synthesis, repeat aloud, and get immediate word-for-word accuracy scoring.

### 5. 🧠 Deterministic Grammar Practice (10 Core Topics)
- Covers 10 fundamental English pillars:
  1. Tenses & Aspects
  2. Articles & Determiners
  3. Prepositions & Phrasal Verbs
  4. Subject-Verb Agreement
  5. Active & Passive Voice
  6. Direct & Indirect Speech
  7. Modal Auxiliaries
  8. Conjunctions & Connectors
  9. Sentence Structure & Syntax
  10. Common Grammatical Pitfalls
- 3 difficulty tiers (*Beginner*, *Intermediate*, *Advanced*) with **150 handcrafted deterministic questions**.
- **AI Dynamic Generator**: Generates fresh practice questions on demand using Gemini Flash.

### 6. 📖 Reading & Comprehension Lab
- Diverse passages spanning everyday culture, corporate communication, and cognitive science.
- In-context vocabulary glossaries with instant **"Save to My Vocab"** integration.
- Comprehension quizzes with instant answer checking and detailed rationales.
- AI Passage generator for unlimited fresh reading material.

### 7. 📚 Vocabulary Builder & Lexicon Bank
- **Deterministic Word of the Day** with phonetic transcription, definition, CEFR rank, example sentences, synonyms, and antonyms.
- Audio pronunciation playback.
- Interactive **Flashcard revision** and mastery tracking (*Learning*, *Mastered*, *Difficult*).

### 8. 🧠 Intelligent Learning Engine
- **AI Mistake Memory**: Captures mistakes made across all modules, tracks recurring errors, and updates weak area recommendations automatically.
- **Communication Style Coach**: Instant 4-way comparison between Casual, Professional, Academic, and Interview English for any sentence.
- **Daily 10-Minute Challenge**: 4-part micro-learning routine with streak progression.
- **Achievements System**: Real milestone badges unlocked strictly upon meeting measurable conditions.

### 9. 📊 Progress & Quantitative Analytics
- Real-time **Recharts Radar Chart** assessing 5-point skill balance.
- **Weekly Practice Time Bar Chart** computed from authentic user activity logs.
- Before-and-after assessment milestone timeline.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite 6, Tailwind CSS, Lucide React, Recharts, Canvas-Confetti
- **AI Engine**: Google Gemini Flash API via secure serverless backend
- **Backend**: Vercel Serverless Function (`api/gemini.js`) + Vite local proxy middleware
- **Voice**: Web Speech Recognition & SpeechSynthesis APIs
- **Persistence**: Clean browser storage abstraction (`localStorage`) with full session persistence across refreshes; Supabase ready.

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- Node.js (v18+ recommended, v24 supported)
- npm or pnpm

### 2. Installation
```bash
git clone <repository-url>
cd fluent_iq
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your Google Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```
*(Note: GEMINI_API_KEY is used strictly server-side by the local Vite dev proxy and Vercel functions; it is never exposed in browser bundles).*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for Production
```bash
npm run build
npm run preview
```

---

## ☁️ Deployment Instructions (Vercel)

Fluent IQ is pre-configured for zero-friction Vercel deployment with `vercel.json` and `api/gemini.js`.

### Deploying via Vercel CLI
```bash
npm install -g vercel
vercel
```
When prompted, select project defaults.

### Setting Environment Variables on Vercel
In the Vercel Project Dashboard:
1. Navigate to **Settings** → **Environment Variables**.
2. Add:
   - `GEMINI_API_KEY`: Your Google Gemini API key.
   - `GEMINI_MODEL`: `gemini-2.5-flash` (or your preferred Flash model).
3. Redeploy or trigger a new build.

---

## 🔒 Security & Privacy Notice
- The Gemini API Key is **never exposed** in client-side bundles, browser storage, or client requests.
- All AI calls route through `/api/gemini`, keeping credentials secure.
- In local demo mode, all student data remains private in the browser's persistent storage.

---

## 📄 License
MIT License. Built for educational excellence.
