import React, { useState } from 'react';
import { User, X, Check, Award, Flame, BookOpen, FileText, Trophy, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}) => {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [studentId, setStudentId] = useState(profile.studentId);
  const [collegeOrBranch, setCollegeOrBranch] = useState(profile.collegeOrBranch);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveProfile({
      ...profile,
      name,
      email,
      studentId,
      collegeOrBranch,
      isGuest: false,
    });
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-panel rounded-2xl max-w-lg w-full p-6 border border-slate-700 shadow-2xl bg-slate-950/95 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-white">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Student Academic Profile</h3>
              <p className="text-[11px] text-slate-400">MSBTE Diploma & Engineering Progress</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Academic Stats Strip */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">DSA Points</span>
            <span className="text-base font-bold text-emerald-400 font-mono">{profile.points}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Streak</span>
            <span className="text-base font-bold text-rose-400 font-mono">{profile.streakDays} Days</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Practicals</span>
            <span className="text-base font-bold text-cyan-400 font-mono">{profile.completedPracticals.length} / 5</span>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-3 text-xs">
          <div>
            <label className="text-slate-400 block mb-1">Student Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1">Enrollment / Roll Number</label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1">Polytechnic / College & Branch</label>
            <input
              type="text"
              value={collegeOrBranch}
              onChange={(e) => setCollegeOrBranch(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center space-x-1 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold shadow-md"
          >
            {isSaved ? <Check className="w-4 h-4 text-emerald-300" /> : null}
            <span>{isSaved ? 'Saved!' : 'Save Profile'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
