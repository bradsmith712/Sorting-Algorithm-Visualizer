import { actionHandler, SortingAction } from './shared';

export function heapSort(array: number[], dispatch: any, sortSpeed: number) {
  const actionArr: SortingAction[] = [];
  const arrayCopy = [...array];

  buildMaxHeap(arrayCopy, actionArr);

  for (let endIdx = arrayCopy.length - 1; endIdx > 0; endIdx--) {
    actionArr.push({ type: 'swapStart', swapped: [0, endIdx] });
    swap(0, endIdx, arrayCopy);
    actionArr.push({ type: 'swapEnd', array: [...arrayCopy] });
    actionArr.push({ type: 'sleep' });
    siftDown(0, endIdx - 1, arrayCopy, actionArr);
  }

  actionHandler(actionArr, dispatch, sortSpeed);
}

function buildMaxHeap(array: number[], actionArr: SortingAction[]) {
  const firstParentIdx = Math.floor((array.length - 2) / 2);
  for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
    siftDown(currentIdx, array.length - 1, array, actionArr);
  }
}

function siftDown(startIdx: number, endIdx: number, heap: number[], actionArr: SortingAction[]) {
  let rootIdx = startIdx;
  let leftChildIdx = rootIdx * 2 + 1;

  while (leftChildIdx <= endIdx) {
    const rightChildIdx = leftChildIdx + 1 <= endIdx ? leftChildIdx + 1 : -1;
    let idxToSwap = leftChildIdx;

    actionArr.push({ type: 'compare', compared: [rootIdx, leftChildIdx] });
    actionArr.push({ type: 'sleep' });

    if (rightChildIdx !== -1) {
      actionArr.push({ type: 'compare', compared: [leftChildIdx, rightChildIdx] });
      actionArr.push({ type: 'sleep' });
      if (heap[rightChildIdx] > heap[leftChildIdx]) {
        idxToSwap = rightChildIdx;
      }
    }

    actionArr.push({ type: 'compare', compared: [rootIdx, idxToSwap] });
    actionArr.push({ type: 'sleep' });

    if (heap[idxToSwap] > heap[rootIdx]) {
      actionArr.push({ type: 'swapStart', swapped: [rootIdx, idxToSwap] });
      swap(rootIdx, idxToSwap, heap);
      actionArr.push({ type: 'swapEnd', array: [...heap] });
      actionArr.push({ type: 'sleep' });
      rootIdx = idxToSwap;
      leftChildIdx = rootIdx * 2 + 1;
    } else {
      return;
    }
  }
}

function swap(i: number, j: number, array: number[]) {
  let temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}
