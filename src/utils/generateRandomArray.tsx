export const MIN_BAR_VALUE = 20;
export const MAX_BAR_VALUE = 650;

export type DataPattern = 'random' | 'nearlySorted' | 'reversed' | 'fewUnique';

export const DATA_PATTERNS: { value: DataPattern; label: string }[] = [
  { value: 'random', label: 'Random' },
  { value: 'nearlySorted', label: 'Nearly Sorted' },
  { value: 'reversed', label: 'Reversed' },
  { value: 'fewUnique', label: 'Few Unique' }
];

const FEW_UNIQUE_COUNT = 5;

export default function generateArray(size: number, pattern: DataPattern = 'random'): number[] {
  switch (pattern) {
    case 'nearlySorted':
      return nearlySorted(size);
    case 'reversed':
      return sortedAscending(size).reverse();
    case 'fewUnique':
      return fewUnique(size);
    default:
      return random(size);
  }
}

function random(size: number): number[] {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(randomIntFromInterval(MIN_BAR_VALUE, MAX_BAR_VALUE));
  }
  return arr;
}

function sortedAscending(size: number): number[] {
  return random(size).sort((a, b) => a - b);
}

function nearlySorted(size: number): number[] {
  const arr = sortedAscending(size);
  // swap a handful of nearby pairs so the array is mostly, but not quite, in order
  const swapCount = Math.max(1, Math.round(size * 0.08));
  for (let i = 0; i < swapCount; i++) {
    const idx = randomIntFromInterval(0, size - 1);
    const otherIdx = Math.min(size - 1, idx + randomIntFromInterval(1, 3));
    const temp = arr[idx];
    arr[idx] = arr[otherIdx];
    arr[otherIdx] = temp;
  }
  return arr;
}

function fewUnique(size: number): number[] {
  const step = (MAX_BAR_VALUE - MIN_BAR_VALUE) / FEW_UNIQUE_COUNT;
  const values = [];
  for (let i = 1; i <= FEW_UNIQUE_COUNT; i++) {
    values.push(Math.round(MIN_BAR_VALUE + step * i));
  }
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(values[randomIntFromInterval(0, values.length - 1)]);
  }
  return arr;
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
