import React, { useState } from 'react';
import { useLearning } from './context/LearningContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import InitialAssessment from './components/InitialAssessment';
import AITutor from './components/AITutor';
import WritingStudio from './components/WritingStudio';
import SpeakingPractice from './components/SpeakingPractice';
import GrammarPractice from './components/GrammarPractice';
import ReadingComprehension from './components/ReadingComprehension';
import VocabularyBuilder from './components/VocabularyBuilder';
import ProgressAnalytics from './components/ProgressAnalytics';
import LearningHistory from './components/LearningHistory';
import ProfileSettings from './components/ProfileSettings';
import StyleCoachModal from './components/StyleCoachModal';
import DailyChallengeModal from './components/DailyChallengeModal';

export default function App() {
  const { activeTab } = useLearning();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // If user is on landing page, display the dedicated landing view
  if (activeTab === 'landing') {
    return (
      <div className="min-h-screen bg-slate-50">
        <LandingPage />
        <StyleCoachModal />
        <DailyChallengeModal />
      </div>
    );
  }

  // Render the selected module component
  const renderActiveModule = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'assessment':
        return <InitialAssessment />;
      case 'tutor':
        return <AITutor />;
      case 'writing':
        return <WritingStudio />;
      case 'speaking':
        return <SpeakingPractice />;
      case 'grammar':
        return <GrammarPractice />;
      case 'reading':
        return <ReadingComprehension />;
      case 'vocabulary':
        return <VocabularyBuilder />;
      case 'analytics':
        return <ProgressAnalytics />;
      case 'history':
        return <LearningHistory />;
      case 'settings':
        return <ProfileSettings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <Navbar onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />

      {/* Main Layout Body */}
      <div className="flex-1 flex">
        {/* Sidebar Navigation */}
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Content View Area */}
        <main className="flex-1 lg:pl-64 p-4 sm:p-6 lg:p-8 transition-all overflow-x-hidden">
          {renderActiveModule()}
        </main>
      </div>

      {/* Global Interactive Modals */}
      <StyleCoachModal />
      <DailyChallengeModal />
    </div>
  );
}
