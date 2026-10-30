import { compare, swapStart, swapEnd, sleep, markSorted, setIsSorting } from '../reducers';

const MIN_VISUAL_DELAY_MS = 20;
const SORTED_SWEEP_STEPS = 20;
const SORTED_SWEEP_STEP_MS = 16;

export type SortingAction = {
  type: 'compare' | 'swapStart' | 'swapEnd' | 'sleep' | 'markSorted';
  compared?: number[];
  // number of real comparisons a 'compare' step represents; defaults to 1
  count?: number;
  swapped?: number[];
  array?: number[];
  sorted?: number[];
};

// Each sort run grabs an id; bumping the counter invalidates whichever run is in flight.
let currentRunId = 0;

export function startRun(): number {
  currentRunId++;
  return currentRunId;
}

export function cancelRun() {
  currentRunId++;
}

export function isRunActive(runId: number): boolean {
  return runId === currentRunId;
}

export async function actionHandler(actionArr: SortingAction[], arrayLength: number, dispatch: any, sortSpeed: number) {
  const runId = startRun();

  for (let i = 0; i < actionArr.length; i++) {
    const action = actionArr[i];
    const { type } = action;
    if (type === 'compare') {
      dispatch(compare(action.compared || [], action.count === undefined ? 1 : action.count));
    } else if (type === 'swapStart') {
      dispatch(swapStart(action.swapped || []));
    } else if (type === 'swapEnd') {
      dispatch(swapEnd(action.array || []));
    } else if (type === 'sleep') {
      dispatch(sleep());
    } else if (type === 'markSorted') {
      dispatch(markSorted(action.sorted || []));
      // marking is bookkeeping, not a visual step, so don't spend a tick on it
      continue;
    }
    await wait(sortSpeed);
    if (!isRunActive(runId)) return;
  }

  await finishRun(runId, arrayLength, dispatch);
}

// Sweep the "sorted" colour left to right across the whole array, then end the run.
export async function finishRun(runId: number, length: number, dispatch: any) {
  dispatch(sleep());
  const chunk = Math.max(1, Math.ceil(length / SORTED_SWEEP_STEPS));
  for (let start = 0; start < length; start += chunk) {
    const indices = [];
    for (let idx = start; idx < Math.min(length, start + chunk); idx++) {
      indices.push(idx);
    }
    dispatch(markSorted(indices));
    await new Promise(resolve => setTimeout(resolve, SORTED_SWEEP_STEP_MS));
    if (!isRunActive(runId)) return;
  }
  dispatch(setIsSorting(false));
}

export function wait(ms: number) {
  const visualDelay = Math.max(ms, MIN_VISUAL_DELAY_MS);
  return new Promise(resolve => setTimeout(resolve, visualDelay));
}
