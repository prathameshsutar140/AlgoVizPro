import { PracticalGuide } from '../types';

export const PRACTICALS_DATA: PracticalGuide[] = [
  {
    id: 'prac-1',
    practicalNumber: 1,
    algorithmId: 'bubble',
    title: 'Implementation of Bubble Sort Algorithm in C',
    aim: 'To write, compile, and execute a C program to arrange a given list of N elements in ascending order using the Bubble Sort technique and analyze its time complexity.',
    prerequisites: [
      'Concept of single-dimensional arrays in C',
      'Knowledge of nested for loops and conditionals',
      'Understanding of temporary variable swapping mechanism',
    ],
    algorithmSteps: [
      'Step 1: Start the program.',
      'Step 2: Read the number of elements N from the user.',
      'Step 3: Read N elements into an integer array arr[].',
      'Step 4: Execute outer loop with counter i from 0 to N-2.',
      'Step 5: Set flag swapped = 0.',
      'Step 6: Execute inner loop with counter j from 0 to N-i-2.',
      'Step 7: Compare adjacent elements: if arr[j] > arr[j+1], swap them and set swapped = 1.',
      'Step 8: If swapped == 0 after inner loop, break out of outer loop.',
      'Step 9: Display the sorted array.',
      'Step 10: Stop.',
    ],
    flowchartDescription: 'Start -> Input N -> Input array elements -> Outer loop i=0 to N-2 -> swapped=0 -> Inner loop j=0 to N-i-2 -> Is arr[j] > arr[j+1]? -> [Yes: Swap, swapped=1] [No: Continue] -> Is swapped==0? [Yes: Break] -> Display Sorted Array -> End.',
    completeProgramC: `#include <stdio.h>

void bubbleSort(int arr[], int n) {
    int i, j, temp, swapped;
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
        if (swapped == 0)
            break;
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Original array:\\n");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    
    bubbleSort(arr, n);
    
    printf("Sorted array in ascending order:\\n");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    
    return 0;
}`,
    sampleInput: 'Enter N: 7\nEnter elements: 64 34 25 12 22 11 90',
    sampleOutput: 'Original array: 64 34 25 12 22 11 90\nSorted array in ascending order: 11 12 22 25 34 64 90',
    resultConclusion: 'The Bubble Sort algorithm was successfully implemented in C. In the best case (sorted array), it terminates in O(n) time, and in average/worst case it takes O(n²) time with O(1) space.',
    vivaQuestions: [
      {
        question: 'What is the role of the inner loop in Bubble Sort?',
        answer: 'The inner loop conducts adjacent comparisons and swaps from the start of the array up to the unsorted boundary, bubbling the highest remaining element to the end.',
      },
      {
        question: 'Why does the inner loop terminate at (n - i - 1)?',
        answer: 'Because after i passes, the last i elements are already in their permanent, sorted positions, making further comparisons redundant.',
      },
      {
        question: 'What is the minimum number of comparisons in Bubble Sort?',
        answer: 'With the swapped flag optimization, an already sorted array requires only n - 1 comparisons (O(n) time).',
      },
    ],
  },
  {
    id: 'prac-2',
    practicalNumber: 2,
    algorithmId: 'selection',
    title: 'Implementation of Selection Sort Algorithm in C',
    aim: 'To write, compile, and execute a C program to sort an array of N integers using Selection Sort and observe the total number of swaps and comparisons.',
    prerequisites: [
      'Array indexing and element traversal in C',
      'Linear search for minimum element index',
    ],
    algorithmSteps: [
      'Step 1: Start.',
      'Step 2: Read array size N and N integer elements.',
      'Step 3: Outer loop i from 0 to N-2.',
      'Step 4: Assume minimum element is at index i: set min_idx = i.',
      'Step 5: Inner loop j from i+1 to N-1.',
      'Step 6: If arr[j] < arr[min_idx], update min_idx = j.',
      'Step 7: If min_idx != i, swap arr[i] with arr[min_idx].',
      'Step 8: Repeat until outer loop completes.',
      'Step 9: Print sorted array.',
      'Step 10: Stop.',
    ],
    flowchartDescription: 'Start -> Input N and array -> Loop i=0 to N-2 -> min_idx = i -> Loop j=i+1 to N-1 -> Is arr[j] < arr[min_idx]? [Yes: min_idx = j] -> Is min_idx != i? [Yes: Swap arr[i] and arr[min_idx]] -> Print array -> Stop.',
    completeProgramC: `#include <stdio.h>

void selectionSort(int arr[], int n) {
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
}

int main() {
    int arr[] = {29, 10, 14, 37, 13};
    int n = sizeof(arr) / sizeof(arr[0]);
    selectionSort(arr, n);
    printf("Sorted array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
    sampleInput: 'Input array: 29 10 14 37 13',
    sampleOutput: 'Sorted array: 10 13 14 29 37',
    resultConclusion: 'Selection Sort was successfully implemented. It minimizes swaps to O(n) (at most n-1 swaps), while always requiring O(n²) comparisons in all cases.',
    vivaQuestions: [
      {
        question: 'Why does Selection Sort perform at most n-1 swaps?',
        answer: 'Because exactly one swap is executed per outer loop iteration to place the found minimum into position i.',
      },
      {
        question: 'Is Selection Sort an adaptive sorting algorithm?',
        answer: 'No, it is non-adaptive because its running time is always O(n²) regardless of whether the array is already sorted or random.',
      },
    ],
  },
  {
    id: 'prac-3',
    practicalNumber: 3,
    algorithmId: 'insertion',
    title: 'Implementation of Insertion Sort Algorithm in C',
    aim: 'To write, compile, and execute a C program to sort elements in ascending order using Insertion Sort and verify its behavior on nearly sorted data.',
    prerequisites: [
      'While loops and conditional checks in C',
      'Concept of shifting array elements rightward to create space',
    ],
    algorithmSteps: [
      'Step 1: Start.',
      'Step 2: Read array size N and array elements.',
      'Step 3: Loop i from 1 to N-1.',
      'Step 4: Pick key = arr[i] and set j = i - 1.',
      'Step 5: While j >= 0 and arr[j] > key:',
      '        arr[j+1] = arr[j] (shift right), decrement j.',
      'Step 6: Place key at arr[j+1].',
      'Step 7: Repeat until entire array is scanned.',
      'Step 8: Output sorted array.',
      'Step 9: Stop.',
    ],
    flowchartDescription: 'Start -> Input array -> Loop i=1 to N-1 -> key = arr[i], j=i-1 -> While j>=0 and arr[j]>key -> Shift arr[j] to arr[j+1], j-- -> arr[j+1] = key -> Next i -> Print array -> Stop.',
    completeProgramC: `#include <stdio.h>

void insertionSort(int arr[], int n) {
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
}

int main() {
    int arr[] = {12, 11, 13, 5, 6};
    int n = sizeof(arr) / sizeof(arr[0]);
    insertionSort(arr, n);
    printf("Sorted array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
    sampleInput: 'Input array: 12 11 13 5 6',
    sampleOutput: 'Sorted array: 5 6 11 12 13',
    resultConclusion: 'Insertion Sort was successfully implemented. It exhibits outstanding performance for small and nearly sorted arrays (O(n) time) and maintains stability.',
    vivaQuestions: [
      {
        question: 'Why is Insertion Sort considered an online algorithm?',
        answer: 'Because it can sort incoming data on-the-fly as it is received, inserting each new element into its proper position in the already sorted prefix.',
      },
      {
        question: 'What is the best case complexity of Insertion Sort?',
        answer: 'O(n) when the array is already sorted, because the while condition arr[j] > key fails on the very first comparison.',
      },
    ],
  },
  {
    id: 'prac-4',
    practicalNumber: 4,
    algorithmId: 'merge',
    title: 'Implementation of Merge Sort Algorithm Using Recursion in C',
    aim: 'To write, compile, and execute a C program to implement the Divide and Conquer Merge Sort algorithm and demonstrate O(n log n) performance.',
    prerequisites: [
      'Recursion fundamentals in C',
      'Merging two sorted arrays into an auxiliary array',
    ],
    algorithmSteps: [
      'Step 1: Start.',
      'Step 2: Read N elements.',
      'Step 3: Define mergeSort(arr, left, right):',
      '        If left < right:',
      '        Calculate mid = left + (right - left) / 2',
      '        Call mergeSort(arr, left, mid)',
      '        Call mergeSort(arr, mid + 1, right)',
      '        Call merge(arr, left, mid, right)',
      'Step 4: Define merge(arr, left, mid, right):',
      '        Create temporary subarrays L and R',
      '        Compare elements and place smaller in original array',
      '        Copy remaining elements',
      'Step 5: Print sorted array.',
      'Step 6: Stop.',
    ],
    flowchartDescription: 'Start -> Input array -> mergeSort(arr, 0, N-1) -> Is left < right? -> mid = (left+right)/2 -> mergeSort(left half) -> mergeSort(right half) -> merge(both halves) -> Print array -> Stop.',
    completeProgramC: `#include <stdio.h>

void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
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
}

int main() {
    int arr[] = {38, 27, 43, 3, 9, 82, 10};
    int n = sizeof(arr) / sizeof(arr[0]);
    mergeSort(arr, 0, n - 1);
    printf("Sorted array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
    sampleInput: 'Input array: 38 27 43 3 9 82 10',
    sampleOutput: 'Sorted array: 3 9 10 27 38 43 82',
    resultConclusion: 'Merge Sort was successfully implemented. It guarantees O(n log n) running time in all scenarios, preserving stability at the expense of O(n) auxiliary memory.',
    vivaQuestions: [
      {
        question: 'Which design strategy does Merge Sort employ?',
        answer: 'The Divide and Conquer algorithmic paradigm.',
      },
      {
        question: 'What is the recurrence relation for Merge Sort?',
        answer: 'T(n) = 2T(n/2) + O(n), which solves to O(n log n).',
      },
    ],
  },
  {
    id: 'prac-5',
    practicalNumber: 5,
    algorithmId: 'quick',
    title: 'Implementation of Quick Sort Algorithm in C',
    aim: 'To write, compile, and execute a C program to implement Quick Sort using the Lomuto partitioning scheme.',
    prerequisites: [
      'Recursion and partitioning concept',
      'Choosing pivot and rearranging elements relative to pivot',
    ],
    algorithmSteps: [
      'Step 1: Start.',
      'Step 2: Read N elements into arr.',
      'Step 3: Define partition(arr, low, high):',
      '        Choose pivot = arr[high]',
      '        Initialize i = low - 1',
      '        For j = low to high - 1: if arr[j] <= pivot, i++, swap arr[i] with arr[j]',
      '        Swap arr[i+1] with arr[high]',
      '        Return pivot index i + 1',
      'Step 4: Define quickSort(arr, low, high):',
      '        If low < high:',
      '        pi = partition(arr, low, high)',
      '        quickSort(arr, low, pi - 1)',
      '        quickSort(arr, pi + 1, high)',
      'Step 5: Print sorted array.',
      'Step 6: Stop.',
    ],
    flowchartDescription: 'Start -> Input array -> quickSort(arr, 0, N-1) -> Is low < high? -> partition() selects pivot -> Places pivot in sorted slot pi -> Recurse on left (low..pi-1) -> Recurse on right (pi+1..high) -> Print array -> Stop.',
    completeProgramC: `#include <stdio.h>

void swap(int* a, int* b) {
    int t = *a; *a = *b; *b = t;
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return (i + 1);
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    int arr[] = {10, 80, 30, 90, 40, 50, 70};
    int n = sizeof(arr) / sizeof(arr[0]);
    quickSort(arr, 0, n - 1);
    printf("Sorted array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
    sampleInput: 'Input array: 10 80 30 90 40 50 70',
    sampleOutput: 'Sorted array: 10 30 40 50 70 80 90',
    resultConclusion: 'Quick Sort was successfully implemented. In practice, its average time complexity is O(n log n) with excellent cache locality, though worst-case time is O(n²).',
    vivaQuestions: [
      {
        question: 'What is the function of the partition procedure?',
        answer: 'To position the pivot element in its final sorted index while ensuring that all elements smaller than the pivot precede it and all larger elements succeed it.',
      },
      {
        question: 'Why is QuickSort preferred over MergeSort for main memory sorting?',
        answer: 'QuickSort is in-place and has smaller constant factor overhead and superior cache performance compared to MergeSort.',
      },
    ],
  },
];
