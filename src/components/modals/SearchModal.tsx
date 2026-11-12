import React, { useState } from 'react';
import { Search, X, BookOpen, BarChart3, FileText, Briefcase, Terminal, ArrowRight } from 'lucide-react';
import { AlgorithmId } from '../../types';
import { ALGORITHMS_DATA } from '../../data/algorithmsData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: any, algoId?: AlgorithmId) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const qLower = query.toLowerCase();

  const matchedAlgorithms = (Object.keys(ALGORITHMS_DATA) as AlgorithmId[]).filter((id) => {
    const a = ALGORITHMS_DATA[id];
    return a.name.toLowerCase().includes(qLower) || a.shortDescription.toLowerCase().includes(qLower);
  });

  const practicalItems = [
    { title: 'Practical 1: Bubble Sort in C', id: 'prac-1', algoId: 'bubble' },
    { title: 'Practical 2: Selection Sort in C', id: 'prac-2', algoId: 'selection' },
    { title: 'Practical 3: Insertion Sort in C', id: 'prac-3', algoId: 'insertion' },
    { title: 'Practical 4: Merge Sort in C', id: 'prac-4', algoId: 'merge' },
    { title: 'Practical 5: Quick Sort in C', id: 'prac-5', algoId: 'quick' },
  ].filter((p) => p.title.toLowerCase().includes(qLower));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-panel rounded-2xl max-w-xl w-full p-5 border border-slate-700 shadow-2xl bg-slate-950/95 space-y-4">
        {/* Search Input */}
        <div className="flex items-center space-x-3 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search algorithms, practicals, viva questions, complexity..."
            className="flex-1 bg-transparent text-white text-xs sm:text-sm focus:outline-none placeholder-slate-500"
          />
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto space-y-4 text-xs">
          {/* Algorithms */}
          {matchedAlgorithms.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-2">
                Algorithms ({matchedAlgorithms.length})
              </span>
              {matchedAlgorithms.map((id) => (
                <div
                  key={id}
                  onClick={() => {
                    onNavigate('visualizer', id);
                    onClose();
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-900 cursor-pointer transition text-slate-200"
                >
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-4 h-4 text-cyan-400" />
                    <span className="font-semibold text-white">{ALGORITHMS_DATA[id].name}</span>
                    <span className="text-slate-500 text-[11px] font-mono">
                      ({ALGORITHMS_DATA[id].timeComplexity.average})
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </div>
              ))}
            </div>
          )}

          {/* Practicals */}
          {practicalItems.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-2">
                Lab Practicals
              </span>
              {practicalItems.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onNavigate('practicals');
                    onClose();
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-900 cursor-pointer transition text-slate-200"
                >
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-indigo-400" />
                    <span>{p.title}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
