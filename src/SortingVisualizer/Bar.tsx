import * as React from 'react';

interface IProps {
  value: number;
  index: number;
  isCompared: Boolean;
  isSwapped: Boolean;
}

const Bar: React.FC<IProps> = (props: IProps) => {
  const { value, index, isCompared, isSwapped } = props;

  let barColor = '#3f51b5';

  if (isSwapped) {
    // barColor = 'green';
    barColor = '#4caf50';
  }

  if (isCompared) {
    barColor = '#f50057';
  }

  return (
    <div className="viz-bar" key={index} style={{
      backgroundColor: barColor,
      height: `${value}px`,
    }}>
    </div>
  )
}

export default Bar;
