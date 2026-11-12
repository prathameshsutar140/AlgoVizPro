import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Zap,
  Cpu,
  Layers,
  ArrowRight,
  GitBranch,
  Table,
  Check,
  X,
  FileQuestion,
  ExternalLink,
} from 'lucide-react';
import { AlgorithmId } from '../../types';
import { ALGORITHMS_DATA } from '../../data/algorithmsData';

interface AlgorithmLearnViewProps {
  initialAlgorithm?: AlgorithmId;
  onVisualize?: (algoId: AlgorithmId) => void;
  onViewCode?: (algoId: AlgorithmId) => void;
}

export const AlgorithmLearnView: React.FC<AlgorithmLearnViewProps> = ({
  initialAlgorithm = 'bubble',
  onVisualize,
  onViewCode,
}) => {
  const [selectedAlgo, setSelectedAlgo] = useState<AlgorithmId>(initialAlgorithm);
  const [activeTab, setActiveTab] = useState<'concepts' | 'flowchart' | 'complexity' | 'viva'>('concepts');

  const algo = ALGORITHMS_DATA[selectedAlgo];

  return (
    <div className="space-y-6">
      {/* Algorithm Header Banner */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {algo.level} Level
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                algo.stability ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {algo.stability ? 'Stable' : 'Unstable'}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                algo.inPlace ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
              }`}>
                {algo.inPlace ? 'In-Place O(1)' : 'Out-of-Place'}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                algo.adaptive ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' : 'bg-slate-700/40 text-slate-400 border border-slate-600/30'
              }`}>
                {algo.adaptive ? 'Adaptive' : 'Non-Adaptive'}
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white font-['Plus_Jakarta_Sans']">{algo.name}</h1>
            <p className="text-slate-300 text-sm mt-1 max-w-3xl">{algo.shortDescription}</p>
          </div>

          <div className="flex items-center space-x-2">
            {onVisualize && (
              <button
                onClick={() => onVisualize(selectedAlgo)}
                className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/25 transition"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Open Visualizer</span>
              </button>
            )}
            {onViewCode && (
              <button
                onClick={() => onViewCode(selectedAlgo)}
                className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-200 text-xs font-semibold transition"
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>View Source Code</span>
              </button>
            )}
          </div>
        </div>

        {/* Algorithm Quick Switcher */}
        <div className="mt-5 pt-4 border-t border-slate-800">
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(ALGORITHMS_DATA) as AlgorithmId[]).map((id) => (
              <button
                key={id}
                onClick={() => setSelectedAlgo(id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  selectedAlgo === id
                    ? 'bg-indigo-600 text-white shadow-sm ring-1 ring-cyan-400/50'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {ALGORITHMS_DATA[id].name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
        {[
          { id: 'concepts', label: 'Theory & Principles', icon: BookOpen },
          { id: 'flowchart', label: 'Flowchart & Steps', icon: GitBranch },
          { id: 'complexity', label: 'Complexity Analysis', icon: Table },
          { id: 'viva', label: 'MSBTE Viva & Exams', icon: FileQuestion },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT 1: CONCEPTS & THEORY */}
      {activeTab === 'concepts' && (
        <div className="space-y-6">
          {/* Definition & Working Principle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>Formal Definition</span>
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">{algo.definition}</p>
            </div>

            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Working Principle</span>
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">{algo.workingPrinciple}</p>
            </div>
          </div>

          {/* Real-World Analogy */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-gradient-to-r from-indigo-950/40 to-slate-900/60">
            <h3 className="text-base font-bold text-cyan-300 flex items-center space-x-2 mb-2">
              <ExternalLink className="w-4 h-4" />
              <span>Real-World Intuitive Analogy</span>
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed">{algo.realWorldAnalogy}</p>
          </div>

          {/* Advantages & Disadvantages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-emerald-400 flex items-center space-x-2">
                <Check className="w-5 h-5" />
                <span>Advantages</span>
              </h3>
              <ul className="space-y-2">
                {algo.advantages.map((adv, i) => (
                  <li key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-rose-400 flex items-center space-x-2">
                <X className="w-5 h-5" />
                <span>Disadvantages</span>
              </h3>
              <ul className="space-y-2">
                {algo.disadvantages.map((dis, i) => (
                  <li key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                    <span>{dis}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Real-world Systems Applications */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Real-World Software Systems Applications</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {algo.applications.map((app, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                  <span className="text-cyan-400 font-bold block mb-1">Application #{i + 1}</span>
                  {app}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: FLOWCHART & LOGIC */}
      {activeTab === 'flowchart' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-2xl p-6 border border-slate-800">
            <h3 className="text-base font-bold text-white mb-4 flex items-center space-x-2">
              <GitBranch className="w-4 h-4 text-cyan-400" />
              <span>Algorithmic Execution Flowchart</span>
            </h3>

            {/* Interactive Flowchart Diagram */}
            <div className="space-y-3 max-w-2xl mx-auto py-4">
              {algo.flowchartSteps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 shadow-md hover:border-indigo-500/60 transition group text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-300 text-xs font-bold flex items-center justify-center border border-indigo-500/40">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-white text-sm">{step.step}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{step.detail}</p>
                  </div>
                  {idx < algo.flowchartSteps.length - 1 && (
                    <div className="flex flex-col items-center my-1">
                      <div className="w-0.5 h-6 bg-indigo-500/50" />
                      <div className="w-2 h-2 rotate-45 border-b-2 border-r-2 border-indigo-400 -mt-1.5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: COMPLEXITY ANALYSIS */}
      {activeTab === 'complexity' && (
        <div className="space-y-6">
          {/* Complexity Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-panel rounded-2xl p-5 border border-slate-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Best Case Time</span>
              <div className="text-3xl font-extrabold text-white font-mono mt-1">{algo.timeComplexity.best}</div>
              <p className="text-[11px] text-slate-400 mt-2">Optimal conditions (e.g. pre-sorted)</p>
            </div>

            <div className="glass-panel rounded-2xl p-5 border border-slate-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">Average Case Time</span>
              <div className="text-3xl font-extrabold text-white font-mono mt-1">{algo.timeComplexity.average}</div>
              <p className="text-[11px] text-slate-400 mt-2">Expected random distribution</p>
            </div>

            <div className="glass-panel rounded-2xl p-5 border border-slate-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">Worst Case Time</span>
              <div className="text-3xl font-extrabold text-white font-mono mt-1">{algo.timeComplexity.worst}</div>
              <p className="text-[11px] text-slate-400 mt-2">Worst adversarial order</p>
            </div>

            <div className="glass-panel rounded-2xl p-5 border border-slate-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">Space Complexity</span>
              <div className="text-3xl font-extrabold text-white font-mono mt-1">{algo.spaceComplexity.complexity}</div>
              <p className="text-[11px] text-slate-400 mt-2">Auxiliary memory required</p>
            </div>
          </div>

          {/* Mathematical Proof & Reasoning */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Table className="w-4 h-4 text-cyan-400" />
              <span>Mathematical Reasoning & Asymptotic Proof</span>
            </h3>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              <strong className="text-cyan-300 block mb-1">Time Analysis:</strong>
              {algo.timeComplexity.reasoning}
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              <strong className="text-indigo-300 block mb-1">Auxiliary Space Analysis:</strong>
              {algo.spaceComplexity.reasoning}
            </div>
          </div>

          {/* Properties Comparison Matrix */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800">
            <h3 className="text-base font-bold text-white mb-3">Algorithmic Properties Classification</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <span className="font-bold text-white block mb-1">Stability: {algo.stability ? 'STABLE' : 'UNSTABLE'}</span>
                <p className="text-slate-400">{algo.stabilityExplanation}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <span className="font-bold text-white block mb-1">In-Place: {algo.inPlace ? 'IN-PLACE' : 'OUT-OF-PLACE'}</span>
                <p className="text-slate-400">
                  {algo.inPlace
                    ? 'Sorts the elements without requiring additional auxiliary arrays (O(1) extra RAM).'
                    : 'Requires auxiliary buffer or extra memory allocations proportional to N.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <span className="font-bold text-white block mb-1">Adaptive: {algo.adaptive ? 'ADAPTIVE' : 'NON-ADAPTIVE'}</span>
                <p className="text-slate-400">
                  {algo.adaptive
                    ? 'Runs substantially faster when input elements are already partially sorted.'
                    : 'Execution time remains identical regardless of initial array ordering.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: MSBTE VIVA & EXAMINATION QUESTIONS */}
      {activeTab === 'viva' && (
        <div className="space-y-4">
          <div className="glass-panel rounded-2xl p-6 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <FileQuestion className="w-5 h-5 text-indigo-400" />
                  <span>Important Examination & Viva Voce Questions</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Frequently asked questions in MSBTE Diploma (22317 - DSA) & University Engineering Oral Exams
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
                {algo.vivaQuestions.length} Model Answers
              </span>
            </div>

            <div className="space-y-4">
              {algo.vivaQuestions.map((vq, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-cyan-300 font-sans">
                      Q{idx + 1}. {vq.question}
                    </span>
                    <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                      vq.difficulty === 'Easy'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : vq.difficulty === 'Medium'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      {vq.difficulty}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-200 leading-relaxed">
                    <strong className="text-slate-400 block mb-0.5">Model Viva Answer:</strong>
                    {vq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
