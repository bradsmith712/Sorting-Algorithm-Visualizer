import * as React from 'react';

interface IProps {
  value: number;
  index: number;
  isCompared: Boolean;
  isSwapped: Boolean;
}

const Bar: React.FC<IProps> = (props: IProps) => {
  const { value, index, isCompared, isSwapped } = props;

  let barColor = '#4f46e5';

  if (isSwapped) {
    barColor = '#10b981';
  }

  if (isCompared) {
    barColor = '#f59e0b';
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
