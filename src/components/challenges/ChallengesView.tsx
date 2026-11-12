import React, { useState } from 'react';
import {
  Trophy,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Lightbulb,
  Sparkles,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CHALLENGES_DATA } from '../../data/challengesData';
import { Challenge } from '../../types';

interface ChallengesViewProps {
  completedChallenges: string[];
  onCompleteChallenge: (challengeId: string, points: number) => void;
}

export const ChallengesView: React.FC<ChallengesViewProps> = ({
  completedChallenges,
  onCompleteChallenge,
}) => {
  const [activeChallengeId, setActiveChallengeId] = useState<string>('ch-1');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  const challenge: Challenge =
    CHALLENGES_DATA.find((c) => c.id === activeChallengeId) || CHALLENGES_DATA[0];
  const isAlreadyDone = completedChallenges.includes(challenge.id);

  const handleSelectOption = (opt: string) => {
    setSelectedOption(opt);
    setFeedback(null);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    const isCorrect = selectedOption === challenge.data.correctAnswer;
    if (isCorrect) {
      setFeedback({
        isCorrect: true,
        message: `Outstanding! Correct answer. You earned +${challenge.points} points!`,
      });
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch {
        // Safe fallback
      }
      onCompleteChallenge(challenge.id, challenge.points);
    } else {
      setFeedback({
        isCorrect: false,
        message: 'Incorrect choice. Review the clue, check the hint, and try again!',
      });
    }
  };

  const handleResetChallenge = () => {
    setSelectedOption(null);
    setFeedback(null);
    setShowHint(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Gamified Challenge Quests
              </span>
              <span className="text-slate-400 text-xs">Algorithm Puzzles</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-['Plus_Jakarta_Sans']">
              Algorithm Mastery Challenges
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              Solve detective puzzles, identify mystery algorithms from state traces, catch dangerous code bugs, and earn DSA points.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Completed Quests</span>
              <span className="text-lg font-bold text-cyan-400 font-mono">
                {completedChallenges.length} / {CHALLENGES_DATA.length}
              </span>
            </div>
          </div>
        </div>

        {/* Challenge Selection Cards */}
        <div className="mt-5 pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {CHALLENGES_DATA.map((ch) => {
            const isSelected = ch.id === challenge.id;
            const isDone = completedChallenges.includes(ch.id);
            return (
              <button
                key={ch.id}
                onClick={() => {
                  setActiveChallengeId(ch.id);
                  handleResetChallenge();
                }}
                className={`p-3.5 rounded-xl border text-left transition ${
                  isSelected
                    ? 'bg-indigo-600/20 border-cyan-400 shadow-md ring-1 ring-cyan-400/50'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    ch.level === 'Beginner'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : ch.level === 'Intermediate'
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {ch.level}
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-400">+{ch.points} pts</span>
                </div>
                <div className="font-semibold text-white text-xs line-clamp-1">{ch.title}</div>
                {isDone && (
                  <span className="text-[10px] font-bold text-emerald-400 mt-1 inline-flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Completed</span>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Challenge Stage */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              {challenge.type.toUpperCase()} CHALLENGE
            </span>
            <h2 className="text-xl font-bold text-white mt-0.5">{challenge.title}</h2>
          </div>
          <span className="text-sm font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/30">
            +{challenge.points} Points
          </span>
        </div>

        {/* Challenge Description */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-line">
          {challenge.description}
        </div>

        {/* Options */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Select Your Solution:
          </label>
          <div className="space-y-2">
            {challenge.data.options.map((opt: string, idx: number) => {
              const isSelected = selectedOption === opt;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelectOption(opt)}
                  className={`p-3.5 rounded-xl border cursor-pointer text-xs sm:text-sm font-medium transition ${
                    isSelected
                      ? 'bg-indigo-600/30 border-cyan-400 text-white ring-1 ring-cyan-400/50'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono border ${
                        isSelected
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span>{opt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`p-4 rounded-xl text-xs sm:text-sm flex items-center space-x-2 font-medium ${
              feedback.isCorrect
                ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                : 'bg-rose-500/20 border border-rose-500/40 text-rose-300'
            }`}
          >
            {feedback.isCorrect ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <XCircle className="w-5 h-5 shrink-0" />}
            <span>{feedback.message}</span>
          </div>
        )}

        {/* Hint Box */}
        {showHint && (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start space-x-2">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold mb-0.5">Professor Hint:</strong>
              {challenge.hint}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-300 text-xs transition"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>{showHint ? 'Hide Clue' : 'Need a Clue?'}</span>
          </button>

          <button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 disabled:opacity-40 text-white font-bold text-xs shadow-md transition"
          >
            <span>Verify Answer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
