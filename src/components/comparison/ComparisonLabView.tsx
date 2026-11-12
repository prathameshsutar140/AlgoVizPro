import React, { useState } from 'react';
import {
  Scale,
  Play,
  CheckSquare,
  Square,
  BarChart2,
  Table,
  Zap,
  Clock,
  Layers,
  ArrowRight,
  TrendingDown,
  Info,
} from 'lucide-react';
import { AlgorithmId, ArrayDistribution } from '../../types';
import { ALGORITHMS_DATA } from '../../data/algorithmsData';
import { runAlgorithm } from '../../algorithms/engine';
import { generateArray } from '../../utils/arrayGenerators';

export const ComparisonLabView: React.FC = () => {
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<AlgorithmId[]>([
    'bubble',
    'insertion',
    'merge',
    'quick',
  ]);
  const [datasetSize, setDatasetSize] = useState<number>(50);
  const [distribution, setDistribution] = useState<ArrayDistribution>('random');
  const [isComparing, setIsComparing] = useState<boolean>(false);

  // Benchmarked results
  const [results, setResults] = useState<
    {
      id: AlgorithmId;
      name: string;
      comparisons: number;
      swaps: number;
      writes: number;
      durationMs: number;
      timeComplexity: string;
      spaceComplexity: string;
      stability: boolean;
      inPlace: boolean;
    }[]
  >([]);

  const toggleAlgorithm = (algoId: AlgorithmId) => {
    if (selectedAlgorithms.includes(algoId)) {
      if (selectedAlgorithms.length > 2) {
        setSelectedAlgorithms(selectedAlgorithms.filter((id) => id !== algoId));
      }
    } else {
      if (selectedAlgorithms.length < 6) {
        setSelectedAlgorithms([...selectedAlgorithms, algoId]);
      }
    }
  };

  const handleRunComparison = () => {
    setIsComparing(true);

    // Generate single base dataset
    const baseInput = generateArray(datasetSize, distribution);

    // Run each selected algorithm on identical cloned input
    const benchmarkResults = selectedAlgorithms.map((id) => {
      const clonedInput = [...baseInput];
      const start = performance.now();
      const res = runAlgorithm(id, clonedInput);
      const measuredDuration = performance.now() - start;
      const info = ALGORITHMS_DATA[id];

      return {
        id,
        name: info.name,
        comparisons: res.metrics.comparisons,
        swaps: res.metrics.swaps,
        writes: res.metrics.writes,
        durationMs: Math.max(0.05, measuredDuration),
        timeComplexity: info.timeComplexity.average,
        spaceComplexity: info.spaceComplexity.complexity,
        stability: info.stability,
        inPlace: info.inPlace,
      };
    });

    setResults(benchmarkResults);
    setIsComparing(false);
  };

  // Find max values for visual comparative bar scaling
  const maxComparisons = Math.max(...results.map((r) => r.comparisons), 1);
  const maxSwaps = Math.max(...results.map((r) => r.swaps), 1);
  const maxWrites = Math.max(...results.map((r) => r.writes), 1);
  const maxDuration = Math.max(...results.map((r) => r.durationMs), 0.1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Multi-Algorithm Benchmark Lab
              </span>
              <span className="text-slate-400 text-xs">Empirical vs Theoretical Metrics</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-['Plus_Jakarta_Sans']">
              Algorithm Comparison & Performance Lab
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              Benchmark 2 to 6 algorithms against the exact same cloned dataset. Observe how comparison counts, swaps, writes, and real-time execution scale.
            </p>
          </div>

          <button
            onClick={handleRunComparison}
            disabled={isComparing}
            className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition active:scale-95 self-start lg:self-center"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{isComparing ? 'Benchmarking...' : 'Run Comparative Benchmark'}</span>
          </button>
        </div>

        {/* Algorithm Selection Checkboxes */}
        <div className="mt-5 pt-4 border-t border-slate-800">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Select 2 to 6 Algorithms to Compare:
          </div>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(ALGORITHMS_DATA) as AlgorithmId[]).map((id) => {
              const isChecked = selectedAlgorithms.includes(id);
              return (
                <button
                  key={id}
                  onClick={() => toggleAlgorithm(id)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                    isChecked
                      ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/50'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {isChecked ? <CheckSquare className="w-3.5 h-3.5 text-cyan-400" /> : <Square className="w-3.5 h-3.5" />}
                  <span>{ALGORITHMS_DATA[id].name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dataset Controls */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-6">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-400">Dataset Size:</span>
            {[25, 50, 100, 250, 500].map((sz) => (
              <button
                key={sz}
                onClick={() => setDatasetSize(sz)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                  datasetSize === sz ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-400">Distribution:</span>
            {[
              { id: 'random', label: 'Random' },
              { id: 'ascending', label: 'Already Sorted' },
              { id: 'descending', label: 'Reverse Sorted' },
              { id: 'nearly-sorted', label: 'Nearly Sorted' },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setDistribution(d.id as ArrayDistribution)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                  distribution === d.id ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Benchmark Results */}
      {results.length > 0 ? (
        <div className="space-y-6">
          {/* Visual Comparative Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Comparisons Chart */}
            <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
                  <BarChart2 className="w-4 h-4" />
                  <span>Total Comparisons (Lower is Better)</span>
                </h3>
              </div>
              <div className="space-y-3">
                {results.map((r) => {
                  const widthPercent = Math.max(8, Math.round((r.comparisons / maxComparisons) * 100));
                  return (
                    <div key={r.id} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-200">{r.name}</span>
                        <span className="font-mono text-amber-300 font-bold">{r.comparisons}</span>
                      </div>
                      <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                        <div
                          style={{ width: `${widthPercent}%` }}
                          className="h-full bg-amber-400 rounded-full transition-all duration-500 shadow-sm shadow-amber-400/50"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Swaps & Writes Chart */}
            <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center space-x-2">
                  <BarChart2 className="w-4 h-4" />
                  <span>Memory Swaps & Moves (Lower is Better)</span>
                </h3>
              </div>
              <div className="space-y-3">
                {results.map((r) => {
                  const widthPercent = Math.max(8, Math.round((r.swaps / maxSwaps) * 100));
                  return (
                    <div key={r.id} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-200">{r.name}</span>
                        <span className="font-mono text-rose-300 font-bold">{r.swaps} swaps ({r.writes} writes)</span>
                      </div>
                      <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                        <div
                          style={{ width: `${widthPercent}%` }}
                          className="h-full bg-rose-500 rounded-full transition-all duration-500 shadow-sm shadow-rose-500/50"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Full Comparison Matrix Table */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 overflow-x-auto">
            <h3 className="text-base font-bold text-white mb-4 flex items-center space-x-2">
              <Table className="w-4 h-4 text-cyan-400" />
              <span>Full Benchmark & Asymptotic Comparison Matrix</span>
            </h3>

            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                  <th className="py-3 px-3">Algorithm</th>
                  <th className="py-3 px-3">Measured Time</th>
                  <th className="py-3 px-3">Comparisons</th>
                  <th className="py-3 px-3">Swaps</th>
                  <th className="py-3 px-3">Memory Writes</th>
                  <th className="py-3 px-3">Average Time (O)</th>
                  <th className="py-3 px-3">Space (O)</th>
                  <th className="py-3 px-3">Stability</th>
                  <th className="py-3 px-3">In-Place</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {results.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-900/60 transition">
                    <td className="py-3 px-3 font-bold text-white">{r.name}</td>
                    <td className="py-3 px-3 font-mono text-cyan-300">{r.durationMs.toFixed(3)} ms</td>
                    <td className="py-3 px-3 font-mono text-amber-300">{r.comparisons}</td>
                    <td className="py-3 px-3 font-mono text-rose-300">{r.swaps}</td>
                    <td className="py-3 px-3 font-mono text-slate-300">{r.writes}</td>
                    <td className="py-3 px-3 font-mono font-semibold text-slate-200">{r.timeComplexity}</td>
                    <td className="py-3 px-3 font-mono text-indigo-300">{r.spaceComplexity}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        r.stability ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {r.stability ? 'STABLE' : 'UNSTABLE'}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        r.inPlace ? 'bg-cyan-500/20 text-cyan-300' : 'bg-purple-500/20 text-purple-300'
                      }`}>
                        {r.inPlace ? 'IN-PLACE' : 'EXTRA RAM'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="glass-panel rounded-2xl p-12 border border-slate-800 text-center space-y-4">
          <Scale className="w-12 h-12 text-indigo-400 mx-auto opacity-70" />
          <h3 className="text-lg font-bold text-white">Ready to Compare Algorithms</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Choose your algorithms, configure dataset size (e.g. 50 or 100), and click "Run Comparative Benchmark" to generate real empirical metrics.
          </p>
          <button
            onClick={handleRunComparison}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold text-xs shadow-md transition"
          >
            Launch Benchmark Now
          </button>
        </div>
      )}
    </div>
  );
};
