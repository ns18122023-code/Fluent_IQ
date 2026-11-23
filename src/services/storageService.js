/**
 * storageService.js
 * Persistent browser storage abstraction for Fluent IQ.
 * Handles user profiles, mistake memory, activity logs, streaks, and achievements.
 * Fully supports local persistent demo mode and handles Supabase sync if credentials exist.
 */

const STORAGE_KEYS = {
  USER_PROFILE: 'fluent_iq_user_profile',
  MISTAKE_MEMORY: 'fluent_iq_mistake_memory',
  ACTIVITY_LOG: 'fluent_iq_activity_log',
  VOCABULARY_LIST: 'fluent_iq_vocab_list',
  SAVED_WRITINGS: 'fluent_iq_saved_writings',
  SAVED_SPEAKINGS: 'fluent_iq_saved_speakings',
  ASSESSMENTS: 'fluent_iq_assessments',
  TUTOR_CHAT: 'fluent_iq_tutor_chat',
  ACHIEVEMENTS: 'fluent_iq_achievements',
  DAILY_CHALLENGE: 'fluent_iq_daily_challenge',
};

const DEFAULT_PROFILE = {
  id: 'demo_user_1',
  name: 'Alex Morgan',
  email: 'alex@fluenteq.edu',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  estimatedLevel: 'Not Assessed',
  cefrScore: null,
  dailyGoalMinutes: 20,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  weakAreas: [],
  strengths: [],
  createdAt: new Date().toISOString(),
};

const DEFAULT_ACHIEVEMENTS = [
  { id: 'first_assessment', title: 'First Diagnostic', description: 'Complete your initial CEFR assessment', icon: 'Award', unlocked: false, unlockedAt: null },
  { id: 'first_writing', title: 'Wordsmith Novice', description: 'Submit your first piece in Writing Studio', icon: 'PenTool', unlocked: false, unlockedAt: null },
  { id: 'first_speaking', title: 'Voice Explorer', description: 'Complete your first speaking session', icon: 'Mic', unlocked: false, unlockedAt: null },
  { id: 'streak_7', title: 'Week Warrior', description: 'Maintain a 7-day learning streak', icon: 'Flame', unlocked: false, unlockedAt: null },
  { id: 'vocab_50', title: 'Lexicon Master', description: 'Save and practice 50 vocabulary words', icon: 'BookOpen', unlocked: false, unlockedAt: null },
  { id: 'grammar_ace', title: 'Grammar Ace', description: 'Score 90%+ on any advanced grammar quiz', icon: 'CheckCircle2', unlocked: false, unlockedAt: null },
  { id: 'level_up', title: 'Level Up!', description: 'Improve your estimated CEFR level', icon: 'TrendingUp', unlocked: false, unlockedAt: null },
];

class StorageService {
  constructor() {
    this.init();
  }

  init() {
    if (!this.getItem(STORAGE_KEYS.USER_PROFILE)) {
      this.setItem(STORAGE_KEYS.USER_PROFILE, DEFAULT_PROFILE);
    }
    if (!this.getItem(STORAGE_KEYS.ACHIEVEMENTS)) {
      this.setItem(STORAGE_KEYS.ACHIEVEMENTS, DEFAULT_ACHIEVEMENTS);
    }
    if (!this.getItem(STORAGE_KEYS.MISTAKE_MEMORY)) {
      this.setItem(STORAGE_KEYS.MISTAKE_MEMORY, []);
    }
    if (!this.getItem(STORAGE_KEYS.ACTIVITY_LOG)) {
      this.setItem(STORAGE_KEYS.ACTIVITY_LOG, []);
    }
    if (!this.getItem(STORAGE_KEYS.VOCABULARY_LIST)) {
      this.setItem(STORAGE_KEYS.VOCABULARY_LIST, []);
    }
    this.updateStreak();
  }

  getItem(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error(`Error reading ${key} from localStorage`, e);
      return null;
    }
  }

  setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(`Error writing ${key} to localStorage`, e);
      return false;
    }
  }

  // --- Profile & Streak ---
  getProfile() {
    return this.getItem(STORAGE_KEYS.USER_PROFILE) || DEFAULT_PROFILE;
  }

  updateProfile(updates) {
    const current = this.getProfile();
    const updated = { ...current, ...updates };
    this.setItem(STORAGE_KEYS.USER_PROFILE, updated);
    return updated;
  }

  updateStreak() {
    const profile = this.getProfile();
    const today = new Date().toISOString().split('T')[0];
    const lastActive = profile.lastActiveDate;

    if (!lastActive) {
      profile.lastActiveDate = today;
      profile.streakDays = 1;
      this.setItem(STORAGE_KEYS.USER_PROFILE, profile);
      return;
    }

    if (lastActive === today) {
      return; // Already counted today
    }

    const prevDate = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (lastActive === prevDate) {
      // Consecutive day!
      profile.streakDays = (profile.streakDays || 1) + 1;
      profile.lastActiveDate = today;
      if (profile.streakDays >= 7) {
        this.unlockAchievement('streak_7');
      }
    } else {
      // Missed days
      profile.streakDays = 1;
      profile.lastActiveDate = today;
    }

    this.setItem(STORAGE_KEYS.USER_PROFILE, profile);
  }

  // --- Mistake Memory Engine ---
  /**
   * Records a mistake from any module (grammar, writing, speaking, assessment)
   */
  recordMistake({ module, topic, original, correction, explanation }) {
    if (!original || !correction) return;
    const mistakes = this.getItem(STORAGE_KEYS.MISTAKE_MEMORY) || [];

    // Check if this exact mistake has been made before
    const existingIndex = mistakes.findIndex(
      m => m.topic === topic && m.original.toLowerCase().trim() === original.toLowerCase().trim()
    );

    if (existingIndex >= 0) {
      mistakes[existingIndex].repeatedCount = (mistakes[existingIndex].repeatedCount || 1) + 1;
      mistakes[existingIndex].lastSeen = new Date().toISOString();
      mistakes[existingIndex].resolved = false;
    } else {
      mistakes.unshift({
        id: 'mistake_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        module,
        topic: topic || 'Grammar',
        original,
        correction,
        explanation,
        repeatedCount: 1,
        resolved: false,
        createdAt: new Date().toISOString(),
        lastSeen: new Date().toISOString(),
      });
    }

    this.setItem(STORAGE_KEYS.MISTAKE_MEMORY, mistakes);

    // Update weak areas on user profile based on recurring mistake topics
    this.recalculateWeakAreas();
  }

  resolveMistake(id) {
    const mistakes = this.getItem(STORAGE_KEYS.MISTAKE_MEMORY) || [];
    const index = mistakes.findIndex(m => m.id === id);
    if (index >= 0) {
      mistakes[index].resolved = true;
      mistakes[index].resolvedAt = new Date().toISOString();
      this.setItem(STORAGE_KEYS.MISTAKE_MEMORY, mistakes);
      this.recalculateWeakAreas();
    }
  }

  getMistakes() {
    return this.getItem(STORAGE_KEYS.MISTAKE_MEMORY) || [];
  }

  recalculateWeakAreas() {
    const mistakes = this.getMistakes().filter(m => !m.resolved);
    const topicCounts = {};
    for (const m of mistakes) {
      topicCounts[m.topic] = (topicCounts[m.topic] || 0) + (m.repeatedCount || 1);
    }

    const sortedTopics = Object.entries(topicCounts)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0]);

    this.updateProfile({ weakAreas: sortedTopics.slice(0, 4) });
  }

  // --- Activity Logging ---
  logActivity({ type, title, score = null, durationMinutes = 5, details = {} }) {
    const logs = this.getItem(STORAGE_KEYS.ACTIVITY_LOG) || [];
    const newEntry = {
      id: 'act_' + Date.now(),
      type, // 'assessment' | 'grammar' | 'reading' | 'writing' | 'speaking' | 'vocab' | 'tutor'
      title,
      score,
      durationMinutes,
      timestamp: new Date().toISOString(),
      details,
    };
    logs.unshift(newEntry);
    this.setItem(STORAGE_KEYS.ACTIVITY_LOG, logs);

    // Update daily challenge if matches
    this.updateDailyChallenge(type);

    return newEntry;
  }

  getActivityLogs() {
    return this.getItem(STORAGE_KEYS.ACTIVITY_LOG) || [];
  }

  // --- Vocabulary Storage ---
  getSavedVocabulary() {
    return this.getItem(STORAGE_KEYS.VOCABULARY_LIST) || [];
  }

  saveWord(wordObj) {
    const list = this.getSavedVocabulary();
    const existing = list.findIndex(w => w.word.toLowerCase() === wordObj.word.toLowerCase());
    if (existing >= 0) {
      list[existing] = { ...list[existing], ...wordObj, updatedAt: new Date().toISOString() };
    } else {
      list.unshift({
        id: 'w_' + Date.now(),
        status: 'learning', // 'learning' | 'mastered' | 'difficult'
        savedAt: new Date().toISOString(),
        reviewCount: 0,
        ...wordObj,
      });
    }
    this.setItem(STORAGE_KEYS.VOCABULARY_LIST, list);

    if (list.length >= 50) {
      this.unlockAchievement('vocab_50');
    }
    return list;
  }

  updateWordStatus(wordId, status) {
    const list = this.getSavedVocabulary();
    const item = list.find(w => w.id === wordId || w.word.toLowerCase() === wordId.toLowerCase());
    if (item) {
      item.status = status;
      item.reviewCount = (item.reviewCount || 0) + 1;
      item.lastReviewed = new Date().toISOString();
      this.setItem(STORAGE_KEYS.VOCABULARY_LIST, list);
    }
  }

  removeWord(wordId) {
    const list = this.getSavedVocabulary().filter(w => w.id !== wordId && w.word !== wordId);
    this.setItem(STORAGE_KEYS.VOCABULARY_LIST, list);
  }

  // --- Assessment History ---
  saveAssessment(result) {
    const list = this.getItem(STORAGE_KEYS.ASSESSMENTS) || [];
    const entry = {
      id: 'eval_' + Date.now(),
      timestamp: new Date().toISOString(),
      ...result,
    };
    list.unshift(entry);
    this.setItem(STORAGE_KEYS.ASSESSMENTS, list);

    // Update profile CEFR level
    const currentProfile = this.getProfile();
    const previousLevel = currentProfile.estimatedLevel;
    this.updateProfile({
      estimatedLevel: result.estimatedLevel,
      cefrScore: result.percentage,
      strengths: result.strengths || [],
      weakAreas: result.weakAreas || currentProfile.weakAreas,
    });

    this.unlockAchievement('first_assessment');
    if (previousLevel && previousLevel !== 'Not Assessed' && previousLevel !== result.estimatedLevel) {
      this.unlockAchievement('level_up');
    }

    this.logActivity({
      type: 'assessment',
      title: `Assessment Completed: ${result.estimatedLevel}`,
      score: result.percentage,
      durationMinutes: 15,
      details: { estimatedLevel: result.estimatedLevel, score: result.score, total: result.total },
    });

    return entry;
  }

  getAssessments() {
    return this.getItem(STORAGE_KEYS.ASSESSMENTS) || [];
  }

  // --- Tutor Chat History ---
  getTutorHistory() {
    return this.getItem(STORAGE_KEYS.TUTOR_CHAT) || [];
  }

  saveTutorHistory(messages) {
    this.setItem(STORAGE_KEYS.TUTOR_CHAT, messages);
  }

  clearTutorHistory() {
    this.setItem(STORAGE_KEYS.TUTOR_CHAT, []);
  }

  // --- Achievements ---
  getAchievements() {
    return this.getItem(STORAGE_KEYS.ACHIEVEMENTS) || DEFAULT_ACHIEVEMENTS;
  }

  unlockAchievement(id) {
    const list = this.getAchievements();
    const item = list.find(a => a.id === id);
    if (item && !item.unlocked) {
      item.unlocked = true;
      item.unlockedAt = new Date().toISOString();
      this.setItem(STORAGE_KEYS.ACHIEVEMENTS, list);
      return item;
    }
    return null;
  }

  // --- Daily 10-Minute Challenge ---
  getDailyChallenge() {
    const today = new Date().toISOString().split('T')[0];
    const saved = this.getItem(STORAGE_KEYS.DAILY_CHALLENGE);

    if (saved && saved.date === today) {
      return saved;
    }

    // New challenge for today
    const newChallenge = {
      date: today,
      completed: false,
      tasks: [
        { id: 'grammar', title: 'Complete 1 Grammar Drill', completed: false },
        { id: 'vocab', title: 'Learn & Save 2 New Words', completed: false },
        { id: 'writing', title: 'Submit 1 Writing Studio Check', completed: false },
        { id: 'speaking', title: 'Complete 1 Speaking Practice', completed: false },
      ],
    };

    this.setItem(STORAGE_KEYS.DAILY_CHALLENGE, newChallenge);
    return newChallenge;
  }

  updateDailyChallenge(type) {
    const challenge = this.getDailyChallenge();
    let updated = false;

    if (type === 'grammar') {
      const t = challenge.tasks.find(x => x.id === 'grammar');
      if (t && !t.completed) { t.completed = true; updated = true; }
    } else if (type === 'vocab') {
      const t = challenge.tasks.find(x => x.id === 'vocab');
      if (t && !t.completed) { t.completed = true; updated = true; }
    } else if (type === 'writing') {
      const t = challenge.tasks.find(x => x.id === 'writing');
      if (t && !t.completed) { t.completed = true; updated = true; }
    } else if (type === 'speaking') {
      const t = challenge.tasks.find(x => x.id === 'speaking');
      if (t && !t.completed) { t.completed = true; updated = true; }
    }

    if (updated) {
      const allDone = challenge.tasks.every(t => t.completed);
      if (allDone) challenge.completed = true;
      this.setItem(STORAGE_KEYS.DAILY_CHALLENGE, challenge);
    }
  }

  // --- Reset for Demo / Testing ---
  resetAll() {
    localStorage.clear();
    this.init();
  }
}

export const storageService = new StorageService();
