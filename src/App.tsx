import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/layout/Navbar';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { VisualizerView } from './components/visualization/VisualizerView';
import { AlgorithmLearnView } from './components/learning/AlgorithmLearnView';
import { CodeStudioView } from './components/code/CodeStudioView';
import { CodePlaygroundView } from './components/playground/CodePlaygroundView';
import { ComparisonLabView } from './components/comparison/ComparisonLabView';
import { RealWorldView } from './components/realworld/RealWorldView';
import { PracticalsView } from './components/practicals/PracticalsView';
import { QuizView } from './components/quiz/QuizView';
import { ChallengesView } from './components/challenges/ChallengesView';
import { AlgoBuddyModal } from './components/ai/AlgoBuddyModal';
import { SearchModal } from './components/modals/SearchModal';
import { ProfileModal } from './components/modals/ProfileModal';
import { SettingsModal } from './components/modals/SettingsModal';
import { AlgorithmId, UserProfile } from './types';
import { loadProfile, saveProfile, loadSettings, saveSettings, AppSettings } from './utils/storage';
import { soundController } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [selectedAlgo, setSelectedAlgo] = useState<AlgorithmId>('bubble');
  const [selectedLang, setSelectedLang] = useState<string>('c');

  // Persistence
  const [userProfile, setUserProfile] = useState<UserProfile>(loadProfile);
  const [appSettings, setAppSettings] = useState<AppSettings>(loadSettings);

  // Modals state
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Initialize audio state from settings
  useEffect(() => {
    soundController.setEnabled(appSettings.soundEnabled);
  }, [appSettings.soundEnabled]);

  // Global Ctrl+K / Cmd+K search hotkey
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSaveProfile = (newProfile: UserProfile) => {
    setUserProfile(newProfile);
    saveProfile(newProfile);
  };

  const handleSaveSettings = (newSettings: AppSettings) => {
    setAppSettings(newSettings);
    saveSettings(newSettings);
    soundController.setEnabled(newSettings.soundEnabled);
  };

  const handleToggleSound = (enabled: boolean) => {
    const updated = { ...appSettings, soundEnabled: enabled };
    setAppSettings(updated);
    saveSettings(updated);
    soundController.setEnabled(enabled);
  };

  const handleNavigateWithAlgo = (tab: ActiveTab, algoId?: AlgorithmId) => {
    setActiveTab(tab);
    if (algoId) {
      setSelectedAlgo(algoId);
    }
  };

  const handleTogglePracticalCompletion = (practicalId: string) => {
    const isCompleted = userProfile.completedPracticals.includes(practicalId);
    let updatedList: string[];
    let pointsToAdd = 0;

    if (isCompleted) {
      updatedList = userProfile.completedPracticals.filter((id) => id !== practicalId);
    } else {
      updatedList = [...userProfile.completedPracticals, practicalId];
      pointsToAdd = 50;
    }

    const updatedProfile: UserProfile = {
      ...userProfile,
      completedPracticals: updatedList,
      points: userProfile.points + pointsToAdd,
    };
    handleSaveProfile(updatedProfile);
  };

  const handleQuizCompleted = (score: number, total: number) => {
    const pointsEarned = score * 20;
    const updatedProfile: UserProfile = {
      ...userProfile,
      points: userProfile.points + pointsEarned,
      completedQuizzes: [
        ...userProfile.completedQuizzes,
        {
          quizId: `quiz-${Date.now()}`,
          score,
          total,
          date: new Date().toISOString().split('T')[0],
        },
      ],
    };
    handleSaveProfile(updatedProfile);
  };

  const handleChallengeCompleted = (challengeId: string, points: number) => {
    if (!userProfile.completedChallenges.includes(challengeId)) {
      const updatedProfile: UserProfile = {
        ...userProfile,
        completedChallenges: [...userProfile.completedChallenges, challengeId],
        points: userProfile.points + points,
      };
      handleSaveProfile(updatedProfile);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Main Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        soundEnabled={appSettings.soundEnabled}
        setSoundEnabled={handleToggleSound}
        openAiAssistant={() => setIsAiModalOpen(true)}
        openSearch={() => setIsSearchOpen(true)}
        openProfile={() => setIsProfileOpen(true)}
        openSettings={() => setIsSettingsOpen(true)}
        studentPoints={userProfile.points}
        streakDays={userProfile.streakDays}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'dashboard' && (
          <DashboardOverview
            userProfile={userProfile}
            onNavigateTab={handleNavigateWithAlgo}
          />
        )}

        {activeTab === 'visualizer' && (
          <VisualizerView
            initialAlgorithm={selectedAlgo}
            onNavigateToLearn={(id) => {
              setSelectedAlgo(id);
              setActiveTab('learn');
            }}
            onNavigateToCode={(id) => {
              setSelectedAlgo(id);
              setActiveTab('code-studio');
            }}
          />
        )}

        {activeTab === 'learn' && (
          <AlgorithmLearnView
            initialAlgorithm={selectedAlgo}
            onVisualize={(id) => {
              setSelectedAlgo(id);
              setActiveTab('visualizer');
            }}
            onViewCode={(id) => {
              setSelectedAlgo(id);
              setActiveTab('code-studio');
            }}
          />
        )}

        {activeTab === 'code-studio' && (
          <CodeStudioView
            initialAlgorithm={selectedAlgo}
            onOpenPlayground={(id, lang) => {
              setSelectedAlgo(id);
              setSelectedLang(lang);
              setActiveTab('playground');
            }}
          />
        )}

        {activeTab === 'playground' && (
          <CodePlaygroundView
            initialAlgorithm={selectedAlgo}
            initialLanguage={selectedLang}
          />
        )}

        {activeTab === 'comparison' && <ComparisonLabView />}

        {activeTab === 'real-world' && <RealWorldView />}

        {activeTab === 'practicals' && (
          <PracticalsView
            completedPracticals={userProfile.completedPracticals}
            onToggleCompletePractical={handleTogglePracticalCompletion}
          />
        )}

        {activeTab === 'quiz' && <QuizView onQuizCompleted={handleQuizCompleted} />}

        {activeTab === 'challenges' && (
          <ChallengesView
            completedChallenges={userProfile.completedChallenges}
            onCompleteChallenge={handleChallengeCompleted}
          />
        )}
      </main>

      {/* Modals & Slide-overs */}
      <AlgoBuddyModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        currentAlgorithmId={selectedAlgo}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigateWithAlgo}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={userProfile}
        onSaveProfile={handleSaveProfile}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={appSettings}
        onSaveSettings={handleSaveSettings}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-300">AlgoViz Pro</span>
            <span>•</span>
            <span>Interactive Sorting Algorithm Learning & Visualization Platform</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Aligned with MSBTE (22317) & Engineering Curriculum</span>
            <span>•</span>
            <button onClick={() => setIsAiModalOpen(true)} className="text-cyan-400 hover:underline">
              AlgoBuddy AI
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
