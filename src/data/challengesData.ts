import { Challenge } from '../types';

export const CHALLENGES_DATA: Challenge[] = [
  {
    id: 'ch-1',
    title: 'The Mystery Algorithm: Identify the Pattern',
    level: 'Beginner',
    points: 100,
    type: 'identify',
    description: 'An algorithm processes the array [35, 12, 68, 24, 18]. In the first iteration, it scans the entire array, finds 12, and swaps it with 35. In the second iteration, it scans from index 1, finds 18, and swaps it with 35. Which algorithm is being executed?',
    data: {
      initialArray: [35, 12, 68, 24, 18],
      step1: [12, 35, 68, 24, 18],
      step2: [12, 18, 68, 24, 35],
      options: ['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Quick Sort'],
      correctAnswer: 'Selection Sort',
    },
    hint: 'Notice that in each pass, the algorithm finds the absolute smallest remaining element and moves it to the front with a single swap.',
  },
  {
    id: 'ch-2',
    title: 'Predict the Next Array State: Insertion Sort',
    level: 'Beginner',
    points: 150,
    type: 'predict-next',
    description: 'We are currently running Insertion Sort on the array [14, 28, 45, 19, 52]. The sorted prefix is currently [14, 28, 45], and the next key to insert is 19. What will be the exact array state once 19 is inserted?',
    data: {
      initialArray: [14, 28, 45, 19, 52],
      key: 19,
      options: [
        '[14, 19, 28, 45, 52]',
        '[19, 14, 28, 45, 52]',
        '[14, 28, 19, 45, 52]',
        '[14, 28, 45, 19, 52]',
      ],
      correctAnswer: '[14, 19, 28, 45, 52]',
    },
    hint: '19 is compared backwards: 45 > 19 (shifts right), 28 > 19 (shifts right), 14 < 19 (stops). 19 is placed right after 14.',
  },
  {
    id: 'ch-3',
    title: 'Bug Hunter: Catch the Infinite Loop / Off-by-One',
    level: 'Intermediate',
    points: 200,
    type: 'bug-hunt',
    description: 'Examine this C snippet for Bubble Sort. Why does it cause an array index out of bounds error?\n\nfor (i = 0; i < n; i++) {\n    for (j = 0; j < n; j++) {\n        if (arr[j] > arr[j + 1]) {\n            swap(&arr[j], &arr[j + 1]);\n        }\n    }\n}',
    data: {
      options: [
        'Variable i is not initialized.',
        'When j reaches n - 1, arr[j + 1] accesses arr[n], which is out of bounds!',
        'The swap function is missing pointers.',
        'Bubble sort cannot use nested for loops.',
      ],
      correctAnswer: 'When j reaches n - 1, arr[j + 1] accesses arr[n], which is out of bounds!',
    },
    hint: 'Look closely at the maximum value of j in the inner loop condition `j < n`. What happens when j = n - 1?',
  },
  {
    id: 'ch-4',
    title: 'Partition Master: QuickSort Lomuto Boundary',
    level: 'Advanced',
    points: 250,
    type: 'predict-next',
    description: 'Given the array [20, 70, 10, 40] with Lomuto partition using pivot = arr[3] = 40. Where will pivot 40 end up after partitioning?',
    data: {
      array: [20, 70, 10, 40],
      options: ['Index 0', 'Index 1', 'Index 2', 'Index 3'],
      correctAnswer: 'Index 2',
    },
    hint: 'Count how many elements are strictly less than or equal to 40 (20 and 10). Those two elements will be on the left, so pivot 40 sits at index 2.',
  },
];
