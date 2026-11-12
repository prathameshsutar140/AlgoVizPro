import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  Printer,
  Copy,
  Check,
  Code,
  BookOpen,
  HelpCircle,
  Award,
  ChevronRight,
} from 'lucide-react';
import { PRACTICALS_DATA } from '../../data/practicalsData';
import { PracticalGuide } from '../../types';

interface PracticalsViewProps {
  completedPracticals: string[];
  onToggleCompletePractical: (id: string) => void;
}

export const PracticalsView: React.FC<PracticalsViewProps> = ({
  completedPracticals,
  onToggleCompletePractical,
}) => {
  const [selectedPracticalId, setSelectedPracticalId] = useState<string>('prac-1');
  const [copied, setCopied] = useState<boolean>(false);

  const practical: PracticalGuide =
    PRACTICALS_DATA.find((p) => p.id === selectedPracticalId) || PRACTICALS_DATA[0];
  const isCompleted = completedPracticals.includes(practical.id);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(practical.completeProgramC);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                MSBTE Diploma (22317) & Engineering Lab Manual
              </span>
              <span className="text-slate-400 text-xs">Curriculum Practicals</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-['Plus_Jakarta_Sans']">
              Data Structures Lab Practicals
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              Complete lab manuals, algorithms, flowcharts, C programs, sample executions, and viva voice Q&A formatted to MSBTE examination guidelines.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleCompletePractical(practical.id)}
              className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs transition ${
                isCompleted
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-slate-900 border border-slate-700 hover:border-emerald-500 text-slate-200'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? 'Marked as Completed ✓' : 'Mark as Completed'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-200 text-xs font-semibold transition"
              title="Print Lab Manual / Export as PDF"
            >
              <Printer className="w-4 h-4" />
              <span>Print Lab Manual</span>
            </button>
          </div>
        </div>

        {/* Practical Switcher Pills */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap gap-2">
          {PRACTICALS_DATA.map((p) => {
            const isSelected = p.id === practical.id;
            const isDone = completedPracticals.includes(p.id);
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPracticalId(p.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md ring-1 ring-cyan-400/50'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <span>Practical {p.practicalNumber}: {p.title.split(' ')[2]}</span>
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Practical Manual Sheet */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6 print:bg-white print:text-black">
        {/* Title & Metadata */}
        <div className="border-b border-slate-800 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              PRACTICAL NO. 0{practical.practicalNumber}
            </span>
            <span className="text-xs text-slate-400">Course Code: 22317 (Data Structures Using 'C')</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">{practical.title}</h2>
        </div>

        {/* 1. Aim */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">1. Aim of Experiment</h3>
          <p className="text-xs sm:text-sm text-slate-200 bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 leading-relaxed">
            {practical.aim}
          </p>
        </div>

        {/* 2. Prior Concepts */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">2. Required Concepts & Prerequisites</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {practical.prerequisites.map((req, i) => (
              <li key={i} className="flex items-center space-x-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Algorithm */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">3. Step-by-Step Algorithm</h3>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5 font-mono text-xs text-slate-300">
            {practical.algorithmSteps.map((step, idx) => (
              <div key={idx} className="leading-relaxed">
                {step}
              </div>
            ))}
          </div>
        </div>

        {/* 4. Flowchart Description */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">4. Program Flowchart Logic</h3>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono leading-relaxed">
            {practical.flowchartDescription}
          </div>
        </div>

        {/* 5. Complete C Program */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center space-x-1.5">
              <Code className="w-4 h-4 text-cyan-400" />
              <span>5. Complete Program Code in 'C'</span>
            </h3>
            <button
              onClick={handleCopyCode}
              className="flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-[11px] text-slate-300 hover:text-white"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 overflow-x-auto">
            <pre className="font-mono text-xs text-slate-200 leading-relaxed">
              {practical.completeProgramC}
            </pre>
          </div>
        </div>

        {/* 6. Sample Input & Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Sample Test Input</h3>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre">
              {practical.sampleInput}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Expected Console Output</h3>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 whitespace-pre">
              {practical.sampleOutput}
            </div>
          </div>
        </div>

        {/* 7. Result & Conclusion */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">7. Result & Lab Conclusion</h3>
          <p className="text-xs sm:text-sm text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800 leading-relaxed">
            {practical.resultConclusion}
          </p>
        </div>

        {/* 8. Lab Viva Questions */}
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center space-x-1.5">
            <HelpCircle className="w-4 h-4" />
            <span>8. Laboratory Viva Voce Questions</span>
          </h3>
          <div className="space-y-3">
            {practical.vivaQuestions.map((vq, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                <span className="font-bold text-white block">Q{idx + 1}. {vq.question}</span>
                <p className="text-slate-300 leading-relaxed font-sans">{vq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
