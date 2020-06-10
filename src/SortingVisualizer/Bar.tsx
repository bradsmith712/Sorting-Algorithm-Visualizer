import * as React from 'react';

interface IProps {
  value: number;
  index: number;
  isCompared: Boolean;
  isSwapped: Boolean;
}

// const Bar: React.FC<IProps> = (props: IProps) => {
//   const { value, index } = props;
//   return (
//     <div className="viz-bar" key={index} style={{
//       backgroundColor: "blue",
//       height: `${value}px`,
//     }}>
//       {value}
//     </div>
//   )
// }

const Bar: React.FC<IProps> = (props: IProps) => {
  const { value, index, isCompared, isSwapped } = props;
  console.log('bar value = ', value);

  let barColor = 'blue';

  if (isSwapped) {
    barColor = 'green';
  }

  if (isCompared) {
    barColor = 'red';
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
