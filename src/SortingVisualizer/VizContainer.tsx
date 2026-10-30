import * as React from 'react';
import { useSelector } from 'react-redux'
import { RootState } from '../reducers';
import { MAX_BAR_VALUE } from '../utils/generateRandomArray';

import './VizContainer.css';
import Bar, { BarState } from './Bar';

const LEGEND: { state: BarState; label: string }[] = [
  { state: 'unsorted', label: 'Unsorted' },
  { state: 'comparing', label: 'Comparing' },
  { state: 'swapping', label: 'Swapping' },
  { state: 'sorted', label: 'Sorted' }
];

function VizContainer() {
  const array = useSelector((state: RootState) => state.array);
  const compared = useSelector((state: RootState) => state.compared);
  const swapped = useSelector((state: RootState) => state.swapped);
  const sorted = useSelector((state: RootState) => state.sorted);

  function barState(idx: number): BarState {
    if (swapped.includes(idx)) return 'swapping';
    if (compared.includes(idx)) return 'comparing';
    if (sorted.includes(idx)) return 'sorted';
    return 'unsorted';
  }

  return (
    <section className="card viz-card" aria-label="Array visualization">
      <div className="viz-container">
        {array.map((value: number, idx: number) => (
          <Bar value={value} maxValue={MAX_BAR_VALUE} key={idx} state={barState(idx)} />
        ))}
      </div>
      <ul className="viz-legend">
        {LEGEND.map(({ state, label }) => (
          <li key={state}>
            <span className={`viz-legend-dot viz-bar-${state}`} />
            {label}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default VizContainer;
