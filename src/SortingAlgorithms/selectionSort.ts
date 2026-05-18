import { actionHandler, SortingAction } from './shared';

export function selectionSort(array: number[], dispatch: any, sortSpeed: number) {
  const actionArr: SortingAction[] = [];
  const arrayCopy = [...array];

  for (let i = 0; i < arrayCopy.length - 1; i++) {
    let lowestIdx = i;
    let swapIdx = i;
    for (let j = swapIdx + 1; j < arrayCopy.length; j++) {
      actionArr.push({ type: 'compare', compared: [j, lowestIdx] });
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
