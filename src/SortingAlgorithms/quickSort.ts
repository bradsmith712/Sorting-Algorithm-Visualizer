import { compare, swapStart, swapEnd, sleep, setIsSorting } from '../reducers';
import { wait } from './shared';

export async function quickSort(array: number[], dispatch: any, sortSpeed: number) {
  await quickSortHelper(array, 0, array.length - 1, dispatch, sortSpeed);
  dispatch(sleep());
  dispatch(setIsSorting(false));
}

async function quickSortHelper(array: number[], startIdx: number, endIdx: number, dispatch: any, sortSpeed: number) {
  if (startIdx >= endIdx) return;

  const pivotIdx = startIdx;
  let leftIdx = startIdx + 1;
  let rightIdx = endIdx;

  while (rightIdx >= leftIdx) {
    dispatch(compare([pivotIdx, leftIdx, rightIdx]));
    await wait(sortSpeed);
    if (array[leftIdx] > array[pivotIdx] && array[rightIdx] < array[pivotIdx]) {
      dispatch(swapStart([leftIdx, rightIdx]));
      await wait(sortSpeed);
      swap(leftIdx, rightIdx, array);
      const arrayClone = [...array];
      dispatch(swapEnd(arrayClone));
      await wait(sortSpeed);
    }
    if (array[leftIdx] <= array[pivotIdx]) {
      leftIdx++;
    }

    if (array[rightIdx] >= array[pivotIdx]) {
      rightIdx--;
    }
  }

  dispatch(swapStart([leftIdx, rightIdx]));
  await wait(sortSpeed);
  swap(pivotIdx, rightIdx, array);
  const arrayClone = [...array];
  dispatch(swapEnd(arrayClone));
  await wait(sortSpeed);

  const isLeftSubSmaller = rightIdx - 1 - startIdx < endIdx - (rightIdx + 1);
  if (isLeftSubSmaller) {
    await quickSortHelper(array, rightIdx + 1, endIdx, dispatch, sortSpeed);
    await quickSortHelper(array, startIdx, rightIdx - 1, dispatch, sortSpeed);
  } else {
    await quickSortHelper(array, rightIdx + 1, endIdx, dispatch, sortSpeed);
    await quickSortHelper(array, startIdx, rightIdx - 1, dispatch, sortSpeed);
  }
}

function swap(i: number, j: number, array: number[]) {
  let temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}
