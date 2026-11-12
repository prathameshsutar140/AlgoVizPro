import { AlgorithmId, AlgorithmInfo } from '../types';

export const ALGORITHMS_DATA: Record<AlgorithmId, AlgorithmInfo> = {
  bubble: {
    id: 'bubble',
    name: 'Bubble Sort',
    level: 'Beginner',
    shortDescription: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    definition: 'Bubble Sort is a basic comparison-based sorting algorithm where adjacent elements are iteratively compared and swapped if they are not in the desired sequence. The process is repeated until no swaps are needed.',
    workingPrinciple: 'In each pass through the array of size n, the algorithm compares adjacent elements arr[j] and arr[j+1]. If arr[j] > arr[j+1], they are swapped. With each pass, the next highest element "bubbles up" to its correct position at the end of the array.',
    realWorldAnalogy: 'Imagine bubbles of different sizes in a soda bottle; larger bubbles naturally rise faster to the surface until all bubbles are sorted by buoyancy from smallest at the bottom to largest at top.',
    flowchartSteps: [
      { step: 'Start', detail: 'Initialize array of size N' },
      { step: 'Outer Loop i=0 to N-1', detail: 'Track pass count. Set swapped = false' },
      { step: 'Inner Loop j=0 to N-i-2', detail: 'Compare adjacent elements arr[j] and arr[j+1]' },
      { step: 'Condition arr[j] > arr[j+1]?', detail: 'If true, swap(arr[j], arr[j+1]) and set swapped = true' },
      { step: 'Check swapped == false?', detail: 'If no swaps occurred in a pass, break early (array is sorted)' },
      { step: 'End', detail: 'Array is fully sorted in ascending order' },
    ],
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
      reasoning: 'In the best case (already sorted array with swapped flag), only 1 pass of n-1 comparisons is made. In worst case (reverse sorted), (n-1) + (n-2) + ... + 1 = n(n-1)/2 = O(n²) comparisons and swaps occur.',
    },
    spaceComplexity: {
      complexity: 'O(1)',
      reasoning: 'In-place sorting algorithm requiring only a single auxiliary temporary variable for swapping.',
    },
    stability: true,
    stabilityExplanation: 'Bubble Sort is stable because it only swaps when arr[j] > arr[j+1]. Equal elements are never swapped, preserving their original order.',
    inPlace: true,
    adaptive: true,
    advantages: [
      'Simple to understand, code, and teach to beginners.',
      'Detects already sorted arrays in O(n) time with an early-exit flag.',
      'Stable sorting algorithm requiring zero additional memory (O(1) space).',
    ],
    disadvantages: [
      'O(n²) time complexity makes it too slow for large datasets.',
      'Performs excessive memory write operations (swaps) compared to Selection Sort.',
    ],
    applications: [
      'Educational introductory algorithm for teaching algorithmic complexity.',
      'Checking if an array is already sorted or nearly sorted with minimal code.',
      'Microcontrollers with extreme memory constraints and tiny datasets (N < 20).',
    ],
    vivaQuestions: [
      {
        question: 'Why is it called Bubble Sort?',
        answer: 'Because with each pass, larger values iteratively bubble up to their correct final positions at the end of the array, mimicking physical bubbles rising in a liquid.',
        difficulty: 'Easy',
      },
      {
        question: 'How can you optimize Bubble Sort to achieve O(n) best-case time?',
        answer: 'By using a boolean flag `swapped`. If a complete pass finishes without performing any swap, the array is already sorted, and we break immediately.',
        difficulty: 'Medium',
      },
      {
        question: 'What is the maximum number of swaps in Bubble Sort for N elements?',
        answer: 'In the worst case (reverse sorted array), exactly n*(n-1)/2 swaps occur.',
        difficulty: 'Medium',
      },
      {
        question: 'Is Bubble Sort an internal or external sorting algorithm?',
        answer: 'It is an internal sorting algorithm because all data resides entirely in RAM during execution.',
        difficulty: 'Easy',
      },
    ],
    codeSnippets: {
      c: `void bubbleSort(int arr[], int n) {
    int i, j, temp;
    int swapped;
    for (i = 0; i < n - 1; i++) {
        swapped = 0;
        for (j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = 1;
            }
        }
        if (swapped == 0) break;
    }
}`,
      cpp: `void bubbleSort(std::vector<int>& arr) {
    int n = arr.size();
    bool swapped;
    for (int i = 0; i < n - 1; ++i) {
        swapped = false;
        for (int j = 0; j < n - i - 1; ++j) {
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
      java: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    boolean swapped;
    for (int i = 0; i < n - 1; i++) {
        swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
      python: `def bubble_sort(arr: list[int]) -> list[int]:
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr`,
      typescript: `export function bubbleSort(arr: number[]): number[] {
  const n = arr.length;
  let swapped: boolean;
  for (let i = 0; i < n - 1; i++) {
    swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}`,
    },
    lineExplanations: {
      1: {
        statement: 'for (i = 0; i < n - 1; i++)',
        does: 'Runs the outer loop for n-1 passes.',
        why: 'With n-1 elements sorted, the remaining single element is guaranteed to be in its correct place.',
        variableModified: 'i (pass index)',
        sortingEffect: 'Controls the boundary of unsorted elements shrinking from right to left.',
      },
      2: {
        statement: 'swapped = 0;',
        does: 'Resets the swap monitoring flag to 0 before scanning.',
        why: 'Detects if any out-of-order pair was found in the current pass.',
        variableModified: 'swapped',
        sortingEffect: 'Enables the O(n) early termination optimization.',
      },
      3: {
        statement: 'for (j = 0; j < n - i - 1; j++)',
        does: 'Iterates through unsorted pairs.',
        why: 'The last i elements are already guaranteed to be in their final positions.',
        variableModified: 'j',
        sortingEffect: 'Avoids redundant comparisons against already settled elements.',
      },
      4: {
        statement: 'if (arr[j] > arr[j + 1])',
        does: 'Compares adjacent values.',
        why: 'Sorting requires ascending order: arr[j] <= arr[j+1].',
        variableModified: 'None (comparison only)',
        sortingEffect: 'Identifies inversions that need to be resolved.',
      },
      5: {
        statement: 'temp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = temp;',
        does: 'Exchanges adjacent elements.',
        why: 'Pushes the larger value towards the right.',
        variableModified: 'arr[j], arr[j+1]',
        sortingEffect: 'Fixes the inversion in-place.',
      },
    },
  },

  selection: {
    id: 'selection',
    name: 'Selection Sort',
    level: 'Beginner',
    shortDescription: 'Finds the minimum element from the unsorted part and puts it at the beginning.',
    definition: 'Selection Sort divides the input array into two parts: a sorted subarray built from left to right, and an unsorted subarray. In each iteration, it finds the smallest element from the unsorted part and swaps it into the next sorted slot.',
    workingPrinciple: 'Maintains an index min_idx for the smallest element found so far. In pass i, scans arr[i..n-1] to locate the true minimum. Once found, swaps arr[i] with arr[min_idx]. Exactly 1 swap per pass, at most n-1 swaps total.',
    realWorldAnalogy: 'Like sorting a hand of test papers by student roll number: scan through all remaining unsorted papers, find Roll No. 1 and place it first; scan the rest, find Roll No. 2 and place it second.',
    flowchartSteps: [
      { step: 'Start', detail: 'Initialize array arr of size n' },
      { step: 'Outer Loop i=0 to n-1', detail: 'Set min_idx = i' },
      { step: 'Inner Loop j=i+1 to n', detail: 'Compare arr[j] with arr[min_idx]' },
      { step: 'If arr[j] < arr[min_idx]', detail: 'Update min_idx = j' },
      { step: 'If min_idx != i', detail: 'Swap arr[i] with arr[min_idx]' },
      { step: 'End', detail: 'All n elements placed in sorted order' },
    ],
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
      reasoning: 'Selection Sort always conducts (n-1) + (n-2) + ... + 1 = n(n-1)/2 comparisons regardless of the initial ordering, because it must scan the entire unsorted region to be sure it has the true minimum.',
    },
    spaceComplexity: {
      complexity: 'O(1)',
      reasoning: 'In-place algorithm requiring only a few integer variables (i, j, min_idx, temp).',
    },
    stability: false,
    stabilityExplanation: 'Selection Sort is unstable in its standard swap implementation. For example, in [4a, 4b, 2], 4a is swapped with 2, resulting in [2, 4b, 4a], swapping the relative order of 4a and 4b.',
    inPlace: true,
    adaptive: false,
    advantages: [
      'Minimizes memory writes: at most n-1 swaps across the entire sorting process.',
      'Optimal when writing to non-volatile memory (like Flash/EEPROM) where write cycles degrade hardware.',
      'Simple implementation with no recursion overhead.',
    ],
    disadvantages: [
      'Strictly O(n²) comparisons even if array is already sorted.',
      'Unstable sorting algorithm.',
    ],
    applications: [
      'Embedded devices with flash memory wear-leveling constraints where write operations are costly.',
      'Small datasets where implementation simplicity is preferred.',
    ],
    vivaQuestions: [
      {
        question: 'Why does Selection Sort have O(n²) time complexity even in the best case?',
        answer: 'Because to verify that an element is indeed the minimum in the unsorted portion, the inner loop must scan every single remaining item to the end.',
        difficulty: 'Easy',
      },
      {
        question: 'What is the main advantage of Selection Sort over Bubble Sort?',
        answer: 'Selection Sort performs at most O(n) memory writes (swaps), whereas Bubble Sort can perform up to O(n²) swaps.',
        difficulty: 'Medium',
      },
      {
        question: 'Can Selection Sort be made stable?',
        answer: 'Yes, by shifting all elements forward instead of swapping, but this increases writes from O(n) to O(n²).',
        difficulty: 'Hard',
      },
    ],
    codeSnippets: {
      c: `void selectionSort(int arr[], int n) {
    int i, j, min_idx, temp;
    for (i = 0; i < n - 1; i++) {
        min_idx = i;
        for (j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx])
                min_idx = j;
        }
        if (min_idx != i) {
            temp = arr[i];
            arr[i] = arr[min_idx];
            arr[min_idx] = temp;
        }
    }
}`,
      cpp: `void selectionSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; ++i) {
        int min_idx = i;
        for (int j = i + 1; j < n; ++j) {
            if (arr[j] < arr[min_idx])
                min_idx = j;
        }
        if (min_idx != i) {
            std::swap(arr[i], arr[min_idx]);
        }
    }
}`,
      java: `public static void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx])
                min_idx = j;
        }
        if (min_idx != i) {
            int temp = arr[i];
            arr[i] = arr[min_idx];
            arr[min_idx] = temp;
        }
    }
}`,
      python: `def selection_sort(arr: list[int]) -> list[int]:
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
      typescript: `export function selectionSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}`,
    },
    lineExplanations: {
      1: {
        statement: 'for (i = 0; i < n - 1; i++)',
        does: 'Advances the boundary of the sorted subarray.',
        why: 'Index i is the target position for the i-th smallest element.',
        variableModified: 'i',
        sortingEffect: 'Grows the sorted prefix [0..i-1].',
      },
      2: {
        statement: 'min_idx = i;',
        does: 'Assumes the first unsorted item is the minimum.',
        why: 'Need an initial reference point before scanning remaining elements.',
        variableModified: 'min_idx',
        sortingEffect: 'Stores the index of current known minimum.',
      },
      3: {
        statement: 'for (j = i + 1; j < n; j++)',
        does: 'Scans all remaining unsorted elements to the right of i.',
        why: 'Must inspect every single remaining element to find the true minimum.',
        variableModified: 'j',
        sortingEffect: 'Executes the search phase.',
      },
      4: {
        statement: 'if (arr[j] < arr[min_idx]) min_idx = j;',
        does: 'Updates min_idx if a smaller value is encountered.',
        why: 'Tracks the lowest value seen so far.',
        variableModified: 'min_idx',
        sortingEffect: 'Pinpoints the minimum element in arr[i..n-1].',
      },
      5: {
        statement: 'if (min_idx != i) swap(arr[i], arr[min_idx]);',
        does: 'Exchanges the minimum element into target slot i.',
        why: 'Places the minimum into its permanent sorted index.',
        variableModified: 'arr[i], arr[min_idx]',
        sortingEffect: 'Completes one sorted element position.',
      },
    },
  },

  insertion: {
    id: 'insertion',
    name: 'Insertion Sort',
    level: 'Beginner',
    shortDescription: 'Builds the final sorted array one item at a time by shifting larger elements right.',
    definition: 'Insertion Sort iterates through the input array, removes one element at each step, and inserts it into its correct location among the previously sorted elements.',
    workingPrinciple: 'Considers the first element trivially sorted. For each subsequent element (key) from index 1 to n-1, it compares the key backwards against the sorted subarray [0..i-1], shifting greater elements one position to the right, and drops the key into the resulting empty slot.',
    realWorldAnalogy: 'Sorting playing cards in your hand: as you pick up each card from the deck, you slide it leftward past larger cards until it fits neatly into its sorted order.',
    flowchartSteps: [
      { step: 'Start', detail: 'Initialize array arr with size n' },
      { step: 'Loop i=1 to n-1', detail: 'Set key = arr[i], j = i - 1' },
      { step: 'While j >= 0 and arr[j] > key', detail: 'Shift arr[j] to arr[j+1], decrement j' },
      { step: 'Insert key', detail: 'Place key into arr[j+1]' },
      { step: 'Next i', detail: 'Repeat until all elements inserted' },
      { step: 'End', detail: 'Array fully sorted' },
    ],
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
      reasoning: 'Best case occurs when array is already sorted: only 1 comparison per element, 0 shifts, giving O(n). Worst case occurs on reverse sorted array, where each element shifts all the way to the beginning, yielding n(n-1)/2 operations.',
    },
    spaceComplexity: {
      complexity: 'O(1)',
      reasoning: 'In-place sorting algorithm requiring only a single key variable.',
    },
    stability: true,
    stabilityExplanation: 'Stable because elements equal to the key are never shifted past it (condition is arr[j] > key, not >=).',
    inPlace: true,
    adaptive: true,
    advantages: [
      'Very fast for small arrays (n < 25) with low constant overhead.',
      'Highly adaptive: takes linear O(n) time for nearly sorted arrays.',
      'Online algorithm: can sort a streaming list as items arrive in real time.',
      'Stable and in-place.',
    ],
    disadvantages: [
      'O(n²) time complexity on large reverse-ordered lists.',
      'Many shift/write operations.',
    ],
    applications: [
      'Core building block for hybrid sorting algorithms like TimSort (used in Python and Java Arrays.sort()) and IntroSort.',
      'Real-time streaming telemetry and sensor data processing.',
    ],
    vivaQuestions: [
      {
        question: 'Why is Insertion Sort preferred over QuickSort for small arrays?',
        answer: 'Because Insertion Sort has negligible constant overhead, no recursion call stack, and excellent CPU cache locality.',
        difficulty: 'Medium',
      },
      {
        question: 'What is an "online" sorting algorithm?',
        answer: 'An online algorithm can process and sort pieces of input piece-by-piece in real time without needing the entire dataset upfront.',
        difficulty: 'Hard',
      },
      {
        question: 'Under what input condition does Insertion Sort run in O(n) time?',
        answer: 'When the input array is already sorted or nearly sorted, requiring only one comparison per element.',
        difficulty: 'Easy',
      },
    ],
    codeSnippets: {
      c: `void insertionSort(int arr[], int n) {
    int i, j, key;
    for (i = 1; i < n; i++) {
        key = arr[i];
        j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
      cpp: `void insertionSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; ++i) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            --j;
        }
        arr[j + 1] = key;
    }
}`,
      java: `public static void insertionSort(int[] arr) {
    int n = arr.length;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
      python: `def insertion_sort(arr: list[int]) -> list[int]:
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
      typescript: `export function insertionSort(arr: number[]): number[] {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
    },
    lineExplanations: {
      1: {
        statement: 'for (i = 1; i < n; i++)',
        does: 'Loops over unsorted elements starting at index 1.',
        why: 'A 1-element subarray arr[0] is already sorted.',
        variableModified: 'i',
        sortingEffect: 'Selects the candidate element to insert.',
      },
      2: {
        statement: 'key = arr[i];',
        does: 'Stores the current element in a variable.',
        why: 'Because shifting elements right will overwrite arr[i].',
        variableModified: 'key',
        sortingEffect: 'Preserves the value being inserted.',
      },
      3: {
        statement: 'while (j >= 0 && arr[j] > key)',
        does: 'Checks if previous elements in sorted region are larger than key.',
        why: 'Larger elements must shift right to open a spot for key.',
        variableModified: 'None',
        sortingEffect: 'Finds the correct insertion slot.',
      },
      4: {
        statement: 'arr[j + 1] = arr[j]; j = j - 1;',
        does: 'Shifts arr[j] one index to the right and decrements j.',
        why: 'Makes space for key.',
        variableModified: 'arr[j+1], j',
        sortingEffect: 'Propagates vacancy leftward.',
      },
      5: {
        statement: 'arr[j + 1] = key;',
        does: 'Places key into the vacant position.',
        why: 'j is now at the first element <= key, so j+1 is key’s spot.',
        variableModified: 'arr[j+1]',
        sortingEffect: 'Leaves arr[0..i] fully sorted.',
      },
    },
  },

  merge: {
    id: 'merge',
    name: 'Merge Sort',
    level: 'Intermediate',
    shortDescription: 'Divides array into halves, recursively sorts them, and merges the two sorted halves.',
    definition: 'Merge Sort is a Divide and Conquer algorithm that continuously splits the array in half until individual elements are reached, and then merges the sorted halves together in linear time.',
    workingPrinciple: 'Divide: Find midpoint mid = (left+right)/2 and split into left and right subarrays. Conquer: Recursively call mergeSort on left and right. Combine: Merge the two sorted subarrays using two pointers into a temporary buffer and copy back.',
    realWorldAnalogy: 'Imagine two separate stacks of sorted exam papers; you compare the top paper of each stack, take the smaller roll number, and place it on a new output stack until both are combined.',
    flowchartSteps: [
      { step: 'Start', detail: 'Call mergeSort(arr, 0, n-1)' },
      { step: 'Base Case Check', detail: 'If left >= right, return (single element is sorted)' },
      { step: 'Divide', detail: 'Calculate mid = (left + right) / 2' },
      { step: 'Conquer', detail: 'mergeSort(arr, left, mid) & mergeSort(arr, mid+1, right)' },
      { step: 'Combine / Merge', detail: 'Merge sorted subarrays [left..mid] and [mid+1..right] into temp array' },
      { step: 'Copy Back', detail: 'Write merged elements back into original array' },
    ],
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      reasoning: 'The recursion tree has log₂(n) levels. At each level, merging all elements takes O(n) comparisons and copies. Recurrence: T(n) = 2T(n/2) + O(n). By Master Theorem, T(n) = O(n log n) across all cases.',
    },
    spaceComplexity: {
      complexity: 'O(n)',
      reasoning: 'Requires an auxiliary array of size n to hold elements during the merge phase.',
    },
    stability: true,
    stabilityExplanation: 'Stable because when comparing leftArr[i] <= rightArr[j], ties favor the left subarray, preserving original order.',
    inPlace: false,
    adaptive: false,
    advantages: [
      'Guaranteed O(n log n) worst-case time complexity.',
      'Stable sorting algorithm.',
      'Optimal for linked lists (can sort linked lists in O(1) extra space).',
      'Ideal for external sorting of gigantic datasets residing on disk/tapes.',
    ],
    disadvantages: [
      'Requires O(n) extra memory space.',
      'Slower than QuickSort on arrays in practice due to memory copying overhead.',
    ],
    applications: [
      'External sorting for databases and Big Data MapReduce systems.',
      'Sorting linked lists where node rearrangement takes O(1) extra space.',
    ],
    vivaQuestions: [
      {
        question: 'State the recurrence relation for Merge Sort and its solution.',
        answer: 'T(n) = 2T(n/2) + O(n). Solving by Master Theorem Case 2 gives T(n) = O(n log n).',
        difficulty: 'Medium',
      },
      {
        question: 'Why is Merge Sort preferred for Linked Lists?',
        answer: 'Because linked list nodes can be merged by rewiring pointers in O(1) auxiliary space without allocating arrays.',
        difficulty: 'Hard',
      },
      {
        question: 'Is standard Merge Sort in-place?',
        answer: 'No, standard Merge Sort requires O(n) auxiliary memory to store elements during merging.',
        difficulty: 'Easy',
      },
    ],
    codeSnippets: {
      c: `void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    int L[n1], R[n2];
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
      cpp: `void merge(std::vector<int>& arr, int l, int m, int r) {
    std::vector<int> left(arr.begin() + l, arr.begin() + m + 1);
    std::vector<int> right(arr.begin() + m + 1, arr.begin() + r + 1);
    int i = 0, j = 0, k = l;
    while (i < left.size() && j < right.size()) {
        if (left[i] <= right[j]) arr[k++] = left[i++];
        else arr[k++] = right[j++];
    }
    while (i < left.size()) arr[k++] = left[i++];
    while (j < right.size()) arr[k++] = right[j++];
}

void mergeSort(std::vector<int>& arr, int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
      java: `public static void mergeSort(int[] arr, int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
      python: `def merge_sort(arr: list[int]) -> list[int]:
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
      typescript: `export function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  const result: number[] = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
    },
    lineExplanations: {
      1: {
        statement: 'int m = l + (r - l) / 2;',
        does: 'Calculates the middle index safely without integer overflow.',
        why: 'Splits the problem into two subproblems.',
        variableModified: 'm',
        sortingEffect: 'Divides the array partition.',
      },
      2: {
        statement: 'mergeSort(arr, l, m); mergeSort(arr, m + 1, r);',
        does: 'Recursively sorts both left and right subarrays.',
        why: 'Divide and conquer strategy.',
        variableModified: 'Call stack',
        sortingEffect: 'Ensures both halves are sorted before merging.',
      },
      3: {
        statement: 'while (i < n1 && j < n2)',
        does: 'Compares current elements of both sorted halves.',
        why: 'Selects the smaller element for the merged array.',
        variableModified: 'None',
        sortingEffect: 'Interleaves two sorted streams.',
      },
      4: {
        statement: 'if (L[i] <= R[j]) arr[k++] = L[i++];',
        does: 'Copies from left subarray and increments left pointer.',
        why: 'Left element is smaller or equal; using <= guarantees stability.',
        variableModified: 'arr[k], i, k',
        sortingEffect: 'Populates output in ascending order.',
      },
      5: {
        statement: 'while (i < n1) arr[k++] = L[i++];',
        does: 'Flushes any remaining items from left half.',
        why: 'Right half exhausted; left remainder is already sorted.',
        variableModified: 'arr[k], i, k',
        sortingEffect: 'Completes merge pass.',
      },
    },
  },

  quick: {
    id: 'quick',
    name: 'Quick Sort',
    level: 'Intermediate',
    shortDescription: 'Picks an element as pivot and partitions the array around the picked pivot.',
    definition: 'Quick Sort is an efficient Divide and Conquer algorithm that picks a pivot element, partitions the array such that elements smaller than the pivot are placed before it and greater elements after it, and then recursively sorts the sub-arrays.',
    workingPrinciple: 'Lomuto Partition: Chooses arr[high] as pivot. Maintains pointer i for the boundary of elements <= pivot. Iterates j from low to high-1. If arr[j] <= pivot, increments i and swaps arr[i] with arr[j]. Finally, swaps arr[i+1] with arr[high] to place pivot in its exact sorted position.',
    realWorldAnalogy: 'A teacher picks a student of medium height as a reference benchmark. All shorter students move to the left; all taller students move to the right. Then each side repeats the process.',
    flowchartSteps: [
      { step: 'Start', detail: 'Call quickSort(arr, low, high)' },
      { step: 'Check low < high', detail: 'If false, single element or empty subarray, return' },
      { step: 'Choose Pivot', detail: 'Pick arr[high] (or random/median)' },
      { step: 'Partition', detail: 'Reorder array so items < pivot on left, > pivot on right' },
      { step: 'Return Pivot Index pi', detail: 'Pivot is now permanently sorted at pi' },
      { step: 'Recursive Calls', detail: 'quickSort(arr, low, pi-1) and quickSort(arr, pi+1, high)' },
    ],
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
      reasoning: 'Best/Average case occurs when the pivot partitions array into roughly equal halves: T(n) = 2T(n/2) + O(n) = O(n log n). Worst case occurs when the pivot is always the smallest or largest element (e.g. already sorted array with last element pivot), yielding T(n) = T(n-1) + O(n) = O(n²).',
    },
    spaceComplexity: {
      complexity: 'O(log n)',
      reasoning: 'In-place array manipulation, but requires O(log n) stack memory for recursive function calls.',
    },
    stability: false,
    stabilityExplanation: 'Quick Sort is unstable because partitioning can swap distant elements over identical values.',
    inPlace: true,
    adaptive: false,
    advantages: [
      'Fastest general-purpose sorting algorithm in practice for in-memory arrays.',
      'Excellent CPU cache locality with in-place swaps.',
      'Requires only O(log n) auxiliary stack space.',
    ],
    disadvantages: [
      'Worst-case time complexity is O(n²).',
      'Unstable sorting algorithm.',
      'Performance sensitive to pivot selection strategy.',
    ],
    applications: [
      'Standard library sorting (C qsort, C++ std::sort (IntroSort)).',
      'Commercial high-frequency trading and graphics processing.',
    ],
    vivaQuestions: [
      {
        question: 'When does QuickSort exhibit its worst-case O(n²) behavior?',
        answer: 'When the chosen pivot is consistently the smallest or largest element, e.g. sorting an already sorted array when always picking the first or last element as pivot.',
        difficulty: 'Medium',
      },
      {
        question: 'How can worst-case O(n²) time in QuickSort be practically avoided?',
        answer: 'By using Randomized Pivot Selection or Median-of-Three pivot strategy (taking the median of first, middle, and last elements).',
        difficulty: 'Medium',
      },
      {
        question: 'Is QuickSort stable? Why or why not?',
        answer: 'No, QuickSort is not stable because long-range swaps across the pivot can rearrange identical elements.',
        difficulty: 'Easy',
      },
    ],
    codeSnippets: {
      c: `int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1), temp;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
        }
    }
    temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;
    return (i + 1);
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
      cpp: `int partition(std::vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; ++j) {
        if (arr[j] <= pivot) {
            ++i;
            std::swap(arr[i], arr[j]);
        }
    }
    std::swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(std::vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
      java: `public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
      python: `def quick_sort(arr: list[int]) -> list[int]:
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)`,
      typescript: `export function quickSort(arr: number[], low = 0, high = arr.length - 1): number[] {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}`,
    },
    lineExplanations: {
      1: {
        statement: 'int pivot = arr[high];',
        does: 'Selects the rightmost element as the partition pivot.',
        why: 'Serves as the threshold for dividing elements into smaller and larger subsets.',
        variableModified: 'pivot',
        sortingEffect: 'Sets target value for partitioning.',
      },
      2: {
        statement: 'int i = (low - 1);',
        does: 'Points to the boundary of elements <= pivot.',
        why: 'Starts before low because no smaller elements found yet.',
        variableModified: 'i',
        sortingEffect: 'Tracks the end of the smaller-elements subsegment.',
      },
      3: {
        statement: 'if (arr[j] <= pivot) { i++; swap(arr[i], arr[j]); }',
        does: 'Increments i and swaps arr[j] to the left partition.',
        why: 'Consolidates all elements <= pivot together on the left.',
        variableModified: 'arr[i], arr[j], i',
        sortingEffect: 'Partitions array in linear O(N) time.',
      },
      4: {
        statement: 'swap(arr[i + 1], arr[high]);',
        does: 'Places pivot into its final sorted slot between left and right partitions.',
        why: 'i+1 is the boundary where left is smaller and right is larger.',
        variableModified: 'arr[i+1], arr[high]',
        sortingEffect: 'Pivot is now permanently sorted.',
      },
      5: {
        statement: 'quickSort(arr, low, pi - 1); quickSort(arr, pi + 1, high);',
        does: 'Recursively sorts the partitions excluding the pivot.',
        why: 'Pivot is already in place; only subproblems need sorting.',
        variableModified: 'Call stack',
        sortingEffect: 'Completes divide-and-conquer recursion.',
      },
    },
  },

  shell: {
    id: 'shell',
    name: 'Shell Sort',
    level: 'Intermediate',
    shortDescription: 'Generalization of insertion sort that allows the exchange of far items through diminishing gaps.',
    definition: 'Shell Sort improves upon Insertion Sort by comparing elements separated by a gap of several positions, gradually reducing the gap down to 1 (which corresponds to regular insertion sort on nearly-sorted data).',
    workingPrinciple: 'Starts with a large gap (e.g. floor(n/2)). Elements at distance gap are compared and ordered. The gap is systematically halved in each pass. By moving elements long distances early on, small elements at the end quickly move left, eliminating inversions far more rapidly than adjacent swaps.',
    realWorldAnalogy: 'Comb sorting your hair: start with a wide-toothed comb to easily detangle large knots from afar, then switch to a fine-toothed comb for final precise alignment.',
    flowchartSteps: [
      { step: 'Start', detail: 'Initialize gap = n / 2' },
      { step: 'Outer Loop gap > 0', detail: 'Run gapped insertion sort for current gap' },
      { step: 'Inner Loop i = gap to n-1', detail: 'Save temp = arr[i], j = i' },
      { step: 'Shift Loop j >= gap and arr[j-gap] > temp', detail: 'arr[j] = arr[j-gap], j -= gap' },
      { step: 'Insert temp', detail: 'arr[j] = temp' },
      { step: 'Reduce Gap', detail: 'gap = gap / 2, repeat until gap == 0' },
    ],
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n^(4/3)) to O(n^1.5)',
      worst: 'O(n²)',
      reasoning: 'Complexity heavily depends on the gap sequence used. For Shell\'s original sequence (n/2^k), worst case is O(n²). Using Hibbard\'s (2^k - 1) or Sedgewick\'s sequence achieves O(n^(4/3)) = O(n^1.33).',
    },
    spaceComplexity: {
      complexity: 'O(1)',
      reasoning: 'Strictly in-place algorithm requiring no dynamic memory allocation.',
    },
    stability: false,
    stabilityExplanation: 'Unstable because elements can jump over equal elements during gapped comparisons.',
    inPlace: true,
    adaptive: true,
    advantages: [
      'Substantially faster than O(n²) algorithms without recursive call stack.',
      'In-place with O(1) extra space.',
      'Performs well on medium-sized datasets.',
    ],
    disadvantages: [
      'Unstable algorithm.',
      'Mathematical analysis of complexity is complex and varies by gap sequence.',
    ],
    applications: [
      'Embedded systems with tight RAM and no stack space for recursion.',
      'Linux kernel uClibc library sorting implementation.',
    ],
    vivaQuestions: [
      {
        question: 'Who invented Shell Sort and in which year?',
        answer: 'Donald Shell invented it in 1959 as the first sub-quadratic sorting algorithm.',
        difficulty: 'Easy',
      },
      {
        question: 'Why is Shell Sort faster than standard Insertion Sort?',
        answer: 'Because it allows exchanges of far-apart elements, eliminating many inversions in a single move instead of shifting one position at a time.',
        difficulty: 'Medium',
      },
    ],
    codeSnippets: {
      c: `void shellSort(int arr[], int n) {
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)
                arr[j] = arr[j - gap];
            arr[j] = temp;
        }
    }
}`,
      cpp: `void shellSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; ++i) {
            int temp = arr[i];
            int j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)
                arr[j] = arr[j - gap];
            arr[j] = temp;
        }
    }
}`,
      java: `public static void shellSort(int[] arr) {
    int n = arr.length;
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)
                arr[j] = arr[j - gap];
            arr[j] = temp;
        }
    }
}`,
      python: `def shell_sort(arr: list[int]) -> list[int]:
    n = len(arr)
    gap = n // 2
    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            arr[j] = temp
        gap //= 2
    return arr`,
      typescript: `export function shellSort(arr: number[]): number[] {
  const n = arr.length;
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
  }
  return arr;
}`,
    },
    lineExplanations: {
      1: {
        statement: 'for (int gap = n / 2; gap > 0; gap /= 2)',
        does: 'Generates diminishing gap sequence.',
        why: 'Gradually reduces distance between compared items to 1.',
        variableModified: 'gap',
        sortingEffect: 'Controls coarseness of gapped passes.',
      },
      2: {
        statement: 'for (int i = gap; i < n; i++)',
        does: 'Performs gapped insertion sort for current gap.',
        why: 'Arranges elements at interval gap into sorted sub-lists.',
        variableModified: 'i',
        sortingEffect: 'Sorts all interleaved subsequences.',
      },
      3: {
        statement: 'while (j >= gap && arr[j - gap] > temp)',
        does: 'Shifts elements greater than temp forward by gap positions.',
        why: 'Creates space for temp in its gapped location.',
        variableModified: 'arr[j], j',
        sortingEffect: 'Resolves large inversions quickly.',
      },
    },
  },

  heap: {
    id: 'heap',
    name: 'Heap Sort',
    level: 'Advanced',
    shortDescription: 'Comparison-based sorting based on Binary Heap data structure with guaranteed O(n log n) time.',
    definition: 'Heap Sort builds a Max-Heap from the input array, repeatedly extracts the maximum element (the root) and places it at the end of the array, and then re-heapifies the reduced heap.',
    workingPrinciple: 'Phase 1: Build a Max-Heap where every parent node is greater than or equal to its children. Phase 2: Swap the root arr[0] (max element) with arr[i] (end of unsorted region), reduce heap size by 1, and call heapify(0) on the root to restore heap property. Repeat until heap size is 1.',
    realWorldAnalogy: 'A company hierarchy where the highest-ranking executive (root) retires; the newest junior employee is temporarily placed at the top and demoted step-by-step to their rightful rank while the next executive is promoted.',
    flowchartSteps: [
      { step: 'Start', detail: 'Initialize array of size n' },
      { step: 'Build Max-Heap', detail: 'Call heapify from i = n/2 - 1 down to 0' },
      { step: 'Extract Root', detail: 'Loop i = n-1 down to 1: swap arr[0] with arr[i]' },
      { step: 'Heapify Root', detail: 'Call heapify(arr, i, 0) to restore heap on remaining i elements' },
      { step: 'Repeat', detail: 'Continue until all elements extracted' },
      { step: 'End', detail: 'Array sorted in ascending order' },
    ],
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      reasoning: 'Building the max-heap takes O(n) time. Each of the n-1 root extractions requires a heapify step that takes O(log n) time down the tree. Total time is O(n) + (n-1)*O(log n) = O(n log n) in all cases.',
    },
    spaceComplexity: {
      complexity: 'O(1)',
      reasoning: 'In-place sorting algorithm requiring zero auxiliary memory array.',
    },
    stability: false,
    stabilityExplanation: 'Unstable because heap operations swap nodes based on binary tree positions without regard to original order.',
    inPlace: true,
    adaptive: false,
    advantages: [
      'Guaranteed O(n log n) worst-case time without recursion stack vulnerability.',
      'Strictly in-place: O(1) auxiliary space unlike Merge Sort.',
      'Excellent for finding top K largest elements without sorting entire array.',
    ],
    disadvantages: [
      'Slower than QuickSort in practice due to poor cache locality (jumping indices 2i+1 and 2i+2).',
      'Unstable algorithm.',
    ],
    applications: [
      'Embedded safety-critical systems (e.g. avionics, automotive braking) requiring guaranteed O(n log n) with zero dynamic allocation.',
      'Priority queues and event-driven simulations.',
    ],
    vivaQuestions: [
      {
        question: 'What is a Max-Heap?',
        answer: 'A complete binary tree in which the value of each node is greater than or equal to the values of its children (arr[i] >= arr[2i+1] and arr[i] >= arr[2i+2]).',
        difficulty: 'Easy',
      },
      {
        question: 'What is the time complexity of building a heap from an unsorted array of N elements?',
        answer: 'O(n) time, proven by summing the heights of all nodes in the complete tree.',
        difficulty: 'Hard',
      },
      {
        question: 'Compare Heap Sort with QuickSort and Merge Sort.',
        answer: 'HeapSort is O(n log n) worst-case and in-place O(1) space, unlike QuickSort (O(n²) worst-case) and MergeSort (O(n) extra space).',
        difficulty: 'Medium',
      },
    ],
    codeSnippets: {
      c: `void heapify(int arr[], int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest != i) {
        int swap = arr[i]; arr[i] = arr[largest]; arr[largest] = swap;
        heapify(arr, n, largest);
    }
}

void heapSort(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0]; arr[0] = arr[i]; arr[i] = temp;
        heapify(arr, i, 0);
    }
}`,
      cpp: `void heapify(std::vector<int>& arr, int n, int i) {
    int largest = i;
    int l = 2 * i + 1, r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
        std::swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = n / 2 - 1; i >= 0; --i) heapify(arr, n, i);
    for (int i = n - 1; i > 0; --i) {
        std::swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}`,
      java: `public static void heapSort(int[] arr) {
    int n = arr.length;
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0]; arr[0] = arr[i]; arr[i] = temp;
        heapify(arr, i, 0);
    }
}`,
      python: `def heapify(arr, n, i):
    largest = i
    l = 2 * i + 1
    r = 2 * i + 2
    if l < n and arr[l] > arr[largest]: largest = l
    if r < n and arr[r] > arr[largest]: largest = r
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heap_sort(arr: list[int]) -> list[int]:
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    return arr`,
      typescript: `export function heapSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(arr, n, i);
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}`,
    },
    lineExplanations: {
      1: {
        statement: 'int l = 2 * i + 1; int r = 2 * i + 2;',
        does: 'Calculates the left and right child indices in the array-backed binary tree.',
        why: 'In zero-indexed binary heap representation.',
        variableModified: 'l, r',
        sortingEffect: 'Navigates tree structure.',
      },
      2: {
        statement: 'if (largest != i) { swap; heapify(arr, n, largest); }',
        does: 'Swaps node with its largest child and recurses down.',
        why: 'Ensures parent is larger than both children.',
        variableModified: 'arr[i], arr[largest]',
        sortingEffect: 'Sinks smaller value to its proper depth.',
      },
      3: {
        statement: 'for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);',
        does: 'Builds max heap from leaves upwards in O(n) time.',
        why: 'Leaves at n/2..n-1 are trivially heaps.',
        variableModified: 'i',
        sortingEffect: 'Establishes initial Max-Heap invariant.',
      },
      4: {
        statement: 'swap(arr[0], arr[i]); heapify(arr, i, 0);',
        does: 'Moves current maximum to end, shrinks heap, and restores root.',
        why: 'Places max in permanent position.',
        variableModified: 'arr[0], arr[i]',
        sortingEffect: 'Populates sorted region from right to left.',
      },
    },
  },

  counting: {
    id: 'counting',
    name: 'Counting Sort',
    level: 'Advanced',
    shortDescription: 'Integer sorting algorithm that counts occurrences of each distinct value in O(n + k) linear time.',
    definition: 'Counting Sort is a non-comparison sorting algorithm that operates by counting the frequency of each distinct element, calculating prefix sums to determine positions, and directly writing elements to their sorted indices.',
    workingPrinciple: '1. Finds range k = max - min + 1. 2. Creates count array of size k and counts frequencies. 3. Computes cumulative prefix sum so count[i] stores exact output position. 4. Iterates backwards through input to place elements stably into output array.',
    realWorldAnalogy: 'Sorting ballot votes by candidate: tally count for Candidate A, Candidate B, Candidate C on a whiteboard, then immediately print the tallied stack.',
    flowchartSteps: [
      { step: 'Start', detail: 'Find min and max in input array' },
      { step: 'Allocate Count Array', detail: 'Size k = max - min + 1, initialized to 0' },
      { step: 'Count Occurrences', detail: 'Increment count[arr[i] - min] for each element' },
      { step: 'Prefix Sums', detail: 'count[i] += count[i-1] for cumulative indices' },
      { step: 'Build Output', detail: 'Loop backwards from n-1 to 0: place arr[i] in output and decrement count' },
      { step: 'End', detail: 'Output array is fully sorted in linear time' },
    ],
    timeComplexity: {
      best: 'O(n + k)',
      average: 'O(n + k)',
      worst: 'O(n + k)',
      reasoning: 'Requires O(n) to find min/max and tally frequencies, O(k) to compute prefix sums, and O(n) to place elements into output. When k = O(n), runs in pure linear O(n) time.',
    },
    spaceComplexity: {
      complexity: 'O(n + k)',
      reasoning: 'Requires auxiliary count array of size k and output array of size n.',
    },
    stability: true,
    stabilityExplanation: 'Stable when traversing input in reverse order (from n-1 down to 0) during output array construction.',
    inPlace: false,
    adaptive: false,
    advantages: [
      'Breaks the O(n log n) comparison-based sorting lower bound to achieve O(n + k) linear time.',
      'Stable sorting algorithm.',
      'Extremely fast when range k is small relative to n.',
    ],
    disadvantages: [
      'Cannot directly sort arbitrary floating point numbers or complex objects.',
      'Wasteful memory usage when range k is very large compared to n (e.g. k = 10^9).',
    ],
    applications: [
      'Subroutine in Radix Sort.',
      'Sorting student exam marks (0 to 100), age distributions, or alphabet characters.',
    ],
    vivaQuestions: [
      {
        question: 'Why does Counting Sort break the O(n log n) theoretical lower bound?',
        answer: 'The O(n log n) lower bound applies strictly to comparison-based algorithms via decision trees. Counting Sort is non-comparison; it uses direct array indexing.',
        difficulty: 'Medium',
      },
      {
        question: 'Why do we iterate backwards from n-1 down to 0 when building the output array?',
        answer: 'To preserve stability so that duplicate elements appear in the output in the same relative order as the input.',
        difficulty: 'Hard',
      },
    ],
    codeSnippets: {
      c: `void countingSort(int arr[], int n) {
    int max = arr[0], min = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > max) max = arr[i];
        if (arr[i] < min) min = arr[i];
    }
    int range = max - min + 1;
    int count[range], output[n];
    for (int i = 0; i < range; i++) count[i] = 0;
    for (int i = 0; i < n; i++) count[arr[i] - min]++;
    for (int i = 1; i < range; i++) count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }
    for (int i = 0; i < n; i++) arr[i] = output[i];
}`,
      cpp: `void countingSort(std::vector<int>& arr) {
    if (arr.empty()) return;
    int min = *std::min_element(arr.begin(), arr.end());
    int max = *std::max_element(arr.begin(), arr.end());
    int range = max - min + 1;
    std::vector<int> count(range, 0), output(arr.size());
    for (int x : arr) count[x - min]++;
    for (int i = 1; i < range; ++i) count[i] += count[i - 1];
    for (int i = arr.size() - 1; i >= 0; --i) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }
    arr = output;
}`,
      java: `public static void countingSort(int[] arr) {
    int max = Arrays.stream(arr).max().getAsInt();
    int min = Arrays.stream(arr).min().getAsInt();
    int range = max - min + 1;
    int[] count = new int[range];
    int[] output = new int[arr.length];
    for (int x : arr) count[x - min]++;
    for (int i = 1; i < range; i++) count[i] += count[i - 1];
    for (int i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }
    System.arraycopy(output, 0, arr, 0, arr.length);
}`,
      python: `def counting_sort(arr: list[int]) -> list[int]:
    if not arr: return []
    min_val, max_val = min(arr), max(arr)
    count = [0] * (max_val - min_val + 1)
    for x in arr:
        count[x - min_val] += 1
    for i in range(1, len(count)):
        count[i] += count[i - 1]
    output = [0] * len(arr)
    for x in reversed(arr):
        output[count[x - min_val] - 1] = x
        count[x - min_val] -= 1
    return output`,
      typescript: `export function countingSort(arr: number[]): number[] {
  if (arr.length === 0) return [];
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = new Array(arr.length);
  for (const x of arr) count[x - min]++;
  for (let i = 1; i < range; i++) count[i] += count[i - 1];
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i] - min] - 1] = arr[i];
    count[arr[i] - min]--;
  }
  return output;
}`,
    },
    lineExplanations: {
      1: {
        statement: 'int range = max - min + 1;',
        does: 'Determines the spread of discrete values.',
        why: 'Allocates the correct size frequency table.',
        variableModified: 'range',
        sortingEffect: 'Prepares memory for bucket indices.',
      },
      2: {
        statement: 'count[arr[i] - min]++;',
        does: 'Counts how many times each value appears.',
        why: 'Non-comparison statistical frequency mapping.',
        variableModified: 'count array',
        sortingEffect: 'Maps inputs to frequencies.',
      },
      3: {
        statement: 'count[i] += count[i - 1];',
        does: 'Computes cumulative prefix sum.',
        why: 'Gives the 1-based index where each value should end.',
        variableModified: 'count array',
        sortingEffect: 'Calculates target output positions.',
      },
      4: {
        statement: 'output[count[arr[i] - min] - 1] = arr[i];',
        does: 'Places element in its exact sorted position.',
        why: 'Direct address placement in O(1).',
        variableModified: 'output array',
        sortingEffect: 'Produces stable sorted output.',
      },
    },
  },

  radix: {
    id: 'radix',
    name: 'Radix Sort',
    level: 'Advanced',
    shortDescription: 'Sorts numbers digit by digit from least significant digit (LSD) to most significant digit (MSD).',
    definition: 'Radix Sort is a non-comparison sorting algorithm that avoids comparison by creating and classifying elements into buckets based on their radix (digits or letters). LSD Radix Sort processes digits from rightmost to leftmost using a stable sub-sort.',
    workingPrinciple: 'Processes numbers across d passes, where d is the number of digits in the maximum element. In pass 1, stably sorts by units digit (10^0). In pass 2, by tens digit (10^1), and so on up to the highest digit. Because each pass uses a stable subroutine (Counting Sort), the overall relative ordering is preserved.',
    realWorldAnalogy: 'Sorting punch cards or telephone numbers in an old telecommunications switchboard by sorting first by the last digit, then second last digit, moving leftwards until numbers are in alphabetical/numerical order.',
    flowchartSteps: [
      { step: 'Start', detail: 'Find max element to determine total digits d' },
      { step: 'Loop exp = 1, 10, 100...', detail: 'While max / exp > 0' },
      { step: 'Call Stable Counting Sort', detail: 'Sort array based on current digit (arr[i]/exp)%10' },
      { step: 'Next Digit', detail: 'Multiply exp by 10' },
      { step: 'End', detail: 'Array sorted across all digit places' },
    ],
    timeComplexity: {
      best: 'O(d * (n + b))',
      average: 'O(d * (n + b))',
      worst: 'O(d * (n + b))',
      reasoning: 'd is the number of digits (log_b(max)), n is the number of elements, and b is the base (typically 10 for decimal). For fixed-width integers (e.g. 32-bit), d is a small constant, making it essentially O(n).',
    },
    spaceComplexity: {
      complexity: 'O(n + b)',
      reasoning: 'Requires output array of size n and count bucket array of size b (10 for decimal digits).',
    },
    stability: true,
    stabilityExplanation: 'Strictly stable because each digit pass utilizes a stable Counting Sort subroutine.',
    inPlace: false,
    adaptive: false,
    advantages: [
      'Linear time complexity O(d * n) when digit length d is small.',
      'Exceptionally fast for fixed-length keys like phone numbers, zip codes, IP addresses.',
      'Stable sorting algorithm.',
    ],
    disadvantages: [
      'High constant factor compared to quicksort.',
      'Requires auxiliary memory for the digit buckets.',
    ],
    applications: [
      'Sorting 32-bit or 64-bit integer keys in GPUs and high-throughput network routers.',
      'Sorting zip codes, postal addresses, and uniform-length barcode numbers.',
    ],
    vivaQuestions: [
      {
        question: 'What is the difference between LSD and MSD Radix Sort?',
        answer: 'LSD (Least Significant Digit) sorts from right to left using stable counting sort. MSD (Most Significant Digit) sorts from left to right using recursive bucket partitions.',
        difficulty: 'Medium',
      },
      {
        question: 'Why must the subroutine used in Radix Sort be stable?',
        answer: 'Because if the subroutine were not stable, sorting by a higher digit would scramble the established order of lower digits from earlier passes.',
        difficulty: 'Hard',
      },
    ],
    codeSnippets: {
      c: `void countSortByDigit(int arr[], int n, int exp) {
    int output[n], count[10] = {0};
    for (int i = 0; i < n; i++) count[(arr[i] / exp) % 10]++;
    for (int i = 1; i < 10; i++) count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }
    for (int i = 0; i < n; i++) arr[i] = output[i];
}

void radixSort(int arr[], int n) {
    int m = arr[0];
    for (int i = 1; i < n; i++) if (arr[i] > m) m = arr[i];
    for (int exp = 1; m / exp > 0; exp *= 10)
        countSortByDigit(arr, n, exp);
}`,
      cpp: `void radixSort(std::vector<int>& arr) {
    if (arr.empty()) return;
    int m = *std::max_element(arr.begin(), arr.end());
    for (int exp = 1; m / exp > 0; exp *= 10) {
        std::vector<int> output(arr.size()), count(10, 0);
        for (int x : arr) count[(x / exp) % 10]++;
        for (int i = 1; i < 10; ++i) count[i] += count[i - 1];
        for (int i = arr.size() - 1; i >= 0; --i) {
            output[count[(arr[i] / exp) % 10] - 1] = arr[i];
            count[(arr[i] / exp) % 10]--;
        }
        arr = output;
    }
}`,
      java: `public static void radixSort(int[] arr) {
    int m = Arrays.stream(arr).max().getAsInt();
    for (int exp = 1; m / exp > 0; exp *= 10) {
        int[] output = new int[arr.length];
        int[] count = new int[10];
        for (int x : arr) count[(x / exp) % 10]++;
        for (int i = 1; i < 10; i++) count[i] += count[i - 1];
        for (int i = arr.length - 1; i >= 0; i--) {
            output[count[(arr[i] / exp) % 10] - 1] = arr[i];
            count[(arr[i] / exp) % 10]--;
        }
        System.arraycopy(output, 0, arr, 0, arr.length);
    }
}`,
      python: `def radix_sort(arr: list[int]) -> list[int]:
    if not arr: return []
    max_val = max(arr)
    exp = 1
    while max_val // exp > 0:
        count = [0] * 10
        output = [0] * len(arr)
        for x in arr:
            count[(x // exp) % 10] += 1
        for i in range(1, 10):
            count[i] += count[i - 1]
        for x in reversed(arr):
            digit = (x // exp) % 10
            output[count[digit] - 1] = x
            count[digit] -= 1
        arr = output
        exp *= 10
    return arr`,
      typescript: `export function radixSort(arr: number[]): number[] {
  if (arr.length === 0) return [];
  const max = Math.max(...arr);
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    const output = new Array(arr.length);
    const count = new Array(10).fill(0);
    for (let i = 0; i < arr.length; i++) count[Math.floor(arr[i] / exp) % 10]++;
    for (let i = 1; i < 10; i++) count[i] += count[i - 1];
    for (let i = arr.length - 1; i >= 0; i--) {
      const digit = Math.floor(arr[i] / exp) % 10;
      output[count[digit] - 1] = arr[i];
      count[digit]--;
    }
    for (let i = 0; i < arr.length; i++) arr[i] = output[i];
  }
  return arr;
}`,
    },
    lineExplanations: {
      1: {
        statement: 'for (int exp = 1; m / exp > 0; exp *= 10)',
        does: 'Loops through digit places: 1s, 10s, 100s, etc.',
        why: 'Ensures every digit place is systematically sorted.',
        variableModified: 'exp',
        sortingEffect: 'Controls the current radix significance.',
      },
      2: {
        statement: 'int digit = (arr[i] / exp) % 10;',
        does: 'Extracts the digit at the current exponential place.',
        why: 'Determines the bucket assignment (0-9).',
        variableModified: 'digit',
        sortingEffect: 'Isolates single digit for radix binning.',
      },
      3: {
        statement: 'output[count[digit] - 1] = arr[i]; count[digit]--;',
        does: 'Stably places element in digit-sorted output.',
        why: 'Preserves lower-digit order established in earlier iterations.',
        variableModified: 'output array, count array',
        sortingEffect: 'Consolidates multi-digit ordering.',
      },
    },
  },

  bucket: {
    id: 'bucket',
    name: 'Bucket Sort',
    level: 'Advanced',
    shortDescription: 'Distributes elements into a number of buckets, sorts each bucket individually, and concatenates.',
    definition: 'Bucket Sort distributes array elements into a number of uniformly partitioned buckets. Each bucket is then sorted individually, either using a different sorting algorithm or recursively, and the sorted buckets are concatenated.',
    workingPrinciple: '1. Set up k empty buckets over the interval [min, max]. 2. Scatter: Put each element arr[i] into bucket floor(k * (arr[i]-min)/(max-min)). 3. Sort: Sort each non-empty bucket with an efficient algorithm like Insertion Sort. 4. Gather: Concatenate all buckets in sequence.',
    realWorldAnalogy: 'Sorting incoming mail in a post office: postal workers first toss letters into region bins (City, State, Out of State), then sort the letters inside each bin alphabetically.',
    flowchartSteps: [
      { step: 'Start', detail: 'Initialize k buckets as empty lists' },
      { step: 'Scatter Phase', detail: 'For each arr[i], compute bucket index and append' },
      { step: 'Sort Phase', detail: 'Sort each individual bucket (using Insertion Sort)' },
      { step: 'Gather Phase', detail: 'Concatenate all bucket contents back into original array' },
      { step: 'End', detail: 'Array fully sorted' },
    ],
    timeComplexity: {
      best: 'O(n + k)',
      average: 'O(n + k)',
      worst: 'O(n²)',
      reasoning: 'When input data is uniformly distributed across the range, each bucket receives O(1) elements, and sorting buckets takes linear time O(n). Worst case O(n²) occurs when all elements cluster into a single bucket.',
    },
    spaceComplexity: {
      complexity: 'O(n + k)',
      reasoning: 'Requires storage for k buckets and their dynamic element lists.',
    },
    stability: true,
    stabilityExplanation: 'Stable if the underlying algorithm used to sort individual buckets is stable (like Insertion Sort).',
    inPlace: false,
    adaptive: false,
    advantages: [
      'Very fast O(n + k) linear average time for uniformly distributed numbers.',
      'Easily parallelizable: individual buckets can be sorted independently across multi-core processors.',
    ],
    disadvantages: [
      'Severely degrades to O(n²) if data is highly skewed or clustered.',
      'Requires knowledge of data distribution and range beforehand.',
    ],
    applications: [
      'Sorting floating point numbers uniformly distributed over [0, 1).',
      'Geographic coordinate sorting (latitude/longitude clustering).',
    ],
    vivaQuestions: [
      {
        question: 'Under what assumption does Bucket Sort achieve O(n) average time complexity?',
        answer: 'Under the assumption that the input numbers are uniformly and independently distributed across the range.',
        difficulty: 'Medium',
      },
      {
        question: 'What happens to Bucket Sort if all elements map into a single bucket?',
        answer: 'It degrades to the complexity of the sorting algorithm used on that single bucket, typically O(n²) if Insertion Sort is used.',
        difficulty: 'Easy',
      },
    ],
    codeSnippets: {
      c: `void bucketSort(float arr[], int n) {
    // Conceptual bucket sort in C
    // Uses linked lists or dynamic arrays for k buckets
}`,
      cpp: `void bucketSort(std::vector<float>& arr) {
    int n = arr.size();
    if (n <= 0) return;
    std::vector<std::vector<float>> b(n);
    for (int i = 0; i < n; i++) {
        int bi = n * arr[i];
        if (bi >= n) bi = n - 1;
        b[bi].push_back(arr[i]);
    }
    for (int i = 0; i < n; i++)
        std::sort(b[i].begin(), b[i].end());
    int index = 0;
    for (int i = 0; i < n; i++)
        for (float val : b[i]) arr[index++] = val;
}`,
      java: `public static void bucketSort(float[] arr) {
    int n = arr.length;
    if (n <= 0) return;
    List<Float>[] buckets = new ArrayList[n];
    for (int i = 0; i < n; i++) buckets[i] = new ArrayList<>();
    for (float v : arr) {
        int bi = (int) (n * v);
        if (bi >= n) bi = n - 1;
        buckets[bi].add(v);
    }
    for (List<Float> bucket : buckets) Collections.sort(bucket);
    int index = 0;
    for (List<Float> bucket : buckets)
        for (float v : bucket) arr[index++] = v;
}`,
      python: `def bucket_sort(arr: list[float]) -> list[float]:
    if not arr: return []
    min_v, max_v = min(arr), max(arr)
    bucket_count = max(3, len(arr) // 2)
    bucket_range = (max_v - min_v + 1) / bucket_count
    buckets = [[] for _ in range(bucket_count)]
    for x in arr:
        idx = int((x - min_v) / bucket_range)
        buckets[min(idx, bucket_count - 1)].append(x)
    result = []
    for b in buckets:
        result.extend(sorted(b))
    return result`,
      typescript: `export function bucketSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const count = Math.max(3, Math.min(10, Math.floor(arr.length / 3)));
  const range = (max - min + 1) / count;
  const buckets: number[][] = Array.from({ length: count }, () => []);
  for (const x of arr) {
    const idx = Math.min(count - 1, Math.floor((x - min) / range));
    buckets[idx].push(x);
  }
  return buckets.flatMap(b => b.sort((a, b) => a - b));
}`,
    },
    lineExplanations: {
      1: {
        statement: 'int bi = (int) (n * arr[i]);',
        does: 'Maps input value into corresponding bucket index.',
        why: 'Distributes elements evenly across partitions.',
        variableModified: 'bi',
        sortingEffect: 'Categorizes elements into ordered sub-ranges.',
      },
      2: {
        statement: 'buckets[bi].add(arr[i]);',
        does: 'Appends value to targeted bucket list.',
        why: 'Collects bucket elements for subsequent local sorting.',
        variableModified: 'buckets array',
        sortingEffect: 'Completes scatter phase.',
      },
      3: {
        statement: 'for (List bucket : buckets) Collections.sort(bucket);',
        does: 'Sorts individual small buckets.',
        why: 'Uniform distribution keeps bucket sizes small (O(1)).',
        variableModified: 'Individual bucket lists',
        sortingEffect: 'Sorts sub-ranges.',
      },
      4: {
        statement: 'arr[index++] = v;',
        does: 'Gathers all elements sequentially from bucket 0 to k-1.',
        why: 'Buckets are already in mutual relative order.',
        variableModified: 'Original array arr',
        sortingEffect: 'Completes gather phase to yield fully sorted list.',
      },
    },
  },
};
