import * as React from 'react';

interface IProps {
  value: number;
  index: number;
}

const Bar: React.FC<IProps> = (props: IProps) => {
  const { value, index } = props;
  return (
    <div className="viz-bar" key={index} style={{
      backgroundColor: "blue",
      height: `${value}px`,
    }}>
      {value}
    </div>
  )
}

export default Bar;
