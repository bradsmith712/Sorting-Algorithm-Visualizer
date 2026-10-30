import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  RootState,
  setArraySize,
  setSortSpeed,
  setAlgorithm,
  setDataPattern,
  setIsSorting,
  setNewArray,
  resetArray
} from '../reducers';
import { ALGORITHMS, ALGORITHM_NAMES } from '../SortingAlgorithms/algorithmInfo';
import { cancelRun } from '../SortingAlgorithms/shared';
import generateArray, { DataPattern, DATA_PATTERNS } from '../utils/generateRandomArray';
import { sliderToDelay, MIN_SPEED_SLIDER, MAX_SPEED_SLIDER } from '../utils/speed';

import './Controls.css';

const MIN_ARRAY_SIZE = 4;
const MAX_ARRAY_SIZE = 100;

function Controls() {
  const array = useSelector((state: RootState) => state.array);
  const arraySize = useSelector((state: RootState) => state.arraySize);
  const sortSpeed = useSelector((state: RootState) => state.sortSpeed);
  const speedSliderValue = useSelector((state: RootState) => state.speedSliderValue);
  const algorithm = useSelector((state: RootState) => state.algorithm);
  const dataPattern = useSelector((state: RootState) => state.dataPattern);
  const isSorting = useSelector((state: RootState) => state.isSorting);

  const dispatch = useDispatch();

  function regenerate(size: number, pattern: DataPattern) {
    cancelRun();
    dispatch(setNewArray(generateArray(size, pattern)));
  }

  function handleSizeChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const size = Number(evt.target.value);
    dispatch(setArraySize(size));
    regenerate(size, dataPattern);
  }

  function handleSpeedChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(evt.target.value);
    dispatch(setSortSpeed(value, sliderToDelay(value)));
  }

  function handleAlgorithmChange(evt: React.ChangeEvent<HTMLSelectElement>) {
    cancelRun();
    dispatch(setAlgorithm(evt.target.value));
    // start the new algorithm from the same data so runs are comparable
    dispatch(resetArray());
  }

  function handlePatternChange(evt: React.ChangeEvent<HTMLSelectElement>) {
    const pattern = evt.target.value as DataPattern;
    dispatch(setDataPattern(pattern));
    regenerate(arraySize, pattern);
  }

  function handleShuffle() {
    regenerate(arraySize, dataPattern);
  }

  function handleReset() {
    cancelRun();
    dispatch(resetArray());
  }

  function handleSort() {
    const info = ALGORITHMS[algorithm];
    if (!info) return;
    // mark the run as started first: it clears the counters, and the sort dispatches its first step synchronously
    dispatch(setIsSorting(true));
    info.run([...array], dispatch, sortSpeed);
  }

  return (
    <section className="card controls" aria-label="Sorting controls">
      <div className="control-field control-algorithm">
        <label className="control-label" htmlFor="algorithm-select">Algorithm</label>
        <div className="select-wrap">
          <select id="algorithm-select" value={algorithm} onChange={handleAlgorithmChange}>
            {ALGORITHM_NAMES.map(name => <option key={name} value={name}>{name}</option>)}
          </select>
          <ChevronIcon />
        </div>
      </div>

      <div className="control-field control-size">
        <label className="control-label" htmlFor="size-slider">Array Size</label>
        <RangeInput id="size-slider" value={arraySize} min={MIN_ARRAY_SIZE} max={MAX_ARRAY_SIZE} onChange={handleSizeChange} />
      </div>

      <div className="control-field control-speed">
        <label className="control-label" htmlFor="speed-slider">Speed</label>
        <RangeInput id="speed-slider" value={speedSliderValue} min={MIN_SPEED_SLIDER} max={MAX_SPEED_SLIDER} onChange={handleSpeedChange} />
      </div>

      <div className="control-field control-pattern">
        <label className="control-label" htmlFor="pattern-select">Data Pattern</label>
        <div className="select-wrap">
          <select id="pattern-select" value={dataPattern} onChange={handlePatternChange}>
            {DATA_PATTERNS.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
          </select>
          <ChevronIcon />
        </div>
      </div>

      <div className="control-actions">
        <button type="button" className="btn" onClick={handleShuffle}>
          <ShuffleIcon />
          Shuffle
        </button>
        <button type="button" className="btn" onClick={handleReset}>
          <ResetIcon />
          Reset
        </button>
        <button type="button" className="btn btn-primary" onClick={handleSort} disabled={isSorting}>
          <PlayIcon />
          {isSorting ? 'Sorting…' : 'Sort'}
        </button>
      </div>
    </section>
  )
}

interface IRangeProps {
  id: string;
  value: number;
  min: number;
  max: number;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

function RangeInput({ id, value, min, max, onChange }: IRangeProps) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div className="range-row">
      <input
        id={id}
        type="range"
        className="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        style={{ '--fill': `${fill}%` } as React.CSSProperties}
      />
      <span className="range-value">{value}</span>
    </div>
  )
}

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true
};

function ChevronIcon() {
  return (
    <svg className="select-chevron" {...iconProps}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function ShuffleIcon() {
  return (
    <svg className="btn-icon" {...iconProps}>
      <path d="m18 14 4 4-4 4" />
      <path d="m18 2 4 4-4 4" />
      <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22" />
      <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" />
      <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" />
    </svg>
  )
}

function ResetIcon() {
  return (
    <svg className="btn-icon" {...iconProps}>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg className="btn-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z" fill="currentColor" />
    </svg>
  )
}

export default Controls;
