import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Shuffle,
  Volume2,
  VolumeX,
  Sliders,
  CheckCircle2,
  Layers,
  Sparkles,
  Info,
  Maximize2,
  Code,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { AlgorithmId, ArrayDistribution, VisualizationMode, SortEvent } from '../../types';
import { ALGORITHMS_DATA } from '../../data/algorithmsData';
import { runAlgorithm } from '../../algorithms/engine';
import { generateArray, parseCustomArray } from '../../utils/arrayGenerators';
import { soundController } from '../../utils/audio';

interface VisualizerViewProps {
  initialAlgorithm?: AlgorithmId;
  onNavigateToLearn?: (algoId: AlgorithmId) => void;
  onNavigateToCode?: (algoId: AlgorithmId) => void;
}

export const VisualizerView: React.FC<VisualizerViewProps> = ({
  initialAlgorithm = 'bubble',
  onNavigateToLearn,
  onNavigateToCode,
}) => {
  const [selectedAlgo, setSelectedAlgo] = useState<AlgorithmId>(initialAlgorithm);
  const [datasetSize, setDatasetSize] = useState<number>(25);
  const [distribution, setDistribution] = useState<ArrayDistribution>('random');
  const [mode, setMode] = useState<VisualizationMode>('bar');
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1.0);
  const [soundOn, setSoundOn] = useState<boolean>(soundController.isEnabled());

  // Array and Events state
  const [baseArray, setBaseArray] = useState<number[]>([]);
  const [events, setEvents] = useState<SortEvent[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Custom array input modal
  const [showCustomModal, setShowCustomModal] = useState<boolean>(false);
  const [customInputText, setCustomInputText] = useState<string>('54, 26, 93, 17, 77, 31, 44, 55, 20');
  const [customInputError, setCustomInputError] = useState<string | null>(null);

  // Animation frame / timer ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize new array and compute events
  const initArray = useCallback(
    (size = datasetSize, dist = distribution, customArr?: number[]) => {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsPlaying(false);

      const arr = customArr || generateArray(size, dist);
      setBaseArray(arr);

      // Run algorithm to get all genuine events
      const result = runAlgorithm(selectedAlgo, arr);
      setEvents(result.events);
      setCurrentStepIndex(0);
      setIsCompleted(false);
    },
    [datasetSize, distribution, selectedAlgo]
  );

  // Regenerate when algorithm or dataset options change
  useEffect(() => {
    initArray();
  }, [initArray]);

  // Keep track of sound state
  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    soundController.setEnabled(next);
  };

  // Step play execution
  const currentEvent: SortEvent | undefined = events[currentStepIndex];
  const currentArray = currentEvent ? currentEvent.arraySnapshot : baseArray;

  // Max value in array for bar scaling
  const maxVal = Math.max(...(currentArray.length > 0 ? currentArray : [100]), 10);
  const minVal = Math.min(...(currentArray.length > 0 ? currentArray : [0]), 0);

  // Audio trigger on event
  useEffect(() => {
    if (!currentEvent) return;
    if (soundOn) {
      if (currentEvent.type === 'swap') {
        const val = currentEvent.values?.[0] || 50;
        soundController.playTone(val, minVal, maxVal, 'swap');
      } else if (currentEvent.type === 'compare') {
        const val = currentEvent.values?.[0] || 50;
        soundController.playTone(val, minVal, maxVal, 'compare');
      } else if (currentEvent.type === 'complete') {
        soundController.playTone(100, minVal, maxVal, 'complete');
      }
    }
  }, [currentStepIndex, currentEvent, soundOn, minVal, maxVal]);

  // Playback timer loop
  useEffect(() => {
    if (isPlaying) {
      // Calculate delay in ms based on speedMultiplier and dataset size
      // Larger datasets need faster execution
      const baseDelay = datasetSize > 100 ? 15 : datasetSize > 50 ? 35 : 80;
      const delay = Math.max(10, Math.floor(baseDelay / speedMultiplier));

      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= events.length - 1) {
            setIsPlaying(false);
            setIsCompleted(true);
            return prev;
          }
          return prev + 1;
        });
      }, delay);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, events.length, speedMultiplier, datasetSize]);

  const handlePlayPause = () => {
    if (currentStepIndex >= events.length - 1) {
      // If at end, restart and play
      setCurrentStepIndex(0);
      setIsCompleted(false);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleStepForward = () => {
    setIsPlaying(false);
    if (currentStepIndex < events.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleStepBackward = () => {
    setIsPlaying(false);
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      setIsCompleted(false);
    }
  };

  const handleRestart = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    setIsCompleted(false);
  };

  const handleScrubTimeline = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPlaying(false);
    const targetStep = parseInt(e.target.value, 10);
    setCurrentStepIndex(targetStep);
    setIsCompleted(targetStep >= events.length - 1);
  };

  const handleApplyCustomArray = () => {
    const parsed = parseCustomArray(customInputText);
    if (!parsed) {
      setCustomInputError('Please enter at least 2 valid numbers separated by commas or spaces.');
      return;
    }
    if (parsed.length > 300) {
      setCustomInputError('Maximum custom array size is 300 numbers.');
      return;
    }
    setCustomInputError(null);
    setDatasetSize(parsed.length);
    setShowCustomModal(false);
    initArray(parsed.length, 'random', parsed);
  };

  // Color mapping helper
  const getElementState = (index: number) => {
    if (!currentEvent) return 'default';
    if (currentEvent.type === 'complete') return 'sorted';
    if (currentEvent.sortedIndices?.includes(index)) return 'sorted';
    if (currentEvent.type === 'swap' && currentEvent.indices.includes(index)) return 'swapping';
    if (currentEvent.type === 'compare' && currentEvent.indices.includes(index)) return 'comparing';
    if (currentEvent.pivotIndex === index) return 'pivot';
    if (currentEvent.type === 'write' && currentEvent.indices.includes(index)) return 'write';
    if (currentEvent.indices.includes(index)) return 'active';
    return 'default';
  };

  const algoInfo = ALGORITHMS_DATA[selectedAlgo];

  // Calculate live metrics up to current step
  const comparisonsSoFar = events.slice(0, currentStepIndex + 1).filter((e) => e.type === 'compare').length;
  const swapsSoFar = events.slice(0, currentStepIndex + 1).filter((e) => e.type === 'swap').length;
  const writesSoFar = events.slice(0, currentStepIndex + 1).filter((e) => e.type === 'write').length;

  return (
    <div className="space-y-6">
      {/* Top Banner & Algorithm Selector */}
      <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {algoInfo.level}
              </span>
              <span className="text-slate-400 text-xs">|</span>
              <span className="text-slate-400 text-xs">
                Time: <strong className="text-cyan-300">{algoInfo.timeComplexity.average}</strong>
              </span>
              <span className="text-slate-400 text-xs">|</span>
              <span className="text-slate-400 text-xs">
                Space: <strong className="text-indigo-300">{algoInfo.spaceComplexity.complexity}</strong>
              </span>
              <span className="text-slate-400 text-xs">|</span>
              <span className={`text-xs font-semibold ${algoInfo.stability ? 'text-emerald-400' : 'text-amber-400'}`}>
                {algoInfo.stability ? 'Stable' : 'Unstable'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-['Plus_Jakarta_Sans'] flex items-center space-x-2">
              <span>{algoInfo.name}</span>
              <span className="text-sm font-normal text-slate-400">Interactive Execution Engine</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">{algoInfo.shortDescription}</p>
          </div>

          {/* Quick links to Learn / Code */}
          <div className="flex items-center space-x-2 self-start lg:self-center">
            {onNavigateToLearn && (
              <button
                onClick={() => onNavigateToLearn(selectedAlgo)}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-indigo-500/50 hover:bg-slate-800 text-slate-200 text-xs font-medium transition"
              >
                <Info className="w-3.5 h-3.5 text-indigo-400" />
                <span>Theory & Viva</span>
              </button>
            )}
            {onNavigateToCode && (
              <button
                onClick={() => onNavigateToCode(selectedAlgo)}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800 text-slate-200 text-xs font-medium transition"
              >
                <Code className="w-3.5 h-3.5 text-cyan-400" />
                <span>Source Code</span>
              </button>
            )}
          </div>
        </div>

        {/* Algorithm Pills Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800/80">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Select Algorithm:</div>
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(ALGORITHMS_DATA) as AlgorithmId[]).map((algoId) => {
              const info = ALGORITHMS_DATA[algoId];
              const isSelected = selectedAlgo === algoId;
              return (
                <button
                  key={algoId}
                  onClick={() => setSelectedAlgo(algoId)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-cyan-400/50'
                      : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {info.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dataset Generation & Visual Controls */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
          {/* Distribution Selector */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Initial Distribution
            </label>
            <div className="grid grid-cols-3 gap-1">
              {[
                { id: 'random', label: 'Random' },
                { id: 'ascending', label: 'Sorted' },
                { id: 'descending', label: 'Reverse' },
                { id: 'nearly-sorted', label: 'Nearly' },
                { id: 'duplicates', label: 'Duplicates' },
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => {
                    setDistribution(d.id as ArrayDistribution);
                    initArray(datasetSize, d.id as ArrayDistribution);
                  }}
                  className={`px-2 py-1.5 rounded-lg text-[11px] font-medium transition ${
                    distribution === d.id
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {d.label}
                </button>
              ))}
              <button
                onClick={() => setShowCustomModal(true)}
                className="px-2 py-1.5 rounded-lg text-[11px] font-medium bg-slate-900 text-cyan-400 hover:bg-cyan-950/40 border border-cyan-800/50 transition"
              >
                Custom...
              </button>
            </div>
          </div>

          {/* Dataset Size Selector */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Dataset Size: <strong className="text-cyan-400">{datasetSize}</strong> items
              </label>
            </div>
            <div className="flex items-center gap-1">
              {[10, 25, 50, 100, 250, 500].map((sz) => (
                <button
                  key={sz}
                  onClick={() => {
                    setDatasetSize(sz);
                    initArray(sz, distribution);
                  }}
                  className={`flex-1 py-1.5 rounded-lg text-[11px] font-medium transition ${
                    datasetSize === sz
                      ? 'bg-cyan-600 text-white font-semibold shadow-sm'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Speed Controller */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Speed: <strong className="text-indigo-400">{speedMultiplier}x</strong>
              </label>
              <div className="flex items-center space-x-1">
                {[0.5, 1, 2, 5].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setSpeedMultiplier(spd)}
                    className={`px-1.5 py-0.5 rounded text-[10px] ${
                      speedMultiplier === spd ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>
            <input
              type="range"
              min="0.2"
              max="5"
              step="0.1"
              value={speedMultiplier}
              onChange={(e) => setSpeedMultiplier(parseFloat(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
            />
          </div>

          {/* Visualization Mode & Audio */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setMode('bar')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  mode === 'bar' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Bar Mode
              </button>
              <button
                onClick={() => setMode('array')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  mode === 'array' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Memory Cells
              </button>
            </div>

            <button
              onClick={handleToggleSound}
              className={`p-2.5 rounded-xl border text-xs transition flex items-center space-x-1 ${
                soundOn
                  ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title="Toggle Synthesizer Sound"
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Playback Control Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
          <div className="flex items-center space-x-2">
            {/* Play/Pause */}
            <button
              onClick={handlePlayPause}
              className="flex items-center space-x-2 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/30 transition active:scale-95"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
              <span>{isPlaying ? 'Pause' : currentStepIndex >= events.length - 1 ? 'Replay' : 'Start'}</span>
            </button>

            {/* Step Back */}
            <button
              onClick={handleStepBackward}
              disabled={currentStepIndex === 0 || isPlaying}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 disabled:opacity-40 text-slate-300 text-xs transition"
              title="Previous Step"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            {/* Step Forward */}
            <button
              onClick={handleStepForward}
              disabled={currentStepIndex >= events.length - 1 || isPlaying}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 disabled:opacity-40 text-slate-300 text-xs transition"
              title="Next Step"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            {/* Restart */}
            <button
              onClick={handleRestart}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs transition"
              title="Restart from Step 0"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Shuffle / New Array */}
            <button
              onClick={() => initArray()}
              className="flex items-center space-x-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs transition"
              title="Generate New Random Array"
            >
              <Shuffle className="w-3.5 h-3.5 text-cyan-400" />
              <span>New Array</span>
            </button>
          </div>

          {/* Live Step Counter & Metrics */}
          <div className="flex items-center space-x-4 text-xs">
            <div className="text-slate-400">
              Step: <strong className="text-white">{currentStepIndex + 1}</strong> / {events.length || 1}
            </div>
            <div className="h-3 w-px bg-slate-800 hidden sm:block" />
            <div className="text-slate-400 hidden sm:block">
              Comparisons: <strong className="text-amber-400">{comparisonsSoFar}</strong>
            </div>
            <div className="text-slate-400 hidden sm:block">
              Swaps: <strong className="text-rose-400">{swapsSoFar}</strong>
            </div>
            <div className="text-slate-400 hidden sm:block">
              Writes: <strong className="text-cyan-400">{writesSoFar}</strong>
            </div>
          </div>
        </div>

        {/* Timeline Scrubber */}
        <div className="pt-2">
          <input
            type="range"
            min="0"
            max={Math.max(0, events.length - 1)}
            value={currentStepIndex}
            onChange={handleScrubTimeline}
            className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-900 rounded-lg appearance-none"
          />
        </div>
      </div>

      {/* Main Visualization Canvas Stage */}
      <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-slate-800 relative min-h-[380px] flex flex-col justify-between">
        {/* Color Legend */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-5 pb-4 border-b border-slate-800/60 text-[11px]">
          <div className="flex items-center space-x-1.5">
            <div className="w-3 h-3 rounded-sm bg-indigo-500/80 border border-indigo-400" />
            <span className="text-slate-300">Default</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="w-3 h-3 rounded-sm bg-amber-400 border border-amber-300" />
            <span className="text-slate-300 font-medium">Comparing</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="w-3 h-3 rounded-sm bg-rose-500 border border-rose-400" />
            <span className="text-slate-300 font-medium">Swapping</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="w-3 h-3 rounded-sm bg-purple-500 border border-purple-400" />
            <span className="text-slate-300 font-medium">Pivot / Subsegment</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="w-3 h-3 rounded-sm bg-emerald-500 border border-emerald-400" />
            <span className="text-slate-300 font-medium">Sorted</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="w-3 h-3 rounded-sm bg-cyan-400 border border-cyan-300" />
            <span className="text-slate-300 font-medium">Active / Key</span>
          </div>
        </div>

        {/* Rendering Mode */}
        {mode === 'bar' ? (
          // BAR MODE
          <div className="flex items-end justify-center w-full h-[320px] sm:h-[380px] pt-8 pb-4 gap-[2px] sm:gap-1 overflow-hidden">
            {currentArray.map((val, idx) => {
              const state = getElementState(idx);
              const heightPercent = Math.max(8, Math.round(((val - minVal) / (maxVal - minVal || 1)) * 95));

              let barColor = 'bg-indigo-600/70 border-indigo-500/50';
              if (state === 'comparing') barColor = 'bg-amber-400 border-amber-300 shadow-lg shadow-amber-400/40 z-10';
              else if (state === 'swapping') barColor = 'bg-rose-500 border-rose-400 shadow-lg shadow-rose-500/40 z-10 scale-105';
              else if (state === 'sorted') barColor = 'bg-emerald-500 border-emerald-400';
              else if (state === 'pivot') barColor = 'bg-purple-500 border-purple-400 shadow-lg shadow-purple-500/40 z-10 ring-2 ring-purple-300';
              else if (state === 'active' || state === 'write') barColor = 'bg-cyan-400 border-cyan-300 shadow-lg shadow-cyan-400/40 z-10';

              const showLabels = datasetSize <= 35;
              const showIndex = datasetSize <= 25;

              return (
                <div
                  key={idx}
                  className="flex flex-col items-center flex-1 h-full justify-end min-w-[2px] transition-all duration-100 ease-out"
                >
                  {/* Top Value Label */}
                  {showLabels && (
                    <span
                      className={`text-[10px] font-mono font-bold mb-1 transition ${
                        state === 'comparing'
                          ? 'text-amber-300 scale-110'
                          : state === 'swapping'
                          ? 'text-rose-300 scale-110'
                          : state === 'sorted'
                          ? 'text-emerald-300'
                          : 'text-slate-400'
                      }`}
                    >
                      {val}
                    </span>
                  )}

                  {/* Vertical Animated Bar */}
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-t-sm sm:rounded-t-md border transition-all duration-100 ${barColor}`}
                  />

                  {/* Bottom Index Label */}
                  {showIndex && (
                    <span className="text-[9px] text-slate-500 mt-1 font-mono">{idx}</span>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          // ARRAY / MEMORY CELL MODE
          <div className="py-8 flex flex-wrap gap-2 justify-center items-center max-h-[380px] overflow-y-auto">
            {currentArray.map((val, idx) => {
              const state = getElementState(idx);
              let cellBg = 'bg-slate-900 border-slate-700 text-slate-200';
              let pointerLabel = null;

              if (state === 'comparing') {
                cellBg = 'bg-amber-500/20 border-amber-400 text-amber-300 ring-2 ring-amber-400/50 scale-105';
                pointerLabel = 'CMP';
              } else if (state === 'swapping') {
                cellBg = 'bg-rose-500/20 border-rose-400 text-rose-300 ring-2 ring-rose-400/50 scale-110 animate-bounce';
                pointerLabel = 'SWAP';
              } else if (state === 'sorted') {
                cellBg = 'bg-emerald-500/20 border-emerald-400 text-emerald-300';
                pointerLabel = '✓';
              } else if (state === 'pivot') {
                cellBg = 'bg-purple-500/20 border-purple-400 text-purple-300 ring-2 ring-purple-400';
                pointerLabel = 'PIVOT';
              } else if (state === 'active' || state === 'write') {
                cellBg = 'bg-cyan-500/20 border-cyan-400 text-cyan-300 ring-2 ring-cyan-400/50';
                pointerLabel = 'ACTIVE';
              }

              return (
                <div key={idx} className="flex flex-col items-center">
                  <span className="text-[10px] text-slate-500 font-mono mb-0.5">[{idx}]</span>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-sm border shadow-sm transition-all duration-150 ${cellBg}`}
                  >
                    {val}
                  </div>
                  {pointerLabel && (
                    <span className="text-[9px] font-bold uppercase tracking-wider text-cyan-400 mt-1">
                      {pointerLabel}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Step Micro-Explanation Banner */}
        <div className="mt-4 p-3.5 rounded-xl bg-slate-900/95 border border-slate-800 flex items-start space-x-3">
          <div className="mt-0.5">
            {isCompleted ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : currentEvent?.type === 'swap' ? (
              <TrendingUp className="w-5 h-5 text-rose-400 shrink-0" />
            ) : currentEvent?.type === 'compare' ? (
              <Sliders className="w-5 h-5 text-amber-400 shrink-0" />
            ) : (
              <Sparkles className="w-5 h-5 text-cyan-400 shrink-0" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                {currentEvent ? currentEvent.type.toUpperCase() : 'INITIAL STATE'}
              </span>
              <span className="text-slate-500 text-xs">•</span>
              <span className="text-xs text-slate-400 font-mono">
                Step {currentStepIndex + 1} of {events.length}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 mt-0.5 font-sans leading-relaxed">
              {currentEvent ? currentEvent.explanation : 'Ready to start. Click "Start" or use step controls.'}
            </p>
          </div>
        </div>
      </div>

      {/* Custom Array Input Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="glass-panel rounded-2xl max-w-md w-full p-6 border border-slate-700 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Enter Custom Array</h3>
              <button
                onClick={() => setShowCustomModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-300">
              Provide comma or space separated integer values (e.g. <code>45, 12, 89, 34, 11, 7</code>) to visualize:
            </p>
            <textarea
              value={customInputText}
              onChange={(e) => setCustomInputText(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
            {customInputError && <p className="text-xs text-rose-400 font-medium">{customInputError}</p>}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowCustomModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyCustomArray}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white text-xs font-semibold"
              >
                Apply & Visualize
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
