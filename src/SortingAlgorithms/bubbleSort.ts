import { actionHandler, SortingAction } from './shared';

export function bubbleSort(array: number[], dispatch: any, sortSpeed: number): void {
  const actionArr: SortingAction[] = [];
  let isSorted = false;
  let counter = 0;

  const arrayCopy = [...array];

  while (!isSorted) {
    isSorted = true;
    for (let i = 0; i < arrayCopy.length - 1 - counter; i++) {
      actionArr.push({ type: 'compare', compared: [i, i + 1] });
      if (arrayCopy[i] > arrayCopy[i + 1]) {
        actionArr.push({ type: 'swapStart', swapped: [i, i + 1] });
        let temp = arrayCopy[i + 1];
        arrayCopy[i + 1] = arrayCopy[i];
        arrayCopy[i] = temp;
        isSorted = false;
        const arrayClone = [...arrayCopy];
        actionArr.push({ type: 'swapEnd', array: arrayClone });
      }
      actionArr.push({ type: 'sleep' });
    }
    counter++;
  }

  actionHandler(actionArr, dispatch, sortSpeed);
}
