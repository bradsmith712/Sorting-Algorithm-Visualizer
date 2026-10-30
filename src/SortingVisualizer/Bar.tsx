import * as React from 'react';

export type BarState = 'unsorted' | 'comparing' | 'swapping' | 'sorted';

interface IProps {
  value: number;
  maxValue: number;
  state: BarState;
}

const Bar: React.FC<IProps> = (props: IProps) => {
  const { value, maxValue, state } = props;

  return (
    <div className={`viz-bar viz-bar-${state}`} style={{
      // scale relative to the tallest possible bar so it fits any screen height
      height: `${(value / maxValue) * 100}%`,
    }}>
    </div>
  )
}

export default React.memo(Bar);
