import { compare, swapStart, swapEnd, sleep, setIsSorting } from '../reducers';

const MIN_VISUAL_DELAY_MS = 20;

export type SortingAction = {
  type: 'compare' | 'swapStart' | 'swapEnd' | 'sleep';
  compared?: number[];
  swapped?: number[];
  array?: number[];
};

export async function actionHandler(actionArr: SortingAction[], dispatch: any, sortSpeed: number) {
  for (let i = 0; i < actionArr.length; i++) {
    const action = actionArr[i];
    const { type } = action;
    if (type === 'compare') {
      dispatch(compare(action.compared || []));
    } else if (type === 'swapStart') {
      dispatch(swapStart(action.swapped || []));
    } else if (type === 'swapEnd') {
      dispatch(swapEnd(action.array || []));
    } else if (type === 'sleep') {
      dispatch(sleep());
    }
    await wait(sortSpeed);
  }

  dispatch(setIsSorting(false));
}

export function wait(ms: number) {
  const visualDelay = Math.max(ms, MIN_VISUAL_DELAY_MS);
  return new Promise(resolve => setTimeout(resolve, visualDelay));
}
