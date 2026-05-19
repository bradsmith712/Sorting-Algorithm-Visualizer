import { actionHandler, SortingAction } from './shared';

export function insertionSort(array: number[], dispatch: any, sortSpeed: number) {
  const actionArr: SortingAction[] = [];
  const arrayCopy = [...array];

  for (let i = 1; i < arrayCopy.length; i++) {
    let j = i;
    actionArr.push({ type: 'compare', compared: [j, j - 1] });
    while (j > 0 && arrayCopy[j] < arrayCopy[j - 1]) {
      actionArr.push({ type: 'swapStart', swapped: [j, j - 1] });
      let temp = arrayCopy[j];
      arrayCopy[j] = arrayCopy[j - 1];
      arrayCopy[j - 1] = temp;
      const arrClone = [...arrayCopy];
      actionArr.push({ type: 'swapEnd', array: arrClone });
      j -= 1;
      if (j > 0) {
        actionArr.push({ type: 'compare', compared: [j, j - 1] });
      }
    }
    actionArr.push({ type: 'sleep' });
  }

  actionHandler(actionArr, dispatch, sortSpeed);
}
