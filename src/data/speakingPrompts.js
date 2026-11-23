/**
 * speakingPrompts.js
 * Speaking prompts for spontaneous speech, roleplays, interviews, and repeat-and-practice.
 */

export const SPEAKING_PROMPTS = [
  {
    id: 'sp_1',
    title: 'Career & Professional Growth',
    category: 'Job Interview',
    prompt: 'Describe a challenging project you managed in the past. What obstacles did you encounter, and how did you resolve them with your team?',
    duration: '2 minutes',
    targetVocabulary: ['collaborate', 'overcome', 'milestone', 'strategy', 'outcome'],
    suggestedQuestions: [
      'What was the specific objective?',
      'Who did you work with?',
      'What was the measurable outcome?'
    ]
  },
  {
    id: 'sp_2',
    title: 'Technological Transformation',
    category: 'Impromptu Discussion',
    prompt: 'Do you believe artificial intelligence will primarily augment human creativity or replace traditional intellectual jobs? Give reasons and examples.',
    duration: '2 minutes',
    targetVocabulary: ['innovation', 'automate', 'complement', 'ethical', 'perspective'],
    suggestedQuestions: [
      'What sectors are most affected?',
      'What should professionals do to prepare?'
    ]
  },
  {
    id: 'sp_3',
    title: 'Travel & Cultural Immersion',
    category: 'Everyday Conversation',
    prompt: 'Talk about a memorable trip you took or a city you have visited. What was the most fascinating cultural difference you observed?',
    duration: '1.5 minutes',
    targetVocabulary: ['hospitality', 'landmark', 'heritage', 'unforgettable', 'breathtaking'],
    suggestedQuestions: [
      'Where was this location?',
      'What food or tradition surprised you most?'
    ]
  },
  {
    id: 'sp_4',
    title: 'Work-Life Harmony',
    category: 'Casual & Lifestyle',
    prompt: 'How do you structure your daily routine to maintain productivity while avoiding burnout and preserving personal downtime?',
    duration: '1.5 minutes',
    targetVocabulary: ['prioritize', 'discipline', 'recharge', 'balance', 'mindfulness'],
    suggestedQuestions: [
      'What habits help you stay focused?',
      'How do you disconnect in the evenings?'
    ]
  }
];

export const REPEAT_PRACTICE_SENTENCES = [
  {
    id: 'rep_1',
    level: 'Beginner',
    sentence: "Good morning! I would like to schedule an appointment with the dentist for tomorrow.",
    focus: "Polite requests and clear vowel pronunciation"
  },
  {
    id: 'rep_2',
    level: 'Intermediate',
    sentence: "Could you please elaborate on the quarterly projections before we finalize the budget?",
    focus: "Intonation in courteous workplace questions"
  },
  {
    id: 'rep_3',
    level: 'Intermediate',
    sentence: "Although we encountered severe turbulence, the pilot landed the aircraft smoothly.",
    focus: "Clause pausing and rhythm"
  },
  {
    id: 'rep_4',
    level: 'Advanced',
    sentence: "The empirical evidence unequivocally substantiates our hypothesis regarding neural plasticity.",
    focus: "Multi-syllable academic articulation"
  },
  {
    id: 'rep_5',
    level: 'Advanced',
    sentence: "Under no circumstances should confidential credentials be transmitted across unencrypted networks.",
    focus: "Fronted negative inversion rhythm and clarity"
  }
];
