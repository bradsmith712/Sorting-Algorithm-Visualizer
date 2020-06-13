import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setNewArray, swapStart } from '../reducers';
import generateRandomArray from '../utils/generateRandomArray';

import './VizContainer.css';
import Bar from './Bar';
import { bubbleSort, insertionSort, selectionSort, quickSort } from '../SortingAlgorithms';
// import connect from 'react-redux/es/connect/connect';
// import { connect } from 'react-redux';

const NUMBER_OF_ARRAY_BARS = 15;

interface IState {
  array: number[];
  compared: number[];
  swapped: number[];
  arraySize: number;
  sortSpeed: number;
  algorithm: string;
  isSorting: boolean;
}

function VizContainer() {
  const array = useSelector((state: IState) => state.array);
  const compared = useSelector((state: IState) => state.compared);
  const swapped = useSelector((state: IState) => state.swapped);
  const arraySize = useSelector((state: IState) => state.arraySize);
  const sortSpeed = useSelector((state: IState) => state.sortSpeed);

  const dispatch = useDispatch();

  useEffect(() => {
    function generateArray(arraySize: number) {
      const randomArr = [];
      for (let i = 0; i < arraySize; i++) {
        randomArr.push(randomIntFromInterval(100, 650))
      }
      return randomArr;
    }

    const array = generateArray(arraySize);

    dispatch(setNewArray(array));
  }, [arraySize]);

  return (
    <div className="viz-container">
      {array.map((value: number, idx: number) => {
        const isSwapped = swapped.includes(idx);
        const isCompared = compared.includes(idx);
        return <Bar value={value} key={idx} index={idx} isSwapped={isSwapped} isCompared={isCompared} />
      })}
    </div>
  )
}
// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default VizContainer;
