/**
 * assessmentQuestions.js
 * Comprehensive diagnostic assessment covering CEFR A1 to C2 across:
 * - Grammar & Tenses
 * - Articles & Prepositions
 * - Vocabulary & Collocations
 * - Sentence Correction
 * - Reading Comprehension
 * - Sentence Formation & Syntax
 */

export const ASSESSMENT_QUESTIONS = [
  // 1. A1 - Articles / Basic Grammar
  {
    id: 1,
    level: 'A1',
    category: 'Articles',
    question: "Choose the correct article: She bought ___ apple and ___ banana at the supermarket.",
    options: [
      "a / a",
      "an / a",
      "an / an",
      "a / an"
    ],
    correctIndex: 1,
    explanation: "We use 'an' before vowel sounds ('apple') and 'a' before consonant sounds ('banana')."
  },
  // 2. A1 - Present Simple
  {
    id: 2,
    level: 'A1',
    category: 'Tenses',
    question: "Complete the sentence: My brother ___ in London, but our parents live in Manchester.",
    options: [
      "live",
      "lives",
      "is live",
      "living"
    ],
    correctIndex: 1,
    explanation: "Third-person singular ('he / my brother') in the Present Simple requires adding '-s' or '-es' (lives)."
  },
  // 3. A2 - Prepositions of Time
  {
    id: 3,
    level: 'A2',
    category: 'Prepositions',
    question: "Select the correct prepositions: The conference starts ___ Monday morning ___ 9:00 AM.",
    options: [
      "at / on",
      "in / at",
      "on / at",
      "on / in"
    ],
    correctIndex: 2,
    explanation: "We use 'on' for specific days and dates ('on Monday morning'), and 'at' for specific clock times ('at 9:00 AM')."
  },
  // 4. A2 - Past Simple vs Past Continuous
  {
    id: 4,
    level: 'A2',
    category: 'Tenses',
    question: "While I ___ for the bus, it suddenly started to rain heavily.",
    options: [
      "waited",
      "was waiting",
      "am waiting",
      "have waited"
    ],
    correctIndex: 1,
    explanation: "We use the Past Continuous ('was waiting') for an ongoing background action interrupted by a shorter action in the Past Simple ('started')."
  },
  // 5. B1 - Present Perfect vs Past Simple
  {
    id: 5,
    level: 'B1',
    category: 'Tenses',
    question: "I ___ in this company for three years, and I still love my job.",
    options: [
      "worked",
      "have worked",
      "had worked",
      "am working"
    ],
    correctIndex: 1,
    explanation: "The Present Perfect ('have worked') connects an action that started in the past and continues into the present ('and I still love my job')."
  },
  // 6. B1 - Subject-Verb Agreement
  {
    id: 6,
    level: 'B1',
    category: 'Subject-Verb Agreement',
    question: "Neither the manager nor the team members ___ available for the afternoon meeting.",
    options: [
      "is",
      "are",
      "was",
      "has been"
    ],
    correctIndex: 1,
    explanation: "With 'neither... nor...', the verb agrees with the closer subject. 'The team members' is plural, so 'are' is correct."
  },
  // 7. B1 - Vocabulary in Context
  {
    id: 7,
    level: 'B1',
    category: 'Vocabulary',
    question: "The newly hired marketing manager made a significant ___ to the company's annual revenue.",
    options: [
      "contribution",
      "distribution",
      "attribution",
      "subtraction"
    ],
    correctIndex: 0,
    explanation: "'Contribution' means the act of giving or contributing to something, commonly paired with 'make a significant contribution to'."
  },
  // 8. B1 - Sentence Correction
  {
    id: 8,
    level: 'B1',
    category: 'Sentence Correction',
    question: "Which of the following sentences is grammatically CORRECT?",
    options: [
      "Although it was raining, but we decided to go hiking.",
      "Despite of the rain, we decided to go hiking.",
      "Although it was raining, we decided to go hiking.",
      "In spite the rain, we decided to go hiking."
    ],
    correctIndex: 2,
    explanation: "Do not use 'although' and 'but' together. 'Despite' does not take 'of', and 'in spite' requires 'of' ('in spite of the rain')."
  },
  // 9. B2 - Conditionals (Third Conditional)
  {
    id: 9,
    level: 'B2',
    category: 'Conditionals',
    question: "If we ___ the train on time, we wouldn't have missed the opening ceremony.",
    options: [
      "caught",
      "would catch",
      "had caught",
      "have caught"
    ],
    correctIndex: 2,
    explanation: "The Third Conditional expresses hypothetical past events: 'If + Past Perfect (had caught), would have + past participle'."
  },
  // 10. B2 - Modals of Deduction
  {
    id: 10,
    level: 'B2',
    category: 'Modals',
    question: "Look at the empty parking lot. Sarah ___ left already because her car is gone.",
    options: [
      "must have",
      "should have",
      "might not have",
      "ought to"
    ],
    correctIndex: 0,
    explanation: "'Must have + past participle' expresses strong logical certainty about a past event based on evidence."
  },
  // 11. B2 - Relative Clauses & Prepositions
  {
    id: 11,
    level: 'B2',
    category: 'Sentence Structure',
    question: "The senior client ___ we presented the proposal approved the budget immediately.",
    options: [
      "to whom",
      "who",
      "which",
      "whose"
    ],
    correctIndex: 0,
    explanation: "In formal English, the preposition precedes the objective relative pronoun referring to people: 'to whom we presented'."
  },
  // 12. B2 - Reading Comprehension
  {
    id: 12,
    level: 'B2',
    category: 'Reading Comprehension',
    question: "Read the snippet: 'While remote work fosters autonomy and reduces commute fatigue, it can also blur boundaries between professional commitments and personal downtime.' What is the author's primary assertion?",
    options: [
      "Remote work is strictly harmful to work-life balance.",
      "Remote work has both notable benefits and potential drawbacks regarding boundary maintenance.",
      "Commute fatigue is the main reason employees prefer working from home.",
      "Employees should avoid professional commitments outside work hours."
    ],
    correctIndex: 1,
    explanation: "The author balances advantages ('autonomy, reduces commute fatigue') with disadvantages ('blur boundaries between commitments and downtime')."
  },
  // 13. C1 - Inversion for Emphasis
  {
    id: 13,
    level: 'C1',
    category: 'Sentence Structure',
    question: "Seldom ___ such remarkable resilience in the face of unprecedented economic disruption.",
    options: [
      "we have witnessed",
      "have we witnessed",
      "we witnessed",
      "did we witnessed"
    ],
    correctIndex: 1,
    explanation: "Negative or restrictive adverbs ('Seldom', 'Rarely', 'Never') at the beginning of a clause require subject-auxiliary inversion ('have we witnessed')."
  },
  // 14. C1 - Subjunctive Mood
  {
    id: 14,
    level: 'C1',
    category: 'Grammar',
    question: "The director strongly recommended that the safety protocol ___ revised without delay.",
    options: [
      "is",
      "was",
      "be",
      "will be"
    ],
    correctIndex: 2,
    explanation: "The English Mandative Subjunctive after verbs of demanding or recommending ('recommended that...') requires the base form of the verb ('be revised')."
  },
  // 15. C1 - Advanced Collocation
  {
    id: 15,
    level: 'C1',
    category: 'Vocabulary',
    question: "The research findings ___ doubt on the longstanding hypothesis regarding neural plasticity.",
    options: [
      "threw",
      "cast",
      "shed",
      "placed"
    ],
    correctIndex: 1,
    explanation: "The established academic collocation is 'to cast doubt on' (whereas 'to shed light on' means to clarify)."
  },
  // 16. C2 - Idiomatic Precision & Nuance
  {
    id: 16,
    level: 'C2',
    category: 'Vocabulary',
    question: "His explanation sounded plausible at first, but upon closer examination it seemed completely ___ .",
    options: [
      "specious",
      "auspicious",
      "propitious",
      "perspicacious"
    ],
    correctIndex: 0,
    explanation: "'Specious' describes an argument that superficially appears correct or attractive, but is actually false or deceptive."
  },
  // 17. C2 - Complex Participle Clause
  {
    id: 17,
    level: 'C2',
    category: 'Sentence Formation',
    question: "___ exhausted all institutional avenues of appeal, the committee had no recourse but to accept the arbitrator's verdict.",
    options: [
      "Having been",
      "Having",
      "Being",
      "To have"
    ],
    correctIndex: 1,
    explanation: "The perfect active participle 'Having exhausted' clearly shows that the committee itself completed the action before the main clause."
  },
  // 18. C2 - Discourse Markers & Coherence
  {
    id: 18,
    level: 'C2',
    category: 'Sentence Structure',
    question: "The fiscal austerity measures stabilized inflation; ___, they inadvertently suppressed consumer spending in peripheral markets.",
    options: [
      "furthermore",
      "nonetheless",
      "consequently",
      "inasmuch as"
    ],
    correctIndex: 1,
    explanation: "'Nonetheless' marks a concessive contrast between the positive outcome (stabilized inflation) and the adverse side-effect (suppressed spending)."
  }
];

/**
 * Calculates estimated CEFR level, breakdown, strengths and weak areas
 */
export function calculateAssessmentResult(answers) {
  let score = 0;
  const total = ASSESSMENT_QUESTIONS.length;
  const categoryStats = {};

  ASSESSMENT_QUESTIONS.forEach(q => {
    const isCorrect = answers[q.id] === q.correctIndex;
    if (isCorrect) score += 1;

    if (!categoryStats[q.category]) {
      categoryStats[q.category] = { correct: 0, total: 0 };
    }
    categoryStats[q.category].total += 1;
    if (isCorrect) {
      categoryStats[q.category].correct += 1;
    }
  });

  const percentage = Math.round((score / total) * 100);

  // CEFR Level Estimation
  let estimatedLevel = 'A1';
  let description = 'Beginner';

  if (score >= 16) {
    estimatedLevel = 'C2';
    description = 'Mastery / Near-Native';
  } else if (score >= 14) {
    estimatedLevel = 'C1';
    description = 'Effective Operational Proficiency';
  } else if (score >= 11) {
    estimatedLevel = 'B2';
    description = 'Vantage / Upper Intermediate';
  } else if (score >= 8) {
    estimatedLevel = 'B1';
    description = 'Threshold / Intermediate';
  } else if (score >= 5) {
    estimatedLevel = 'A2';
    description = 'Waystage / Elementary';
  } else {
    estimatedLevel = 'A1';
    description = 'Breakthrough / Beginner';
  }

  // Strengths & Weak Areas
  const strengths = [];
  const weakAreas = [];

  Object.entries(categoryStats).forEach(([cat, stat]) => {
    const catPercent = (stat.correct / stat.total) * 100;
    if (catPercent >= 75) {
      strengths.push(cat);
    } else if (catPercent <= 50) {
      weakAreas.push(cat);
    }
  });

  if (strengths.length === 0) strengths.push('Grammar Basics');
  if (weakAreas.length === 0) weakAreas.push('Advanced Inversion & Collocations');

  return {
    score,
    total,
    percentage,
    estimatedLevel: `${estimatedLevel} (${description})`,
    rawLevel: estimatedLevel,
    strengths,
    weakAreas,
    categoryStats,
    completedAt: new Date().toISOString()
  };
}

