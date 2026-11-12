export type AlgorithmId =
  | 'bubble'
  | 'selection'
  | 'insertion'
  | 'merge'
  | 'quick'
  | 'shell'
  | 'heap'
  | 'counting'
  | 'radix'
  | 'bucket';

export type AlgorithmLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type EventType =
  | 'compare'
  | 'swap'
  | 'write'
  | 'pivot'
  | 'active'
  | 'mark-sorted'
  | 'subsegment'
  | 'complete';

export interface SortEvent {
  id: number;
  type: EventType;
  indices: number[]; // Indices involved (e.g. [i, j] or [i])
  values?: number[];  // Corresponding values
  arraySnapshot: number[]; // Full snapshot of array at this point
  explanation: string; // Educational explanation of this exact micro-operation
  pivotIndex?: number;
  subsegment?: [number, number]; // [start, end] for merge/quick partitions
  sortedIndices?: number[];
  lineReference?: number; // Highlighted line in pseudocode/code
}

export interface SortMetrics {
  comparisons: number;
  swaps: number;
  writes: number;
  totalSteps: number;
  durationMs: number;
}

export interface AlgorithmInfo {
  id: AlgorithmId;
  name: string;
  level: AlgorithmLevel;
  shortDescription: string;
  definition: string;
  workingPrinciple: string;
  realWorldAnalogy: string;
  flowchartSteps: { step: string; detail: string }[];
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
    reasoning: string;
  };
  spaceComplexity: {
    complexity: string;
    reasoning: string;
  };
  stability: boolean;
  stabilityExplanation: string;
  inPlace: boolean;
  adaptive: boolean;
  advantages: string[];
  disadvantages: string[];
  applications: string[];
  vivaQuestions: {
    question: string;
    answer: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
  }[];
  codeSnippets: {
    c: string;
    cpp: string;
    java: string;
    python: string;
    typescript: string;
  };
  lineExplanations: {
    [lineNumber: number]: {
      statement: string;
      does: string;
      why: string;
      variableModified: string;
      sortingEffect: string;
    };
  };
}

export type ArrayDistribution =
  | 'random'
  | 'ascending'
  | 'descending'
  | 'nearly-sorted'
  | 'duplicates';

export type VisualizationMode = 'bar' | 'array';

export interface UserProfile {
  name: string;
  email: string;
  studentId: string;
  collegeOrBranch: string;
  avatarSeed: string;
  isGuest: boolean;
  completedPracticals: string[];
  completedQuizzes: { quizId: string; score: number; total: number; date: string }[];
  completedChallenges: string[];
  studiedAlgorithms: AlgorithmId[];
  savedExperiments: SavedExperiment[];
  streakDays: number;
  points: number;
}

export interface SavedExperiment {
  id: string;
  title: string;
  algorithmId: AlgorithmId;
  date: string;
  datasetSize: number;
  distribution: string;
  metrics: SortMetrics;
}

export interface PracticalGuide {
  id: string;
  practicalNumber: number;
  algorithmId: AlgorithmId;
  title: string;
  aim: string;
  prerequisites: string[];
  algorithmSteps: string[];
  flowchartDescription: string;
  completeProgramC: string;
  sampleInput: string;
  sampleOutput: string;
  resultConclusion: string;
  vivaQuestions: { question: string; answer: string }[];
}

export interface QuizQuestion {
  id: string;
  category: 'Concepts' | 'Complexity' | 'Step Prediction' | 'Code Analysis' | 'Identification' | 'Real-World';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  algorithmTag?: AlgorithmId;
}

export interface Challenge {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  points: number;
  type: 'identify' | 'predict-next' | 'bug-hunt' | 'min-operations';
  description: string;
  data: any;
  hint: string;
}

export interface RealWorldStudent {
  id: string;
  rollNo: number;
  name: string;
  department: string;
  semesterMarks: number; // out of 100
  attendancePercent: number;
  rank?: number;
}

export interface RealWorldProduct {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number; // in INR
  rating: number; // 1.0 to 5.0
  popularitySales: number; // units sold
}

export interface RealWorldBook {
  id: string;
  accessionNo: string;
  title: string;
  author: string;
  year: number;
  edition: number;
  subject: string;
}

export interface RealWorldTransaction {
  id: string;
  refNo: string;
  date: string;
  description: string;
  amount: number;
  type: 'Credit' | 'Debit';
}

export interface RealWorldAppointment {
  id: string;
  tokenNo: number;
  patientName: string;
  appointmentTime: string;
  urgency: 'Normal' | 'Priority' | 'Emergency';
  doctor: string;
}

export interface RealWorldInventoryItem {
  id: string;
  productId: string;
  name: string;
  quantityInStock: number;
  unitPrice: number;
  reorderLevel: number;
}
