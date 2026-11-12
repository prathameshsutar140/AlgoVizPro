import React from 'react';
import {
  Sparkles,
  BarChart3,
  BookOpen,
  Code2,
  Terminal,
  Scale,
  Briefcase,
  FileText,
  HelpCircle,
  Trophy,
  Volume2,
  VolumeX,
  Search,
  User,
  Settings,
  Flame,
} from 'lucide-react';
import { soundController } from '../../utils/audio';

export type ActiveTab =
  | 'dashboard'
  | 'visualizer'
  | 'learn'
  | 'code-studio'
  | 'playground'
  | 'comparison'
  | 'real-world'
  | 'practicals'
  | 'quiz'
  | 'challenges';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  openAiAssistant: () => void;
  openSearch: () => void;
  openProfile: () => void;
  openSettings: () => void;
  studentPoints: number;
  streakDays: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  soundEnabled,
  setSoundEnabled,
  openAiAssistant,
  openSearch,
  openProfile,
  openSettings,
  studentPoints,
  streakDays,
}) => {
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundController.setEnabled(next);
    if (next) {
      soundController.playTone(70, 0, 100, 'compare');
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'visualizer', label: 'Visualizer', icon: BarChart3 },
    { id: 'learn', label: 'Learn & Viva', icon: BookOpen },
    { id: 'code-studio', label: 'Code Studio', icon: Code2 },
    { id: 'playground', label: 'Playground', icon: Terminal },
    { id: 'comparison', label: 'Compare Lab', icon: Scale },
    { id: 'real-world', label: 'Real-World', icon: Briefcase },
    { id: 'practicals', label: 'Practicals', icon: FileText },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle },
    { id: 'challenges', label: 'Challenges', icon: Trophy },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300 text-lg tracking-tight">AV</span>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold tracking-tight text-white font-['Plus_Jakarta_Sans']">
                  AlgoViz <span className="text-cyan-400">Pro</span>
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  MSBTE & DSA
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Interactive Algorithm Engineering Platform</p>
            </div>
          </div>

          {/* Quick Search & AI Assistant & User Status */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Trigger */}
            <button
              onClick={openSearch}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-xs transition"
              title="Global Search (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Quick Search...</span>
              <kbd className="hidden md:inline px-1 py-0.2 rounded bg-slate-800 text-[10px] text-slate-400">⌘K</kbd>
            </button>

            {/* Streak & Points Indicator */}
            <div className="hidden sm:flex items-center space-x-2 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800/80 text-xs">
              <div className="flex items-center text-amber-400 font-semibold space-x-1" title="Daily Learning Streak">
                <Flame className="w-3.5 h-3.5 fill-amber-400/20" />
                <span>{streakDays}d</span>
              </div>
              <div className="w-px h-3 bg-slate-800" />
              <div className="flex items-center text-emerald-400 font-semibold space-x-1" title="DSA Mastery Points">
                <Trophy className="w-3.5 h-3.5" />
                <span>{studentPoints} pts</span>
              </div>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-lg border text-xs transition ${
                soundEnabled
                  ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title={soundEnabled ? 'Mute sound effects' : 'Enable sorting audio synthesizer'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* AlgoBuddy AI Button */}
            <button
              onClick={openAiAssistant}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-medium text-xs shadow-md shadow-indigo-600/25 transition active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
              <span className="font-semibold">AlgoBuddy AI</span>
            </button>

            {/* Settings */}
            <button
              onClick={openSettings}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-xs transition"
              title="Platform Settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Student Profile */}
            <button
              onClick={openProfile}
              className="flex items-center space-x-1.5 p-1.5 sm:px-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs transition"
              title="Student Profile"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-[10px] font-bold text-white">
                <User className="w-3.5 h-3.5" />
              </div>
              <span className="hidden lg:inline text-xs font-medium text-slate-300">My Profile</span>
            </button>
          </div>
        </div>

        {/* Horizontal Navigation Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-900">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as ActiveTab)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm shadow-indigo-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
