import { compare, swapStart, swapEnd, markSorted } from '../reducers';
import { wait, startRun, isRunActive, finishRun } from './shared';

export async function quickSort(array: number[], dispatch: any, sortSpeed: number) {
  const runId = startRun();
  await quickSortHelper(array, 0, array.length - 1, dispatch, sortSpeed, runId);
  if (!isRunActive(runId)) return;
  await finishRun(runId, array.length, dispatch);
}

async function quickSortHelper(array: number[], startIdx: number, endIdx: number, dispatch: any, sortSpeed: number, runId: number) {
  if (startIdx === endIdx) {
    dispatch(markSorted([startIdx]));
  }
  if (startIdx >= endIdx) return;

  const pivotIdx = startIdx;
  let leftIdx = startIdx + 1;
  let rightIdx = endIdx;

  while (rightIdx >= leftIdx) {
    // each step checks both the left and right pointer against the pivot
    dispatch(compare([pivotIdx, leftIdx, rightIdx], 2));
    await wait(sortSpeed);
    if (!isRunActive(runId)) return;
    if (array[leftIdx] > array[pivotIdx] && array[rightIdx] < array[pivotIdx]) {
      dispatch(swapStart([leftIdx, rightIdx]));
      await wait(sortSpeed);
      if (!isRunActive(runId)) return;
      swap(leftIdx, rightIdx, array);
      const arrayClone = [...array];
      dispatch(swapEnd(arrayClone));
      await wait(sortSpeed);
      if (!isRunActive(runId)) return;
    }
    if (array[leftIdx] <= array[pivotIdx]) {
      leftIdx++;
    }

    if (array[rightIdx] >= array[pivotIdx]) {
      rightIdx--;
    }
  }

  dispatch(swapStart([pivotIdx, rightIdx]));
  await wait(sortSpeed);
  if (!isRunActive(runId)) return;
  swap(pivotIdx, rightIdx, array);
  const arrayClone = [...array];
  dispatch(swapEnd(arrayClone));
  // the pivot is now in its final position
  dispatch(markSorted([rightIdx]));
  await wait(sortSpeed);
  if (!isRunActive(runId)) return;

  const isLeftSubSmaller = rightIdx - 1 - startIdx < endIdx - (rightIdx + 1);
  if (isLeftSubSmaller) {
    await quickSortHelper(array, rightIdx + 1, endIdx, dispatch, sortSpeed, runId);
    await quickSortHelper(array, startIdx, rightIdx - 1, dispatch, sortSpeed, runId);
  } else {
    await quickSortHelper(array, rightIdx + 1, endIdx, dispatch, sortSpeed, runId);
    await quickSortHelper(array, startIdx, rightIdx - 1, dispatch, sortSpeed, runId);
  }
}

function swap(i: number, j: number, array: number[]) {
  let temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}
