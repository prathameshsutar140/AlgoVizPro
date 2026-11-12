import { UserProfile, SavedExperiment, AlgorithmId } from '../types';

const STORAGE_KEY_PROFILE = 'algoviz_user_profile_v2';
const STORAGE_KEY_SETTINGS = 'algoviz_user_settings_v2';

export interface AppSettings {
  theme: 'dark' | 'navy' | 'light';
  animationSpeed: number; // 0.25 to 5
  defaultLanguage: 'c' | 'cpp' | 'java' | 'python' | 'typescript';
  soundEnabled: boolean;
  reducedMotion: boolean;
  compactMode: boolean;
}

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark',
  animationSpeed: 1.0,
  defaultLanguage: 'c',
  soundEnabled: false,
  reducedMotion: false,
  compactMode: false,
};

const DEFAULT_PROFILE: UserProfile = {
  name: 'Student Guest',
  email: 'student@msbte.edu.in',
  studentId: 'DCO-2026-88',
  collegeOrBranch: 'Government Polytechnic / Computer Tech',
  avatarSeed: 'alex',
  isGuest: true,
  completedPracticals: ['prac-1'],
  completedQuizzes: [{ quizId: 'quiz-init', score: 3, total: 3, date: '2026-11-10' }],
  completedChallenges: ['ch-1'],
  studiedAlgorithms: ['bubble', 'insertion', 'merge'],
  savedExperiments: [
    {
      id: 'exp-demo-1',
      title: 'Bubble vs Quick on N=50 Reverse Array',
      algorithmId: 'bubble',
      date: '2026-11-11',
      datasetSize: 50,
      distribution: 'descending',
      metrics: {
        comparisons: 1225,
        swaps: 1225,
        writes: 2450,
        totalSteps: 2451,
        durationMs: 4.8,
      },
    },
  ],
  streakDays: 4,
  points: 450,
};

export function loadProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROFILE);
    if (raw) {
      return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.error('Failed to load profile', e);
  }
  return DEFAULT_PROFILE;
}

export function saveProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save profile', e);
  }
}

export function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (raw) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.error('Failed to load settings', e);
  }
  return DEFAULT_SETTINGS;
}

export function saveSettings(settings: AppSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings', e);
  }
}
