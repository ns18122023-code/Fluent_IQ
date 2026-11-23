import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { storageService } from '../services/storageService';

const LearningContext = createContext(null);

export function LearningProvider({ children }) {
  const [profile, setProfile] = useState(() => storageService.getProfile());
  const [mistakes, setMistakes] = useState(() => storageService.getMistakes());
  const [activityLogs, setActivityLogs] = useState(() => storageService.getActivityLogs());
  const [vocabulary, setVocabulary] = useState(() => storageService.getSavedVocabulary());
  const [assessments, setAssessments] = useState(() => storageService.getAssessments());
  const [achievements, setAchievements] = useState(() => storageService.getAchievements());
  const [dailyChallenge, setDailyChallenge] = useState(() => storageService.getDailyChallenge());
  const [activeTab, setActiveTab] = useState('landing'); // 'landing' | 'dashboard' | ...
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [showStyleCoachModal, setShowStyleCoachModal] = useState(false);

  // Sync state helpers
  const refreshAll = () => {
    setProfile(storageService.getProfile());
    setMistakes(storageService.getMistakes());
    setActivityLogs(storageService.getActivityLogs());
    setVocabulary(storageService.getSavedVocabulary());
    setAssessments(storageService.getAssessments());
    setAchievements(storageService.getAchievements());
    setDailyChallenge(storageService.getDailyChallenge());
  };

  const updateProfile = (updates) => {
    const updated = storageService.updateProfile(updates);
    setProfile(updated);
    return updated;
  };

  const recordMistake = (data) => {
    storageService.recordMistake(data);
    setMistakes(storageService.getMistakes());
    setProfile(storageService.getProfile());
  };

  const resolveMistake = (id) => {
    storageService.resolveMistake(id);
    setMistakes(storageService.getMistakes());
    setProfile(storageService.getProfile());
  };

  const logActivity = (data) => {
    const entry = storageService.logActivity(data);
    setActivityLogs(storageService.getActivityLogs());
    setDailyChallenge(storageService.getDailyChallenge());
    return entry;
  };

  const saveWord = (wordObj) => {
    const updated = storageService.saveWord(wordObj);
    setVocabulary([...updated]);
    setDailyChallenge(storageService.getDailyChallenge());
    setAchievements(storageService.getAchievements());
  };

  const updateWordStatus = (id, status) => {
    storageService.updateWordStatus(id, status);
    setVocabulary(storageService.getSavedVocabulary());
  };

  const removeWord = (id) => {
    storageService.removeWord(id);
    setVocabulary(storageService.getSavedVocabulary());
  };

  const saveAssessment = (result) => {
    const entry = storageService.saveAssessment(result);
    refreshAll();
    return entry;
  };

  const unlockAchievement = (id) => {
    const unlocked = storageService.unlockAchievement(id);
    if (unlocked) {
      setAchievements(storageService.getAchievements());
    }
    return unlocked;
  };

  const resetAllProgress = () => {
    storageService.resetAll();
    refreshAll();
  };

  // Dynamically compute real stats from activity logs (NEVER HARDCODED!)
  const stats = useMemo(() => {
    const totalMinutes = activityLogs.reduce((acc, log) => acc + (log.durationMinutes || 0), 0);
    const totalCompleted = activityLogs.length;

    // Skill count breakdown
    const counts = {
      grammar: 0,
      reading: 0,
      writing: 0,
      speaking: 0,
      vocab: 0,
      assessment: 0,
      tutor: 0,
    };

    const scores = {
      grammar: [],
      reading: [],
      writing: [],
      speaking: [],
    };

    activityLogs.forEach((log) => {
      if (counts[log.type] !== undefined) {
        counts[log.type] += 1;
      }
      if (log.score !== null && log.score !== undefined && scores[log.type]) {
        scores[log.type].push(log.score);
      }
    });

    // Calculate averages or default to 0 for unattempted
    const avgScore = (arr) => (arr.length > 0 ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0);

    const activeMistakes = mistakes.filter((m) => !m.resolved);
    const resolvedMistakes = mistakes.filter((m) => m.resolved);

    return {
      totalMinutes,
      totalCompleted,
      streakDays: profile.streakDays || 1,
      estimatedLevel: profile.estimatedLevel || 'Not Assessed',
      cefrScore: profile.cefrScore,
      skillCounts: counts,
      skillScores: {
        grammar: avgScore(scores.grammar),
        reading: avgScore(scores.reading),
        writing: avgScore(scores.writing),
        speaking: avgScore(scores.speaking),
      },
      wordsSaved: vocabulary.length,
      wordsMastered: vocabulary.filter((w) => w.status === 'mastered').length,
      activeMistakesCount: activeMistakes.length,
      resolvedMistakesCount: resolvedMistakes.length,
      weakAreas: profile.weakAreas || [],
      strengths: profile.strengths || [],
    };
  }, [activityLogs, mistakes, vocabulary, profile]);

  return (
    <LearningContext.Provider
      value={{
        profile,
        updateProfile,
        mistakes,
        recordMistake,
        resolveMistake,
        activityLogs,
        logActivity,
        vocabulary,
        saveWord,
        updateWordStatus,
        removeWord,
        assessments,
        saveAssessment,
        achievements,
        unlockAchievement,
        dailyChallenge,
        setDailyChallenge,
        stats,
        activeTab,
        setActiveTab,
        showChallengeModal,
        setShowChallengeModal,
        showStyleCoachModal,
        setShowStyleCoachModal,
        resetAllProgress,
        refreshAll,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
}
