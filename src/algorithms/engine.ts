import { AlgorithmId, SortEvent, SortMetrics } from '../types';

export interface AlgorithmExecutionResult {
  events: SortEvent[];
  sortedArray: number[];
  metrics: SortMetrics;
}

// Helper to create an event
function createEvent(
  id: number,
  type: SortEvent['type'],
  indices: number[],
  array: number[],
  explanation: string,
  extra?: Partial<SortEvent>
): SortEvent {
  return {
    id,
    type,
    indices: [...indices],
    values: indices.map((idx) => array[idx]),
    arraySnapshot: [...array],
    explanation,
    ...extra,
  };
}

// 1. Bubble Sort
export function generateBubbleSortEvents(input: number[]): AlgorithmExecutionResult {
  const arr = [...input];
  const events: SortEvent[] = [];
  let eventId = 0;
  let comparisons = 0;
  let swaps = 0;
  let writes = 0;
  const n = arr.length;
  const sortedIndices: number[] = [];

  const startTime = performance.now();

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      events.push(
        createEvent(
          eventId++,
          'compare',
          [j, j + 1],
          arr,
          `Pass ${i + 1}: Comparing arr[${j}]=${arr[j]} with adjacent arr[${j + 1}]=${arr[j + 1]}.`,
          { sortedIndices: [...sortedIndices] }
        )
      );

      if (arr[j] > arr[j + 1]) {
        // Swap
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swaps++;
        writes += 2;
        swapped = true;

        events.push(
          createEvent(
            eventId++,
            'swap',
            [j, j + 1],
            arr,
            `arr[${j}] (${arr[j + 1]}) > arr[${j + 1}] (${arr[j]}), so swapping elements to bubble the larger value rightward.`,
            { sortedIndices: [...sortedIndices] }
          )
        );
      }
    }

    // The element at n - 1 - i is now in its final sorted position
    sortedIndices.push(n - 1 - i);
    events.push(
      createEvent(
        eventId++,
        'mark-sorted',
        [n - 1 - i],
        arr,
        `Element ${arr[n - 1 - i]} at index ${n - 1 - i} is now confirmed sorted in its correct final location.`,
        { sortedIndices: [...sortedIndices] }
      )
    );

    // Optimization: if no two elements were swapped in this pass, array is sorted
    if (!swapped) {
      events.push(
        createEvent(
          eventId++,
          'active',
          [],
          arr,
          `Optimization: No swaps occurred in pass ${i + 1}. Array is already fully sorted. Breaking early!`,
          { sortedIndices: Array.from({ length: n }, (_, k) => k) }
        )
      );
      break;
    }
  }

  // Ensure index 0 marked sorted
  const allSorted = Array.from({ length: n }, (_, k) => k);
  events.push(
    createEvent(
      eventId++,
      'complete',
      allSorted,
      arr,
      `Bubble Sort completed successfully. Total ${comparisons} comparisons and ${swaps} swaps.`,
      { sortedIndices: allSorted }
    )
  );

  const durationMs = performance.now() - startTime;
  return {
    events,
    sortedArray: arr,
    metrics: { comparisons, swaps, writes, totalSteps: events.length, durationMs },
  };
}

// 2. Selection Sort
export function generateSelectionSortEvents(input: number[]): AlgorithmExecutionResult {
  const arr = [...input];
  const events: SortEvent[] = [];
  let eventId = 0;
  let comparisons = 0;
  let swaps = 0;
  let writes = 0;
  const n = arr.length;
  const sortedIndices: number[] = [];

  const startTime = performance.now();

  for (let i = 0; i < n; i++) {
    let minIdx = i;
    events.push(
      createEvent(
        eventId++,
        'active',
        [i],
        arr,
        `Starting pass ${i + 1}. Current assumed minimum is arr[${i}]=${arr[i]} at index ${i}.`,
        { sortedIndices: [...sortedIndices], pivotIndex: i }
      )
    );

    for (let j = i + 1; j < n; j++) {
      comparisons++;
      events.push(
        createEvent(
          eventId++,
          'compare',
          [j, minIdx],
          arr,
          `Comparing candidate arr[${j}]=${arr[j]} with current minimum arr[${minIdx}]=${arr[minIdx]}.`,
          { sortedIndices: [...sortedIndices], pivotIndex: minIdx }
        )
      );

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        events.push(
          createEvent(
            eventId++,
            'pivot',
            [minIdx],
            arr,
            `Found new smaller minimum: arr[${minIdx}]=${arr[minIdx]} at index ${minIdx}.`,
            { sortedIndices: [...sortedIndices], pivotIndex: minIdx }
          )
        );
      }
    }

    if (minIdx !== i) {
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
      swaps++;
      writes += 2;

      events.push(
        createEvent(
          eventId++,
          'swap',
          [i, minIdx],
          arr,
          `Swapping minimum element arr[${minIdx}] (${arr[minIdx]}) into target sorted position arr[${i}] (${arr[i]}).`,
          { sortedIndices: [...sortedIndices] }
        )
      );
    } else {
      events.push(
        createEvent(
          eventId++,
          'active',
          [i],
          arr,
          `Minimum element is already at index ${i}. No swap needed.`,
          { sortedIndices: [...sortedIndices] }
        )
      );
    }

    sortedIndices.push(i);
    events.push(
      createEvent(
        eventId++,
        'mark-sorted',
        [i],
        arr,
        `Element ${arr[i]} placed in sorted region at index ${i}.`,
        { sortedIndices: [...sortedIndices] }
      )
    );
  }

  const allSorted = Array.from({ length: n }, (_, k) => k);
  events.push(
    createEvent(
      eventId++,
      'complete',
      allSorted,
      arr,
      `Selection Sort complete. Found minimum for every position. Total ${comparisons} comparisons and ${swaps} swaps.`,
      { sortedIndices: allSorted }
    )
  );

  const durationMs = performance.now() - startTime;
  return {
    events,
    sortedArray: arr,
    metrics: { comparisons, swaps, writes, totalSteps: events.length, durationMs },
  };
}

// 3. Insertion Sort
export function generateInsertionSortEvents(input: number[]): AlgorithmExecutionResult {
  const arr = [...input];
  const events: SortEvent[] = [];
  let eventId = 0;
  let comparisons = 0;
  let swaps = 0;
  let writes = 0;
  const n = arr.length;
  const sortedIndices: number[] = [0];

  const startTime = performance.now();

  events.push(
    createEvent(
      eventId++,
      'mark-sorted',
      [0],
      arr,
      `Base case: Single element arr[0]=${arr[0]} is trivially sorted.`,
      { sortedIndices: [0] }
    )
  );

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    events.push(
      createEvent(
        eventId++,
        'active',
        [i],
        arr,
        `Extracting key element arr[${i}]=${key} to insert into the sorted subarray [0..${i - 1}].`,
        { sortedIndices: [...sortedIndices], pivotIndex: i }
      )
    );

    while (j >= 0) {
      comparisons++;
      events.push(
        createEvent(
          eventId++,
          'compare',
          [j, i],
          arr,
          `Comparing sorted element arr[${j}]=${arr[j]} with key value ${key}.`,
          { sortedIndices: [...sortedIndices], pivotIndex: i }
        )
      );

      if (arr[j] > key) {
        // Shift right
        arr[j + 1] = arr[j];
        writes++;
        swaps++; // Count shifting as movement
        events.push(
          createEvent(
            eventId++,
            'write',
            [j + 1, j],
            arr,
            `arr[${j}]=${arr[j]} > ${key}. Shifting ${arr[j]} rightward to index ${j + 1}.`,
            { sortedIndices: [...sortedIndices], pivotIndex: i }
          )
        );
        j--;
      } else {
        events.push(
          createEvent(
            eventId++,
            'active',
            [j],
            arr,
            `arr[${j}]=${arr[j]} <= ${key}. Correct insertion position found at index ${j + 1}.`,
            { sortedIndices: [...sortedIndices], pivotIndex: i }
          )
        );
        break;
      }
    }

    arr[j + 1] = key;
    writes++;
    sortedIndices.push(i);

    events.push(
      createEvent(
        eventId++,
        'write',
        [j + 1],
        arr,
        `Inserted key ${key} at index ${j + 1}. Subarray [0..${i}] is now sorted.`,
        { sortedIndices: [...sortedIndices] }
      )
    );
  }

  const allSorted = Array.from({ length: n }, (_, k) => k);
  events.push(
    createEvent(
      eventId++,
      'complete',
      allSorted,
      arr,
      `Insertion Sort complete. Total ${comparisons} comparisons and ${writes} writes.`,
      { sortedIndices: allSorted }
    )
  );

  const durationMs = performance.now() - startTime;
  return {
    events,
    sortedArray: arr,
    metrics: { comparisons, swaps, writes, totalSteps: events.length, durationMs },
  };
}

// 4. Merge Sort
export function generateMergeSortEvents(input: number[]): AlgorithmExecutionResult {
  const arr = [...input];
  const events: SortEvent[] = [];
  let eventId = 0;
  let comparisons = 0;
  let swaps = 0;
  let writes = 0;
  const n = arr.length;
  const sortedIndices = new Set<number>();

  const startTime = performance.now();

  function merge(left: number, mid: number, right: number) {
    events.push(
      createEvent(
        eventId++,
        'subsegment',
        [left, right],
        arr,
        `Merging sorted subarrays: [${left}..${mid}] and [${mid + 1}..${right}].`,
        { subsegment: [left, right], sortedIndices: Array.from(sortedIndices) }
      )
    );

    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftArr.length && j < rightArr.length) {
      comparisons++;
      events.push(
        createEvent(
          eventId++,
          'compare',
          [left + i, mid + 1 + j],
          arr,
          `Comparing left subelement (${leftArr[i]}) at [${left + i}] with right subelement (${rightArr[j]}) at [${mid + 1 + j}].`,
          { subsegment: [left, right], sortedIndices: Array.from(sortedIndices) }
        )
      );

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        writes++;
        events.push(
          createEvent(
            eventId++,
            'write',
            [k],
            arr,
            `Placing ${leftArr[i]} from left subarray into merged position [${k}].`,
            { subsegment: [left, right], sortedIndices: Array.from(sortedIndices) }
          )
        );
        i++;
      } else {
        arr[k] = rightArr[j];
        writes++;
        swaps++;
        events.push(
          createEvent(
            eventId++,
            'write',
            [k],
            arr,
            `Placing smaller ${rightArr[j]} from right subarray into merged position [${k}].`,
            { subsegment: [left, right], sortedIndices: Array.from(sortedIndices) }
          )
        );
        j++;
      }
      k++;
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      writes++;
      events.push(
        createEvent(
          eventId++,
          'write',
          [k],
          arr,
          `Copying remaining left subarray element ${leftArr[i]} to index [${k}].`,
          { subsegment: [left, right], sortedIndices: Array.from(sortedIndices) }
        )
      );
      i++;
      k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      writes++;
      events.push(
        createEvent(
          eventId++,
          'write',
          [k],
          arr,
          `Copying remaining right subarray element ${rightArr[j]} to index [${k}].`,
          { subsegment: [left, right], sortedIndices: Array.from(sortedIndices) }
        )
      );
      j++;
      k++;
    }

    if (left === 0 && right === n - 1) {
      for (let idx = 0; idx < n; idx++) sortedIndices.add(idx);
    }
  }

  function mergeSortHelper(left: number, right: number) {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    mergeSortHelper(left, mid);
    mergeSortHelper(mid + 1, right);
    merge(left, mid, right);
  }

  mergeSortHelper(0, n - 1);

  const allSorted = Array.from({ length: n }, (_, k) => k);
  events.push(
    createEvent(
      eventId++,
      'complete',
      allSorted,
      arr,
      `Merge Sort complete. Divide-and-conquer combined all segments in O(n log n). Total ${comparisons} comparisons and ${writes} writes.`,
      { sortedIndices: allSorted }
    )
  );

  const durationMs = performance.now() - startTime;
  return {
    events,
    sortedArray: arr,
    metrics: { comparisons, swaps, writes, totalSteps: events.length, durationMs },
  };
}

// 5. Quick Sort (Lomuto Partition with pivot highlighting)
export function generateQuickSortEvents(input: number[]): AlgorithmExecutionResult {
  const arr = [...input];
  const events: SortEvent[] = [];
  let eventId = 0;
  let comparisons = 0;
  let swaps = 0;
  let writes = 0;
  const n = arr.length;
  const sortedIndices = new Set<number>();

  const startTime = performance.now();

  function partition(low: number, high: number): number {
    const pivot = arr[high];
    events.push(
      createEvent(
        eventId++,
        'pivot',
        [high],
        arr,
        `Subarray [${low}..${high}]: Chosen pivot arr[${high}]=${pivot}. Elements will be partitioned around ${pivot}.`,
        { pivotIndex: high, subsegment: [low, high], sortedIndices: Array.from(sortedIndices) }
      )
    );

    let i = low - 1;

    for (let j = low; j < high; j++) {
      comparisons++;
      events.push(
        createEvent(
          eventId++,
          'compare',
          [j, high],
          arr,
          `Comparing arr[${j}]=${arr[j]} with pivot ${pivot}.`,
          { pivotIndex: high, subsegment: [low, high], sortedIndices: Array.from(sortedIndices) }
        )
      );

      if (arr[j] <= pivot) {
        i++;
        if (i !== j) {
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          swaps++;
          writes += 2;
          events.push(
            createEvent(
              eventId++,
              'swap',
              [i, j],
              arr,
              `arr[${j}] (${arr[i]}) <= pivot ${pivot}. Swapped to left partition at index ${i}.`,
              { pivotIndex: high, subsegment: [low, high], sortedIndices: Array.from(sortedIndices) }
            )
          );
        }
      }
    }

    // Place pivot at its final spot (i + 1)
    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    swaps++;
    writes += 2;

    const finalPivotIndex = i + 1;
    sortedIndices.add(finalPivotIndex);

    events.push(
      createEvent(
        eventId++,
        'mark-sorted',
        [finalPivotIndex],
        arr,
        `Placed pivot ${pivot} into its permanent position at index ${finalPivotIndex}. All items on left <= ${pivot}, all items on right > ${pivot}.`,
        { pivotIndex: finalPivotIndex, sortedIndices: Array.from(sortedIndices) }
      )
    );

    return finalPivotIndex;
  }

  function quickSortHelper(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    } else if (low === high) {
      sortedIndices.add(low);
    }
  }

  quickSortHelper(0, n - 1);

  const allSorted = Array.from({ length: n }, (_, k) => k);
  events.push(
    createEvent(
      eventId++,
      'complete',
      allSorted,
      arr,
      `Quick Sort complete. Partitioning finished in O(n log n). Total ${comparisons} comparisons and ${swaps} swaps.`,
      { sortedIndices: allSorted }
    )
  );

  const durationMs = performance.now() - startTime;
  return {
    events,
    sortedArray: arr,
    metrics: { comparisons, swaps, writes, totalSteps: events.length, durationMs },
  };
}

// 6. Shell Sort
export function generateShellSortEvents(input: number[]): AlgorithmExecutionResult {
  const arr = [...input];
  const events: SortEvent[] = [];
  let eventId = 0;
  let comparisons = 0;
  let swaps = 0;
  let writes = 0;
  const n = arr.length;
  const sortedIndices = new Set<number>();

  const startTime = performance.now();

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    events.push(
      createEvent(
        eventId++,
        'active',
        [],
        arr,
        `Starting Shell Sort pass with diminishing gap = ${gap}. Comparing elements ${gap} positions apart.`,
        { sortedIndices: Array.from(sortedIndices) }
      )
    );

    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;

      events.push(
        createEvent(
          eventId++,
          'active',
          [i],
          arr,
          `Considering element arr[${i}]=${temp} for gapped insertion (gap=${gap}).`,
          { pivotIndex: i, sortedIndices: Array.from(sortedIndices) }
        )
      );

      while (j >= gap) {
        comparisons++;
        events.push(
          createEvent(
            eventId++,
            'compare',
            [j - gap, i],
            arr,
            `Comparing arr[${j - gap}]=${arr[j - gap]} with temp value ${temp}.`,
            { sortedIndices: Array.from(sortedIndices) }
          )
        );

        if (arr[j - gap] > temp) {
          arr[j] = arr[j - gap];
          writes++;
          swaps++;
          events.push(
            createEvent(
              eventId++,
              'write',
              [j, j - gap],
              arr,
              `arr[${j - gap}] > ${temp}. Moving element forward by gap distance ${gap} into position ${j}.`,
              { sortedIndices: Array.from(sortedIndices) }
            )
          );
          j -= gap;
        } else {
          break;
        }
      }

      arr[j] = temp;
      writes++;
      events.push(
        createEvent(
          eventId++,
          'write',
          [j],
          arr,
          `Placed element ${temp} into gapped slot at index ${j}.`,
          { sortedIndices: Array.from(sortedIndices) }
        )
      );
    }
  }

  const allSorted = Array.from({ length: n }, (_, k) => k);
  events.push(
    createEvent(
      eventId++,
      'complete',
      allSorted,
      arr,
      `Shell Sort complete. Gaps reduced to 1 (insertion sort on nearly sorted data). Total ${comparisons} comparisons and ${writes} writes.`,
      { sortedIndices: allSorted }
    )
  );

  const durationMs = performance.now() - startTime;
  return {
    events,
    sortedArray: arr,
    metrics: { comparisons, swaps, writes, totalSteps: events.length, durationMs },
  };
}

// 7. Heap Sort
export function generateHeapSortEvents(input: number[]): AlgorithmExecutionResult {
  const arr = [...input];
  const events: SortEvent[] = [];
  let eventId = 0;
  let comparisons = 0;
  let swaps = 0;
  let writes = 0;
  const n = arr.length;
  const sortedIndices = new Set<number>();

  const startTime = performance.now();

  function heapify(size: number, i: number) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < size) {
      comparisons++;
      events.push(
        createEvent(
          eventId++,
          'compare',
          [left, largest],
          arr,
          `Heapify at node ${i}: Comparing left child arr[${left}]=${arr[left]} with node arr[${largest}]=${arr[largest]}.`,
          { sortedIndices: Array.from(sortedIndices) }
        )
      );
      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    if (right < size) {
      comparisons++;
      events.push(
        createEvent(
          eventId++,
          'compare',
          [right, largest],
          arr,
          `Heapify at node ${i}: Comparing right child arr[${right}]=${arr[right]} with largest candidate arr[${largest}]=${arr[largest]}.`,
          { sortedIndices: Array.from(sortedIndices) }
        )
      );
      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest !== i) {
      const temp = arr[i];
      arr[i] = arr[largest];
      arr[largest] = temp;
      swaps++;
      writes += 2;

      events.push(
        createEvent(
          eventId++,
          'swap',
          [i, largest],
          arr,
          `Swapping parent arr[${i}] with larger child arr[${largest}] (${arr[i]}) to maintain Max-Heap property.`,
          { sortedIndices: Array.from(sortedIndices) }
        )
      );

      heapify(size, largest);
    }
  }

  // Build max heap
  events.push(
    createEvent(
      eventId++,
      'active',
      [],
      arr,
      `Phase 1: Building initial Max-Heap from array of length ${n}.`,
      { sortedIndices: [] }
    )
  );

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  events.push(
    createEvent(
      eventId++,
      'active',
      [0],
      arr,
      `Max-Heap built successfully. The root arr[0]=${arr[0]} holds the absolute maximum value.`,
      { sortedIndices: [] }
    )
  );

  // Extract elements one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    const temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    swaps++;
    writes += 2;

    sortedIndices.add(i);

    events.push(
      createEvent(
        eventId++,
        'swap',
        [0, i],
        arr,
        `Extracting max root ${temp} and placing at sorted boundary index ${i}.`,
        { sortedIndices: Array.from(sortedIndices) }
      )
    );

    events.push(
      createEvent(
        eventId++,
        'mark-sorted',
        [i],
        arr,
        `Index ${i} confirmed sorted with value ${temp}. Re-heapifying remaining ${i} elements.`,
        { sortedIndices: Array.from(sortedIndices) }
      )
    );

    heapify(i, 0);
  }

  sortedIndices.add(0);
  const allSorted = Array.from({ length: n }, (_, k) => k);

  events.push(
    createEvent(
      eventId++,
      'complete',
      allSorted,
      arr,
      `Heap Sort complete. In-place O(n log n) with no auxiliary array required. Total ${comparisons} comparisons and ${swaps} swaps.`,
      { sortedIndices: allSorted }
    )
  );

  const durationMs = performance.now() - startTime;
  return {
    events,
    sortedArray: arr,
    metrics: { comparisons, swaps, writes, totalSteps: events.length, durationMs },
  };
}

// 8. Counting Sort (for non-negative integers)
export function generateCountingSortEvents(input: number[]): AlgorithmExecutionResult {
  const arr = [...input];
  const events: SortEvent[] = [];
  let eventId = 0;
  let comparisons = 0;
  let swaps = 0;
  let writes = 0;
  const n = arr.length;

  const startTime = performance.now();

  const minVal = Math.min(...arr);
  const maxVal = Math.max(...arr);
  const range = maxVal - minVal + 1;

  events.push(
    createEvent(
      eventId++,
      'active',
      [],
      arr,
      `Counting Sort: Array range is [${minVal}..${maxVal}] (range size ${range}). Creating count array.`,
      { sortedIndices: [] }
    )
  );

  const count = new Array(range).fill(0);

  // Count frequencies
  for (let i = 0; i < n; i++) {
    count[arr[i] - minVal]++;
    events.push(
      createEvent(
        eventId++,
        'compare',
        [i],
        arr,
        `Tallying frequency of value ${arr[i]}: count[${arr[i] - minVal}] is now ${count[arr[i] - minVal]}.`,
        { pivotIndex: i }
      )
    );
  }

  // Cumulative sum
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }

  const output = new Array(n);
  const sortedIndices: number[] = [];

  // Build output array in reverse to ensure stability
  for (let i = n - 1; i >= 0; i--) {
    const val = arr[i];
    const targetIdx = count[val - minVal] - 1;
    output[targetIdx] = val;
    count[val - minVal]--;
    writes++;

    events.push(
      createEvent(
        eventId++,
        'write',
        [i],
        arr,
        `Placing value ${val} at calculated output position ${targetIdx} using prefix count.`,
        { pivotIndex: i }
      )
    );
  }

  // Copy back
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
    writes++;
    sortedIndices.push(i);
    events.push(
      createEvent(
        eventId++,
        'write',
        [i],
        arr,
        `Writing sorted value ${arr[i]} into index ${i}.`,
        { sortedIndices: [...sortedIndices] }
      )
    );
  }

  const allSorted = Array.from({ length: n }, (_, k) => k);
  events.push(
    createEvent(
      eventId++,
      'complete',
      allSorted,
      arr,
      `Counting Sort complete. Non-comparison sorting achieved in O(n + k) linear time! Total writes: ${writes}.`,
      { sortedIndices: allSorted }
    )
  );

  const durationMs = performance.now() - startTime;
  return {
    events,
    sortedArray: arr,
    metrics: { comparisons, swaps, writes, totalSteps: events.length, durationMs },
  };
}

// 9. Radix Sort (LSD Base 10)
export function generateRadixSortEvents(input: number[]): AlgorithmExecutionResult {
  const arr = [...input];
  const events: SortEvent[] = [];
  let eventId = 0;
  let comparisons = 0;
  let swaps = 0;
  let writes = 0;
  const n = arr.length;

  const startTime = performance.now();

  const maxVal = Math.max(...arr.map((v) => Math.abs(v)));

  for (let exp = 1; Math.floor(maxVal / exp) > 0; exp *= 10) {
    events.push(
      createEvent(
        eventId++,
        'active',
        [],
        arr,
        `Radix Sort: Sorting by digit position exp=${exp} (units, tens, hundreds, etc.).`,
        { sortedIndices: [] }
      )
    );

    const output = new Array(n).fill(0);
    const count = new Array(10).fill(0);

    for (let i = 0; i < n; i++) {
      const digit = Math.floor(Math.abs(arr[i]) / exp) % 10;
      count[digit]++;
      events.push(
        createEvent(
          eventId++,
          'compare',
          [i],
          arr,
          `Examining digit of arr[${i}]=${arr[i]} at 10^${Math.log10(exp)}: digit is ${digit}.`,
          { pivotIndex: i }
        )
      );
    }

    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    for (let i = n - 1; i >= 0; i--) {
      const digit = Math.floor(Math.abs(arr[i]) / exp) % 10;
      const targetPos = count[digit] - 1;
      output[targetPos] = arr[i];
      count[digit]--;
      writes++;
    }

    for (let i = 0; i < n; i++) {
      arr[i] = output[i];
      writes++;
      events.push(
        createEvent(
          eventId++,
          'write',
          [i],
          arr,
          `Updated array with digit pass (exp=${exp}): arr[${i}]=${arr[i]}.`,
          { sortedIndices: [] }
        )
      );
    }
  }

  const allSorted = Array.from({ length: n }, (_, k) => k);
  events.push(
    createEvent(
      eventId++,
      'complete',
      allSorted,
      arr,
      `Radix Sort complete. Processed all significant digits in O(d * (n + b)). Total writes: ${writes}.`,
      { sortedIndices: allSorted }
    )
  );

  const durationMs = performance.now() - startTime;
  return {
    events,
    sortedArray: arr,
    metrics: { comparisons, swaps, writes, totalSteps: events.length, durationMs },
  };
}

// 10. Bucket Sort
export function generateBucketSortEvents(input: number[]): AlgorithmExecutionResult {
  const arr = [...input];
  const events: SortEvent[] = [];
  let eventId = 0;
  let comparisons = 0;
  let swaps = 0;
  let writes = 0;
  const n = arr.length;

  const startTime = performance.now();

  const minVal = Math.min(...arr);
  const maxVal = Math.max(...arr);
  const bucketCount = Math.max(3, Math.min(10, Math.floor(n / 3)));
  const range = (maxVal - minVal + 1) / bucketCount;

  events.push(
    createEvent(
      eventId++,
      'active',
      [],
      arr,
      `Bucket Sort: Creating ${bucketCount} buckets across range [${minVal}..${maxVal}].`,
      { sortedIndices: [] }
    )
  );

  const buckets: number[][] = Array.from({ length: bucketCount }, () => []);

  for (let i = 0; i < n; i++) {
    const bucketIndex = Math.min(
      bucketCount - 1,
      Math.floor((arr[i] - minVal) / range)
    );
    buckets[bucketIndex].push(arr[i]);
    events.push(
      createEvent(
        eventId++,
        'active',
        [i],
        arr,
        `Distributing arr[${i}]=${arr[i]} into bucket #${bucketIndex + 1}.`,
        { pivotIndex: i }
      )
    );
  }

  // Sort each bucket (insertion sort) and concatenate
  let currentIdx = 0;
  const sortedIndices: number[] = [];

  for (let b = 0; b < bucketCount; b++) {
    const bucket = buckets[b];
    // Sort bucket with insertion sort
    for (let i = 1; i < bucket.length; i++) {
      const key = bucket[i];
      let j = i - 1;
      while (j >= 0 && bucket[j] > key) {
        comparisons++;
        bucket[j + 1] = bucket[j];
        writes++;
        swaps++;
        j--;
      }
      bucket[j + 1] = key;
      writes++;
    }

    for (let k = 0; k < bucket.length; k++) {
      arr[currentIdx] = bucket[k];
      writes++;
      sortedIndices.push(currentIdx);

      events.push(
        createEvent(
          eventId++,
          'write',
          [currentIdx],
          arr,
          `Concatenating sorted bucket #${b + 1}: placed ${bucket[k]} at index ${currentIdx}.`,
          { sortedIndices: [...sortedIndices] }
        )
      );
      currentIdx++;
    }
  }

  const allSorted = Array.from({ length: n }, (_, k) => k);
  events.push(
    createEvent(
      eventId++,
      'complete',
      allSorted,
      arr,
      `Bucket Sort complete. Average time O(n + k) on uniformly distributed data. Total writes: ${writes}.`,
      { sortedIndices: allSorted }
    )
  );

  const durationMs = performance.now() - startTime;
  return {
    events,
    sortedArray: arr,
    metrics: { comparisons, swaps, writes, totalSteps: events.length, durationMs },
  };
}

// Unified runner
export function runAlgorithm(
  algorithmId: AlgorithmId,
  array: number[]
): AlgorithmExecutionResult {
  switch (algorithmId) {
    case 'bubble':
      return generateBubbleSortEvents(array);
    case 'selection':
      return generateSelectionSortEvents(array);
    case 'insertion':
      return generateInsertionSortEvents(array);
    case 'merge':
      return generateMergeSortEvents(array);
    case 'quick':
      return generateQuickSortEvents(array);
    case 'shell':
      return generateShellSortEvents(array);
    case 'heap':
      return generateHeapSortEvents(array);
    case 'counting':
      return generateCountingSortEvents(array);
    case 'radix':
      return generateRadixSortEvents(array);
    case 'bucket':
      return generateBucketSortEvents(array);
    default:
      return generateBubbleSortEvents(array);
  }
}
