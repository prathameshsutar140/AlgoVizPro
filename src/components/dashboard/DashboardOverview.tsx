import React, { useState, useEffect } from 'react';
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
  ArrowRight,
  Flame,
  CheckCircle2,
  Play,
  RotateCcw,
  Zap,
  TrendingUp,
} from 'lucide-react';
import { AlgorithmId, UserProfile } from '../../types';
import { ALGORITHMS_DATA } from '../../data/algorithmsData';

interface DashboardOverviewProps {
  userProfile: UserProfile;
  onNavigateTab: (tab: any, algoId?: AlgorithmId) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  userProfile,
  onNavigateTab,
}) => {
  // Mini interactive animated array in hero
  const [heroArray, setHeroArray] = useState<number[]>([45, 12, 85, 32, 89, 21, 65, 9, 74, 53, 38]);
  const [comparingPair, setComparingPair] = useState<[number, number] | null>(null);

  // Auto step hero animation
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroArray((prev) => {
        const arr = [...prev];
        const i = Math.floor(Math.random() * (arr.length - 1));
        setComparingPair([i, i + 1]);
        if (arr[i] > arr[i + 1]) {
          const temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
        }
        return arr;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const totalAlgorithms = Object.keys(ALGORITHMS_DATA).length;
  const studiedCount = userProfile.studiedAlgorithms.length;
  const practicalsCount = userProfile.completedPracticals.length;
  const challengesCount = userProfile.completedChallenges.length;

  // Average quiz score
  const quizAvg =
    userProfile.completedQuizzes.length > 0
      ? Math.round(
          (userProfile.completedQuizzes.reduce((acc, q) => acc + (q.score / (q.total || 1)) * 100, 0) /
            userProfile.completedQuizzes.length)
        )
      : 85;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 p-6 sm:p-10 shadow-2xl">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Next-Gen Computer Science Algorithm Platform</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans'] leading-tight">
              Master Sorting Algorithms <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-violet-400">
                Visually, Empirically & in Code
              </span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
              Engineered for MSBTE Diploma & Engineering students. Experience step-by-step genuine algorithm execution, multi-language code line analysis, side-by-side benchmark labs, and AI exam coaching.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigateTab('visualizer', 'quick')}
                className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition active:scale-95"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Launch Visualizer</span>
              </button>

              <button
                onClick={() => onNavigateTab('comparison')}
                className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-200 font-semibold text-xs transition"
              >
                <Scale className="w-4 h-4 text-cyan-400" />
                <span>Compare Algorithms</span>
              </button>

              <button
                onClick={() => onNavigateTab('practicals')}
                className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-200 font-semibold text-xs transition"
              >
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Lab Practicals (22317)</span>
              </button>
            </div>
          </div>

          {/* Interactive Hero Visualizer Mini Card */}
          <div className="lg:w-80 glass-panel rounded-2xl p-5 border border-slate-700 shadow-xl space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
              <span className="font-bold text-white flex items-center space-x-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Live Hero Simulation</span>
              </span>
              <span className="text-cyan-400 font-mono text-[11px] animate-pulse">Running</span>
            </div>

            <div className="flex items-end justify-center h-32 gap-1.5 pt-2">
              {heroArray.map((val, idx) => {
                const isCmp = comparingPair && (comparingPair[0] === idx || comparingPair[1] === idx);
                const height = Math.round((val / 100) * 100);
                return (
                  <div
                    key={idx}
                    style={{ height: `${height}%` }}
                    className={`flex-1 rounded-t border transition-all duration-300 ${
                      isCmp
                        ? 'bg-amber-400 border-amber-300 shadow-md shadow-amber-400/50'
                        : 'bg-indigo-600/70 border-indigo-500/50'
                    }`}
                  />
                );
              })}
            </div>

            <p className="text-[11px] text-slate-400 text-center italic">
              Live sorting micro-swaps executing in real time
            </p>
          </div>
        </div>
      </div>

      {/* Real Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Mastered Algorithms</span>
            <BookOpen className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {studiedCount} <span className="text-sm font-normal text-slate-500">/ {totalAlgorithms}</span>
          </div>
          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-2">
            <div
              style={{ width: `${(studiedCount / totalAlgorithms) * 100}%` }}
              className="h-full bg-cyan-400 rounded-full"
            />
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Completed Practicals</span>
            <FileText className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {practicalsCount} <span className="text-sm font-normal text-slate-500">/ 5</span>
          </div>
          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-2">
            <div
              style={{ width: `${(practicalsCount / 5) * 100}%` }}
              className="h-full bg-indigo-500 rounded-full"
            />
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Quiz Performance</span>
            <HelpCircle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono">
            {quizAvg}%
          </div>
          <p className="text-[11px] text-slate-400">Verified DSA question bank</p>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Study Streak & Points</span>
            <Flame className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono flex items-center space-x-2">
            <span className="text-rose-400">{userProfile.streakDays}d</span>
            <span className="text-sm font-normal text-slate-500">•</span>
            <span className="text-emerald-400">{userProfile.points} pts</span>
          </div>
          <p className="text-[11px] text-slate-400">Keep daily momentum active</p>
        </div>
      </div>

      {/* Daily Challenge & Recommended Algorithms */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Daily Challenge Banner */}
        <div className="lg:col-span-6 glass-panel rounded-2xl p-6 border border-slate-800 space-y-4 bg-gradient-to-br from-slate-900 to-indigo-950/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">Daily Algorithm Quest</h3>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
              +150 Points
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            <strong>Today's Challenge:</strong> Predict the next array state after inserting key 19 into sorted prefix [14, 28, 45]. Test your understanding of shifting logic!
          </p>

          <button
            onClick={() => onNavigateTab('challenges')}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
          >
            <span>Solve Daily Quest</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Access to Algorithms */}
        <div className="lg:col-span-6 glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Recommended for You</h3>
            <span className="text-xs text-slate-400">Diploma Syllabus Order</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            {[
              { id: 'bubble', name: 'Bubble Sort', level: 'Beginner', time: 'O(n²)' },
              { id: 'insertion', name: 'Insertion Sort', level: 'Beginner', time: 'O(n²)' },
              { id: 'merge', name: 'Merge Sort', level: 'Intermediate', time: 'O(n log n)' },
              { id: 'quick', name: 'Quick Sort', level: 'Intermediate', time: 'O(n log n)' },
            ].map((algo) => (
              <div
                key={algo.id}
                onClick={() => onNavigateTab('visualizer', algo.id as AlgorithmId)}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white group-hover:text-cyan-300 transition">
                    {algo.name}
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition" />
                </div>
                <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400">
                  <span>{algo.level}</span>
                  <span className="font-mono text-cyan-400">{algo.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
