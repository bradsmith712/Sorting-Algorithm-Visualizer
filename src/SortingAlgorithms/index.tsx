import React from 'react';
import { compare, swapStart, swapEnd, sleep, setIsSorting } from '../reducers';

export function bubbleSort(array: number[], dispatch: any, sortSpeed: number): void {
  const actionArr = [];
  let isSorted = false;
  let counter = 0;

  const arrayCopy = [...array];

  while (!isSorted) {
    isSorted = true;
    for (let i = 0; i < arrayCopy.length - 1 - counter; i++) {
      actionArr.push({ type: 'compare', compared: [i, i + 1] })
      if (arrayCopy[i] > arrayCopy[i + 1]) {
        actionArr.push({ type: 'swapStart', swapped: [i, i + 1] });
        let temp = arrayCopy[i + 1];
        arrayCopy[i + 1] = arrayCopy[i];
        arrayCopy[i] = temp;
        isSorted = false;
        const arrayClone = [...arrayCopy];
        actionArr.push({ type: 'swapEnd', swapped: [i, i + 1], array: arrayClone });
      }
      actionArr.push({ type: 'sleep' })
    }
    counter++;
  }

  actionHandler(actionArr, dispatch, sortSpeed);
}

export function insertionSort(array: number[], dispatch: any, sortSpeed: number) {
  const actionArr = [];
  const arrayCopy = [...array];

  for (let i = 1; i < arrayCopy.length; i++) {
    let j = i;
    actionArr.push({ type: 'compare', compared: [j, j - 1] })
    while (j > 0 && arrayCopy[j] < arrayCopy[j - 1]) {
      actionArr.push({ type: 'swapStart', swapped: [j, j - 1] })
      let temp = arrayCopy[j];
      arrayCopy[j] = arrayCopy[j - 1];
      arrayCopy[j - 1] = temp;
      const arrClone = [...arrayCopy];
      actionArr.push({ type: 'swapEnd', array: arrClone });
      // actionArr.push({ type: 'sleep' });
      j -= 1;
      if (j > 0) {
        actionArr.push({ type: 'compare', compared: [j, j - 1] })
      }
    }
    actionArr.push({ type: 'sleep' });
  }

  actionHandler(actionArr, dispatch, sortSpeed);
}

export function selectionSort(array: number[], dispatch: any, sortSpeed: number) {
  const actionArr = [];
  const arrayCopy = [...array];

  for (let i = 0; i < arrayCopy.length - 1; i++) {
    let lowestIdx = i;
    let swapIdx = i;
    for (let j = swapIdx + 1; j < arrayCopy.length; j++) {
      actionArr.push({ type: 'compare', compared: [j, lowestIdx] })
      if (arrayCopy[lowestIdx] > arrayCopy[j]) {
        lowestIdx = j;
      }
      actionArr.push({ type: 'sleep' });
    }
    actionArr.push({ type: 'swapStart', swapped: [swapIdx, lowestIdx] });
    let temp = arrayCopy[swapIdx];
    arrayCopy[swapIdx] = arrayCopy[lowestIdx];
    arrayCopy[lowestIdx] = temp;
    const arrClone = [...arrayCopy];
    actionArr.push({ type: 'swapEnd', array: arrClone });
    actionArr.push({ type: 'sleep' });
  }

  actionHandler(actionArr, dispatch, sortSpeed);
}

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
    // actionArr.push({ type: 'compare', compared: [pivotIdx, leftIdx, rightIdx] })
    dispatch(compare([pivotIdx, leftIdx, rightIdx]));
    await wait(sortSpeed);
    if (array[leftIdx] > array[pivotIdx] && array[rightIdx] < array[pivotIdx]) {
      // actionArr.push({ type: 'swapStart', swapped: [leftIdx, rightIdx] });
      dispatch(swapStart([leftIdx, rightIdx]));
      await wait(sortSpeed);
      swap(leftIdx, rightIdx, array);
      const arrayClone = [...array];
      // actionArr.push({ type: 'swapEnd', array: arrClone });
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
  // actionArr.push({ type: 'swapStart', swapped: [pivotIdx, rightIdx] });
  dispatch(swapStart([leftIdx, rightIdx]));
  await wait(sortSpeed);
  swap(pivotIdx, rightIdx, array);
  const arrayClone = [...array];
  dispatch(swapEnd(arrayClone));
  await wait(sortSpeed);
  // actionArr.push({ type: 'swapEnd', array: arrClone });

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

async function actionHandler(actionArr: any, dispatch: any, sortSpeed: number) {
  for (let i = 0; i < actionArr.length; i++) {
    console.log('action = ', actionArr[i]);
    const action = actionArr[i];
    const { type } = action;
    if (type === 'compare') {
      dispatch(compare(action.compared));
    } else if (type === 'swapStart') {
      dispatch(swapStart(action.swapped))
    } else if (type === 'swapEnd') {
      dispatch(swapEnd(action.array));
    } else if (type === 'sleep') {
      dispatch(sleep());
    }
    await wait(sortSpeed);
  }
  dispatch(setIsSorting(false));
}

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
