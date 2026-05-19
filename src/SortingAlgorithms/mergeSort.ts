import { actionHandler, SortingAction } from './shared';

export function mergeSort(array: number[], dispatch: any, sortSpeed: number) {
  const actionArr: SortingAction[] = [];
  const arrayCopy = [...array];

  mergeSortHelper(arrayCopy, 0, arrayCopy.length - 1, actionArr);
  actionHandler(actionArr, dispatch, sortSpeed);
}

function mergeSortHelper(array: number[], startIdx: number, endIdx: number, actionArr: SortingAction[]) {
  if (startIdx >= endIdx) return;

  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(array, startIdx, middleIdx, actionArr);
  mergeSortHelper(array, middleIdx + 1, endIdx, actionArr);
  merge(array, startIdx, middleIdx, endIdx, actionArr);
}

function merge(array: number[], startIdx: number, middleIdx: number, endIdx: number, actionArr: SortingAction[]) {
  const leftSubarray = array.slice(startIdx, middleIdx + 1);
  const rightSubarray = array.slice(middleIdx + 1, endIdx + 1);

  let leftPointer = 0;
  let rightPointer = 0;
  let sortedPointer = startIdx;

  while (leftPointer < leftSubarray.length && rightPointer < rightSubarray.length) {
    const leftIdx = startIdx + leftPointer;
    const rightIdx = middleIdx + 1 + rightPointer;
    actionArr.push({ type: 'compare', compared: [leftIdx, rightIdx] });

    if (leftSubarray[leftPointer] <= rightSubarray[rightPointer]) {
      array[sortedPointer] = leftSubarray[leftPointer];
      leftPointer++;
    } else {
      array[sortedPointer] = rightSubarray[rightPointer];
      rightPointer++;
    }

    actionArr.push({ type: 'swapStart', swapped: [sortedPointer, sortedPointer] });
    actionArr.push({ type: 'swapEnd', array: [...array] });
    actionArr.push({ type: 'sleep' });
    sortedPointer++;
  }

  while (leftPointer < leftSubarray.length) {
    array[sortedPointer] = leftSubarray[leftPointer];
    actionArr.push({ type: 'compare', compared: [sortedPointer] });
    actionArr.push({ type: 'swapStart', swapped: [sortedPointer, sortedPointer] });
    actionArr.push({ type: 'swapEnd', array: [...array] });
    actionArr.push({ type: 'sleep' });
    leftPointer++;
    sortedPointer++;
  }

  while (rightPointer < rightSubarray.length) {
    array[sortedPointer] = rightSubarray[rightPointer];
    actionArr.push({ type: 'compare', compared: [sortedPointer] });
    actionArr.push({ type: 'swapStart', swapped: [sortedPointer, sortedPointer] });
    actionArr.push({ type: 'swapEnd', array: [...array] });
    actionArr.push({ type: 'sleep' });
    rightPointer++;
    sortedPointer++;
  }
}
