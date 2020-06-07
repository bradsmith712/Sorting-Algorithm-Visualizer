import * as React from 'react';
import { useState, useEffect } from 'react';
import './VizContainer.css';
import Bar from './Bar';

const NUMBER_OF_ARRAY_BARS = 100;

const VizContainer: React.FC = () => {

  const [array, setArray] = useState<number[]>([]);

  useEffect(() => {
    const randomArr = resetArray();
    console.log('useEffect randomArr = ', randomArr);
    setArray(randomArr);
  }, []);

  function resetArray(): number[] {
    const randomArr = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      randomArr.push(randomIntFromInterval(5, 700))
    }
    console.log('resetArr.. randomArr = ', randomArr);
    return randomArr;
  }

  // generate array button calls resetArray and saves to state

  return (
    <div className="viz-container">
      {array.map((value: number, idx: number) => {
        <Bar value={value} key={idx} index={idx} />
      })}
      <button onClick={() => resetArray()}>Generate New Array</button>
    </div>
  )
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min: number, max: number): number { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default VizContainer
