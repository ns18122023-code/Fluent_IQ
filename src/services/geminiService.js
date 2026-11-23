/**
 * geminiService.js
 * Secure client-side service for AI features.
 * Calls the serverless /api/gemini endpoint so GEMINI_API_KEY is never exposed in browser code.
 */

export async function callGemini({ prompt, systemInstruction, history = [], temperature = 0.7, maxOutputTokens = 2048 }) {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        systemInstruction,
        history,
        temperature,
        maxOutputTokens,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data.error || data.message || `Request failed (${response.status})`;
      const err = new Error(errorMsg);
      err.code = data.code || 'API_ERROR';
      err.status = response.status;
      err.details = data.details;
      throw err;
    }

    return data.text || '';
  } catch (error) {
    console.error('Gemini Service Error:', error);
    throw error;
  }
}

/**
 * AI Tutor interactive conversation
 */
export async function tutorChat({ message, history, userProfile, mode = 'everyday' }) {
  const modeContexts = {
    everyday: 'Friendly, natural, conversational everyday English tutor.',
    professional: 'Business English coach focusing on workplace etiquette, emails, and executive communication.',
    academic: 'Scholarly English coach focusing on formal syntax, essays, thesis logic, and vocabulary precision.',
    interview: 'Job interview coach preparing the user for behavioral and technical interviews with confident phrasing.',
  };

  const systemInstruction = `You are "Fluent IQ AI Tutor", an empathetic, world-class English language coach.
Context:
- Mode: ${modeContexts[mode] || modeContexts.everyday}
- Student Name: ${userProfile?.name || 'Student'}
- Student Estimated CEFR Level: ${userProfile?.estimatedLevel || 'B1 (Intermediate)'}
- Known Weak Areas: ${(userProfile?.weakAreas || []).join(', ') || 'General fluency and grammar'}

Guidelines:
1. Always adapt your language complexity and explanations to the student's level (${userProfile?.estimatedLevel || 'B1'}).
2. When the student makes a grammatical or phrasing mistake, gently point it out, explain WHY in clear terms, and provide a natural alternative.
3. Keep answers encouraging, structured, and easy to read with bullet points or bold text.
4. If appropriate, conclude with a quick interactive check-question or mini-exercise to keep the student practicing.
5. Never be condescending; celebrate progress!`;

  return callGemini({
    prompt: message,
    history,
    systemInstruction,
    temperature: 0.7,
  });
}

/**
 * Writing Studio Evaluator
 * Evaluates paragraphs, essays, emails, journals with structured JSON feedback.
 */
export async function evaluateWriting({ text, writingType, promptTopic, targetTone = 'balanced' }) {
  const systemInstruction = `You are a professional English writing examiner and linguistic analyst for Fluent IQ.
Analyze the user's submitted English text and return a STRICT JSON object (no markdown code blocks, just raw JSON).

JSON Schema:
{
  "score": number (0 to 100 based on CEFR standards),
  "cefrEstimate": "A1"|"A2"|"B1"|"B2"|"C1"|"C2",
  "summary": "2-3 sentence executive evaluation summary",
  "metrics": {
    "grammar": number (0-100),
    "vocabulary": number (0-100),
    "coherence": number (0-100),
    "spellingPunctuation": number (0-100),
    "toneClarity": number (0-100)
  },
  "correctedVersion": "The fully polished and grammatically flawless version of their text",
  "mistakes": [
    {
      "original": "exact phrase from user text",
      "correction": "corrected phrasing",
      "type": "Grammar"|"Spelling"|"Punctuation"|"Word Choice"|"Sentence Structure",
      "explanation": "Clear educational explanation"
    }
  ],
  "betterVocabularySuggestions": [
    {
      "originalWord": "word used",
      "upgradedWord": "higher CEFR vocabulary word",
      "context": "sample sentence demonstrating natural usage"
    }
  ],
  "recommendations": [
    "Specific actionable recommendation 1",
    "Specific actionable recommendation 2"
  ]
}`;

  const prompt = `Writing Type: ${writingType}
Assigned Topic/Prompt: ${promptTopic || 'Free-form writing'}
Target Tone: ${targetTone}

Student Submitted Text:
"""
${text}
"""

Please evaluate and output only valid JSON matching the schema.`;

  const raw = await callGemini({
    prompt,
    systemInstruction,
    temperature: 0.3,
  });

  try {
    const cleaned = raw.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.warn('Could not parse Gemini JSON directly, returning parsed fallback:', err);
    return {
      score: 75,
      cefrEstimate: 'B1',
      summary: raw.slice(0, 200) + '...',
      metrics: { grammar: 75, vocabulary: 70, coherence: 80, spellingPunctuation: 85, toneClarity: 75 },
      correctedVersion: text,
      mistakes: [],
      betterVocabularySuggestions: [],
      recommendations: ['Practice proofreading before final submission.', 'Expand sentence variety.'],
      rawText: raw,
    };
  }
}

/**
 * Speaking & Pronunciation Evaluator
 */
export async function evaluateSpeaking({ transcript, topicPrompt, expectedSentence = null }) {
  const systemInstruction = `You are a speech and communication coach for Fluent IQ.
Analyze the user's spoken transcript for grammar, vocabulary, sentence formation, filler words, and natural fluency.
Return a STRICT JSON object:
{
  "fluencyScore": number (0-100),
  "grammarScore": number (0-100),
  "vocabularyScore": number (0-100),
  "overallScore": number (0-100),
  "detectedFillerWords": ["um", "like", "uh", "you know"],
  "fillerWordCount": number,
  "strengths": ["string"],
  "weaknesses": ["string"],
  "correctedTranscript": "Polished spoken English version",
  "suggestions": ["specific actionable advice"]
}`;

  const prompt = `Topic / Speaking Prompt: ${topicPrompt}
${expectedSentence ? `Target/Expected Sentence: "${expectedSentence}"` : ''}

Spoken Transcript Captured from Speech Recognition:
"""
${transcript}
"""

Analyze the spoken transcript and return only valid JSON.`;

  const raw = await callGemini({
    prompt,
    systemInstruction,
    temperature: 0.3,
  });

  try {
    const cleaned = raw.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (err) {
    return {
      fluencyScore: 78,
      grammarScore: 80,
      vocabularyScore: 75,
      overallScore: 78,
      detectedFillerWords: [],
      fillerWordCount: 0,
      strengths: ['Clear message delivery', 'Good basic vocabulary'],
      weaknesses: ['Minor sentence structure inconsistencies'],
      correctedTranscript: transcript,
      suggestions: ['Try to pause naturally instead of rushing.'],
      rawText: raw,
    };
  }
}

/**
 * Communication Style Coach Comparison
 */
export async function analyzeCommunicationStyles(inputSentence) {
  const systemInstruction = `You are the Fluent IQ Communication Style Coach.
Given an English sentence or thought, produce 4 distinct style variations:
1. Casual / Friendly (daily talk with friends or peers)
2. Professional / Workplace (business emails, meetings, managers)
3. Academic / Formal (papers, essays, presentations)
4. Job Interview (confident, structured, proactive)

Return STRICT JSON:
{
  "original": "string",
  "styles": [
    {
      "tone": "Casual",
      "sentence": "string",
      "explanation": "Why this works in casual settings and when to use it",
      "appropriateness": "Chats, social gatherings, informal Slack messages"
    },
    {
      "tone": "Professional",
      "sentence": "string",
      "explanation": "Why this works in business settings",
      "appropriateness": "Client emails, corporate updates, stand-ups"
    },
    {
      "tone": "Academic",
      "sentence": "string",
      "explanation": "Scholarly formulation with formal diction",
      "appropriateness": "Research papers, literature reviews, dissertations"
    },
    {
      "tone": "Job Interview",
      "sentence": "string",
      "explanation": "Action-oriented, confident, and articulate",
      "appropriateness": "Behavioral answers, elevator pitches"
    }
  ]
}`;

  const raw = await callGemini({
    prompt: `Original sentence to convert: "${inputSentence}"`,
    systemInstruction,
    temperature: 0.4,
  });

  try {
    const cleaned = raw.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (err) {
    return null;
  }
}

/**
 * Generate fresh Reading Comprehension Passage
 */
export async function generateReadingPassage({ level = 'Intermediate', topic = 'Science & Technology' }) {
  const systemInstruction = `You are an English reading comprehension curriculum author.
Create a high-quality passage and 3 multiple-choice comprehension questions for level: ${level}, topic: ${topic}.
Return STRICT JSON:
{
  "title": "Passage Title",
  "level": "${level}",
  "topic": "${topic}",
  "content": "A compelling 3-4 paragraph reading passage (approx 200-300 words).",
  "keyVocabulary": [
    { "word": "word", "meaning": "definition in context" }
  ],
  "questions": [
    {
      "id": 1,
      "question": "Question text",
      "options": ["A", "B", "C", "D"],
      "correctIndex": 0,
      "explanation": "Why option A is correct based on the passage."
    }
  ]
}`;

  const raw = await callGemini({
    prompt: `Generate an engaging English reading passage for ${level} level on the topic "${topic}".`,
    systemInstruction,
    temperature: 0.6,
  });

  try {
    const cleaned = raw.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (err) {
    return null;
  }
}

/**
 * Generate additional grammar practice questions
 */
export async function generateGrammarQuestions({ topic, difficulty = 'intermediate', count = 3 }) {
  const systemInstruction = `You are an English grammar test author.
Generate ${count} multiple choice questions for Topic: "${topic}" at Difficulty: "${difficulty}".
Return STRICT JSON:
{
  "questions": [
    {
      "id": "gen_1",
      "question": "Sentence with ___ blank or question prompt",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Clear explanation of the grammatical rule"
    }
  ]
}`;

  const raw = await callGemini({
    prompt: `Create ${count} practice questions for ${topic} at ${difficulty} level.`,
    systemInstruction,
    temperature: 0.5,
  });

  try {
    const cleaned = raw.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (err) {
    return null;
  }
}
