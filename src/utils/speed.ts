export const MIN_SPEED_SLIDER = 1;
export const MAX_SPEED_SLIDER = 100;

const SLOWEST_DELAY_MS = 1000;
const FASTEST_DELAY_MS = 20;

// Map the speed slider (1-100) to a per-step delay on a log scale, so each notch
// feels like a similar change in speed rather than most of the range being sluggish.
export function sliderToDelay(sliderValue: number): number {
  const t = (sliderValue - MIN_SPEED_SLIDER) / (MAX_SPEED_SLIDER - MIN_SPEED_SLIDER);
  return Math.round(SLOWEST_DELAY_MS * Math.pow(FASTEST_DELAY_MS / SLOWEST_DELAY_MS, t));
}
