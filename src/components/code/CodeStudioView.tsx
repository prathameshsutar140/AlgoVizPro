import React, { useState } from 'react';
import {
  Code2,
  Copy,
  Check,
  Download,
  Info,
  Terminal,
  Layers,
  ChevronRight,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { AlgorithmId } from '../../types';
import { ALGORITHMS_DATA } from '../../data/algorithmsData';

interface CodeStudioViewProps {
  initialAlgorithm?: AlgorithmId;
  onOpenPlayground?: (algoId: AlgorithmId, lang: string) => void;
}

type SupportedLanguage = 'c' | 'cpp' | 'java' | 'python' | 'typescript';

export const CodeStudioView: React.FC<CodeStudioViewProps> = ({
  initialAlgorithm = 'bubble',
  onOpenPlayground,
}) => {
  const [selectedAlgo, setSelectedAlgo] = useState<AlgorithmId>(initialAlgorithm);
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>('c');
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedLineNumber, setSelectedLineNumber] = useState<number>(1);

  const algo = ALGORITHMS_DATA[selectedAlgo];
  const codeContent = algo.codeSnippets[selectedLang] || algo.codeSnippets.c;
  const lines = codeContent.split('\n');

  const lineExplanation = algo.lineExplanations[selectedLineNumber] || {
    statement: lines[selectedLineNumber - 1] || 'Code statement',
    does: 'Executes standard algorithmic instruction according to language syntax.',
    why: 'Required for control flow or data manipulation in this sorting phase.',
    variableModified: 'Local scope variables',
    sortingEffect: 'Transitions array closer to final ascending order.',
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const extensions: Record<SupportedLanguage, string> = {
      c: 'c',
      cpp: 'cpp',
      java: 'java',
      python: 'py',
      typescript: 'ts',
    };
    const filename = `${selectedAlgo}_sort.${extensions[selectedLang]}`;
    const blob = new Blob([codeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Interactive Code Studio
              </span>
              <span className="text-slate-400 text-xs">Line-by-Line Breakdown</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-['Plus_Jakarta_Sans']">
              {algo.name} Source Implementation
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              Inspect production-quality implementations in 5 languages. Click any line number to view deep educational explanations.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-200 text-xs font-semibold transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-200 text-xs font-semibold transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
            {onOpenPlayground && (
              <button
                onClick={() => onOpenPlayground(selectedAlgo, selectedLang)}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-semibold shadow-md transition"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Open in Playground</span>
              </button>
            )}
          </div>
        </div>

        {/* Algorithm Quick Selection */}
        <div className="mt-5 pt-4 border-t border-slate-800">
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(ALGORITHMS_DATA) as AlgorithmId[]).map((id) => (
              <button
                key={id}
                onClick={() => {
                  setSelectedAlgo(id);
                  setSelectedLineNumber(1);
                }}
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

      {/* Language Switcher Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center space-x-2">
          {[
            { id: 'c', label: 'C Language (MSBTE)' },
            { id: 'cpp', label: 'C++' },
            { id: 'java', label: 'Java' },
            { id: 'python', label: 'Python 3' },
            { id: 'typescript', label: 'TypeScript' },
          ].map((lang) => (
            <button
              key={lang.id}
              onClick={() => {
                setSelectedLang(lang.id as SupportedLanguage);
                setSelectedLineNumber(1);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedLang === lang.id
                  ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-400 hidden sm:inline">
          Tip: Click any code line below for line-by-line breakdown
        </span>
      </div>

      {/* Editor & Line Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Code Viewer with Line Numbers */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-4 border border-slate-800 font-mono text-xs overflow-x-auto bg-slate-950/90 shadow-2xl">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-[11px] text-slate-400 font-sans">
            <span className="font-semibold text-slate-300">
              {selectedAlgo}_{selectedLang}.{selectedLang === 'python' ? 'py' : selectedLang}
            </span>
            <span>{lines.length} lines</span>
          </div>

          <div className="space-y-1">
            {lines.map((line, idx) => {
              const lineNo = idx + 1;
              const isSelected = selectedLineNumber === lineNo;
              return (
                <div
                  key={lineNo}
                  onClick={() => setSelectedLineNumber(lineNo)}
                  className={`flex items-start group rounded px-2 py-0.5 cursor-pointer transition ${
                    isSelected
                      ? 'bg-indigo-600/30 text-white border-l-2 border-cyan-400 font-medium'
                      : 'hover:bg-slate-900 text-slate-300'
                  }`}
                >
                  <span
                    className={`w-8 select-none text-right pr-3 shrink-0 font-mono text-[11px] ${
                      isSelected ? 'text-cyan-400 font-bold' : 'text-slate-600 group-hover:text-slate-400'
                    }`}
                  >
                    {lineNo}
                  </span>
                  <pre className="font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre">
                    {line || ' '}
                  </pre>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Line-by-Line Educational Breakdown Drawer */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Info className="w-4 h-4 text-cyan-400" />
                <span>Line #{selectedLineNumber} Explanation</span>
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Educational Mode
              </span>
            </div>

            {/* Selected Statement */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-cyan-300">
              <code>{lineExplanation.statement || lines[selectedLineNumber - 1]}</code>
            </div>

            {/* 1. What it does */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                1. What this statement does:
              </span>
              <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                {lineExplanation.does}
              </p>
            </div>

            {/* 2. Why it is required */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                2. Why it is required in {algo.name}:
              </span>
              <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                {lineExplanation.why}
              </p>
            </div>

            {/* 3. Variables Modified */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                3. Variable / Memory Modified:
              </span>
              <p className="text-xs text-amber-300 font-mono bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                {lineExplanation.variableModified}
              </p>
            </div>

            {/* 4. Effect on Sorting */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                4. Impact on Sorting Process:
              </span>
              <p className="text-xs text-emerald-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                {lineExplanation.sortingEffect}
              </p>
            </div>
          </div>

          {/* Sample I/O Card */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Sample Test Execution</h4>
            <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 space-y-1">
              <div><strong className="text-slate-500">Input:</strong> [64, 34, 25, 12, 22, 11, 90]</div>
              <div><strong className="text-emerald-400">Output:</strong> [11, 12, 22, 25, 34, 64, 90]</div>
              <div><strong className="text-cyan-400">Complexity:</strong> Time: {algo.timeComplexity.average} | Space: {algo.spaceComplexity.complexity}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
