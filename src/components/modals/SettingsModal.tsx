import React from 'react';
import { Settings, X, Volume2, VolumeX, Moon, Sliders, Shield } from 'lucide-react';
import { AppSettings } from '../../utils/storage';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onSaveSettings: (settings: AppSettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
}) => {
  if (!isOpen) return null;

  const update = (partial: Partial<AppSettings>) => {
    onSaveSettings({ ...settings, ...partial });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-panel rounded-2xl max-w-md w-full p-6 border border-slate-700 shadow-2xl bg-slate-950/95 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Platform Settings</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          {/* Sound Synthesizer */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div>
              <span className="font-semibold text-white block">Sorting Audio Synthesizer</span>
              <span className="text-[11px] text-slate-400">Play melodic frequencies on array swaps</span>
            </div>
            <button
              onClick={() => update({ soundEnabled: !settings.soundEnabled })}
              className={`p-2 rounded-lg border transition ${
                settings.soundEnabled
                  ? 'bg-indigo-600/30 border-indigo-400 text-indigo-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              {settings.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>

          {/* Default Programming Language */}
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
            <span className="font-semibold text-white block">Default Programming Language</span>
            <select
              value={settings.defaultLanguage}
              onChange={(e) => update({ defaultLanguage: e.target.value as any })}
              className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-cyan-300 text-xs focus:outline-none"
            >
              <option value="c">C Language (MSBTE Curriculum)</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="python">Python 3</option>
              <option value="typescript">TypeScript</option>
            </select>
          </div>

          {/* Reduced Motion */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div>
              <span className="font-semibold text-white block">Reduced Motion Mode</span>
              <span className="text-[11px] text-slate-400">Simplify complex transitions for low-spec devices</span>
            </div>
            <input
              type="checkbox"
              checked={settings.reducedMotion}
              onChange={(e) => update({ reducedMotion: e.target.checked })}
              className="w-4 h-4 accent-cyan-500 rounded"
            />
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white text-xs font-bold shadow-md"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
