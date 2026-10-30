import { bubbleSort } from './bubbleSort';
import { insertionSort } from './insertionSort';
import { selectionSort } from './selectionSort';
import { quickSort } from './quickSort';
import { mergeSort } from './mergeSort';
import { heapSort } from './heapSort';

export interface AlgorithmInfo {
  run: (array: number[], dispatch: any, sortSpeed: number) => void;
  description: string;
  time: string;
  space: string;
  // what the two live counters are called for this algorithm
  counterLabels: { comparisons: string; swaps: string };
}

export const ALGORITHMS: { [name: string]: AlgorithmInfo } = {
  'Bubble Sort': {
    run: bubbleSort,
    description: 'Repeatedly steps through the array, swapping adjacent pairs that are out of order until the largest values bubble to the end.',
    time: 'O(n²)',
    space: 'O(1)',
    counterLabels: { comparisons: 'Comparisons', swaps: 'Swaps' }
  },
  'Insertion Sort': {
    run: insertionSort,
    description: 'Builds a sorted prefix one element at a time, shifting each new value left until it slots into place.',
    time: 'O(n²)',
    space: 'O(1)',
    counterLabels: { comparisons: 'Comparisons', swaps: 'Shifts' }
  },
  'Selection Sort': {
    run: selectionSort,
    description: 'Scans the unsorted portion for the smallest value and swaps it to the front, growing the sorted region by one each pass.',
    time: 'O(n²)',
    space: 'O(1)',
    counterLabels: { comparisons: 'Comparisons', swaps: 'Swaps' }
  },
  'Quick Sort': {
    run: quickSort,
    description: 'Picks a pivot, partitions smaller values to its left and larger to its right, then recursively sorts each side.',
    time: 'O(n log n)',
    space: 'O(log n)',
    counterLabels: { comparisons: 'Comparisons', swaps: 'Swaps' }
  },
  'Merge Sort': {
    run: mergeSort,
    description: 'A divide and conquer algorithm that recursively splits the array and merges sorted halves.',
    time: 'O(n log n)',
    space: 'O(n)',
    counterLabels: { comparisons: 'Comparisons', swaps: 'Writes' }
  },
  'Heap Sort': {
    run: heapSort,
    description: 'Arranges the array into a max-heap, then repeatedly moves the root to the end and restores the heap.',
    time: 'O(n log n)',
    space: 'O(1)',
    counterLabels: { comparisons: 'Comparisons', swaps: 'Swaps' }
  }
};

export const ALGORITHM_NAMES = Object.keys(ALGORITHMS);
