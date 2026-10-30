import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { ALGORITHMS } from '../SortingAlgorithms/algorithmInfo';

import './InfoPanel.css';

function InfoPanel() {
  const algorithm = useSelector((state: RootState) => state.algorithm);
  const comparisons = useSelector((state: RootState) => state.comparisons);
  const swaps = useSelector((state: RootState) => state.swaps);

  const info = ALGORITHMS[algorithm];
  if (!info) return null;

  return (
    <aside className="card info-panel" aria-label="Algorithm details">
      <div className="info-eyebrow">Algorithm</div>
      <h2 className="info-name">{algorithm}</h2>
      <p className="info-description">{info.description}</p>

      <dl className="info-stats info-complexity">
        <Stat label="Time Complexity" value={info.time} />
        <Stat label="Space Complexity" value={info.space} />
      </dl>

      <dl className="info-stats info-counters">
        <Stat label={info.counterLabels.comparisons} value={comparisons.toLocaleString()} />
        <Stat label={info.counterLabels.swaps} value={swaps.toLocaleString()} />
      </dl>
    </aside>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="info-stat">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}

export default InfoPanel;
