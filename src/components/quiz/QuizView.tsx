import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  Award,
  Zap,
  Filter,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../../data/quizData';
import { QuizQuestion } from '../../types';

interface QuizViewProps {
  onQuizCompleted?: (score: number, total: number) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ onQuizCompleted }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [timedMode, setTimedMode] = useState<boolean>(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(300); // 5 min timer

  const filteredQuestions: QuizQuestion[] =
    selectedCategory === 'All'
      ? QUIZ_QUESTIONS
      : QUIZ_QUESTIONS.filter((q) => q.category === selectedCategory);

  const currentQ: QuizQuestion | undefined = filteredQuestions[currentIndex];

  // Timer loop when in timed practice mode
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timedMode && !showResults && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setShowResults(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timedMode, showResults, secondsLeft]);

  const handleSelectOption = (optIndex: number) => {
    if (showResults) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIndex]: optIndex,
    });
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const finishQuiz = () => {
    setShowResults(true);
    let calculatedScore = 0;
    filteredQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        calculatedScore++;
      }
    });

    if (calculatedScore >= filteredQuestions.length * 0.7) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Safe confetti fallback
      }
    }

    if (onQuizCompleted) {
      onQuizCompleted(calculatedScore, filteredQuestions.length);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setSecondsLeft(300);
  };

  // Calculate score
  let score = 0;
  filteredQuestions.forEach((q, idx) => {
    if (selectedAnswers[idx] === q.correctIndex) score++;
  });

  return (
    <div className="space-y-6">
      {/* Quiz Header */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                DSA Assessment Engine
              </span>
              <span className="text-slate-400 text-xs">Conceptual & Analytical Skills</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-['Plus_Jakarta_Sans']">
              Sorting Algorithms Assessment
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              Test your mastery on complexity calculations, step predictions, code analysis, and real-world system applications.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setTimedMode(!timedMode)}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                timedMode
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{timedMode ? `Timer: ${Math.floor(secondsLeft / 60)}:${(secondsLeft % 60).toString().padStart(2, '0')}` : 'Enable 5m Timer'}</span>
            </button>
            <button
              onClick={handleRestart}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 text-xs transition"
              title="Restart Quiz"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap gap-2">
          {['All', 'Concepts', 'Complexity', 'Step Prediction', 'Code Analysis', 'Real-World'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                handleRestart();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Question Card or Final Score View */}
      {!showResults && currentQ ? (
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
          {/* Question Status Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-white font-mono">
                Question {currentIndex + 1} of {filteredQuestions.length}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-cyan-400 font-medium">{currentQ.category}</span>
            </div>
            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
              currentQ.difficulty === 'Easy'
                ? 'bg-emerald-500/20 text-emerald-300'
                : currentQ.difficulty === 'Medium'
                ? 'bg-amber-500/20 text-amber-300'
                : 'bg-rose-500/20 text-rose-300'
            }`}>
              {currentQ.difficulty}
            </span>
          </div>

          {/* Question Text */}
          <h2 className="text-base sm:text-lg font-bold text-white leading-relaxed font-sans">
            {currentQ.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentIndex] === optIdx;
              return (
                <div
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`flex items-center space-x-3 p-3.5 rounded-xl border cursor-pointer transition ${
                    isSelected
                      ? 'bg-indigo-600/20 border-cyan-400 text-white ring-1 ring-cyan-400/50'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono border ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </div>
                  <span className="text-xs sm:text-sm font-medium">{opt}</span>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 disabled:opacity-40 text-slate-300 text-xs font-semibold transition"
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition"
            >
              <span>{currentIndex === filteredQuestions.length - 1 ? 'Submit & Review' : 'Next Question'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Results & Explanation Review */
        <div className="space-y-6">
          <div className="glass-panel rounded-2xl p-8 border border-slate-800 text-center space-y-4">
            <Award className="w-16 h-16 text-cyan-400 mx-auto" />
            <h2 className="text-2xl font-extrabold text-white">Quiz Completed!</h2>
            <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 font-mono">
              {score} / {filteredQuestions.length}
            </div>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              {score >= filteredQuestions.length * 0.8
                ? 'Outstanding performance! You have strong conceptual clarity on sorting algorithms.'
                : score >= filteredQuestions.length * 0.5
                ? 'Good effort! Review the detailed question explanations below to master weak areas.'
                : 'Keep practicing! Review the algorithm theory and try again to improve your score.'}
            </p>
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition"
            >
              Retake Assessment
            </button>
          </div>

          {/* Detailed Question Review with Explanations */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-6">
            <h3 className="text-base font-bold text-white">Comprehensive Answer Breakdown</h3>
            <div className="space-y-6">
              {filteredQuestions.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === q.correctIndex;
                return (
                  <div key={q.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-white">
                        {idx + 1}. {q.question}
                      </span>
                      {isCorrect ? (
                        <span className="flex items-center space-x-1 text-emerald-400 text-xs font-bold">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Correct</span>
                        </span>
                      ) : (
                        <span className="flex items-center space-x-1 text-rose-400 text-xs font-bold">
                          <XCircle className="w-4 h-4" />
                          <span>Incorrect</span>
                        </span>
                      )}
                    </div>

                    <div className="text-xs space-y-1">
                      <div className="text-slate-400">
                        Your answer: <strong className={isCorrect ? 'text-emerald-300' : 'text-rose-400'}>
                          {userAns !== undefined ? q.options[userAns] : 'Not answered'}
                        </strong>
                      </div>
                      {!isCorrect && (
                        <div className="text-emerald-400 font-semibold">
                          Correct answer: {q.options[q.correctIndex]}
                        </div>
                      )}
                    </div>

                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                      <strong className="text-cyan-300 block mb-0.5">Educational Explanation:</strong>
                      {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
