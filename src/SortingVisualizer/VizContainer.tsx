import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setNewArray, swapStart } from '../reducers';

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
}

function VizContainer() {
  const array = useSelector((state: IState) => state.array);
  const compared = useSelector((state: IState) => state.compared);
  const swapped = useSelector((state: IState) => state.swapped);

  const dispatch = useDispatch();

  useEffect(() => {
    function generateArray() {
      const randomArr = [];
      for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
        randomArr.push(randomIntFromInterval(5, 400))
      }
      return randomArr;
    }

    const array = generateArray();
    dispatch(setNewArray(array));
  }, []);

  function generateArray() {
    const randomArr = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      randomArr.push(randomIntFromInterval(5, 750))
    }
    dispatch(setNewArray(randomArr));
  }

  function bubbleSortHandler() {
    const arrayCopy = [...array];
    bubbleSort(arrayCopy, dispatch);
  }

  function insertionSortHandler() {
    const arrayCopy = [...array];
    insertionSort(arrayCopy, dispatch);
  }

  function selectionSortHandler() {
    const arrayCopy = [...array];
    selectionSort(arrayCopy, dispatch);
  }

  function quickSortHandler() {
    const arrayCopy = [...array];
    quickSort(arrayCopy, dispatch);
  }

  return (
    <div className="viz-container">
      {array.map((value: number, idx: number) => {
        const isSwapped = swapped.includes(idx);
        const isCompared = compared.includes(idx);
        return <Bar value={value} key={idx} index={idx} isSwapped={isSwapped} isCompared={isCompared} />
      })}
      <button onClick={() => generateArray()}>Generate New Array</button>
      <button onClick={() => bubbleSortHandler()}>Bubble Sort</button>
      <button onClick={() => insertionSortHandler()}>Insertion Sort</button>
      <button onClick={() => selectionSortHandler()}>Selection Sort</button>
      <button onClick={() => quickSortHandler()}>Quick Sort</button>
    </div>
  )
}
// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default VizContainer;
