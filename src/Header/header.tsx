import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Typography, Button, Slider, Select, MenuItem } from '@material-ui/core';
import { withStyles, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { white } from 'color-name';
import { setArraySize, setSortSpeed, setAlgorithm, setIsSorting } from '../reducers';
import { bubbleSort, insertionSort, selectionSort, quickSort } from '../SortingAlgorithms';

import './header.css';

const useStyles = makeStyles({
  grow: {
    // flexGrow: 1,
    // backgroundColor: 'white'
  },
  appContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '50px',
    padding: '10px'
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minWidth: '200px',
  },
  modifiers: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  slider: {
    width: '100px',
    marginLeft: '50px',
    cursor: 'pointer'
  },
  selectCont: {
    width: '200px',
  },
  select: {
    color: 'white',
    // backgroundColor: 'white'
  },
  icon: {
    color: 'white'
  }
})

interface IState {
  array: number[];
  compared: number[];
  swapped: number[];
  arraySize: number;
  sortSpeed: number;
  algorithm: string;
  isSorting: boolean;
}

function Header() {
  const arraySize = useSelector((state: IState) => state.arraySize);
  const sortSpeed = useSelector((state: IState) => state.sortSpeed);
  const algorithm = useSelector((state: IState) => state.algorithm);
  const array = useSelector((state: IState) => state.array);
  const isSorting = useSelector((state: IState) => state.isSorting);

  const dispatch = useDispatch();

  const classes = useStyles();

  function handleSizeSlider(evt: any, value: number) {
    dispatch(setArraySize(value));
  }

  function handleSpeedSlider(evt: any, value: number) {
    dispatch(setSortSpeed(value));
  }

  function handleSelectChange(evt: React.ChangeEvent<{ value: unknown }>) {
    const algorithm = evt.target.value as string;
    dispatch(setAlgorithm(algorithm));
  }

  function handleSort() {
    const arrayCopy = [...array];
    switch (algorithm) {
      case 'Bubble Sort':
        bubbleSort(arrayCopy, dispatch, sortSpeed);
        break;
      case 'Insertion Sort':
        insertionSort(arrayCopy, dispatch, sortSpeed);
        break;
      case 'Selection Sort':
        selectionSort(arrayCopy, dispatch, sortSpeed);
        break;
      case 'Quick Sort':
        quickSort(arrayCopy, dispatch, sortSpeed);
        break;
    }

    dispatch(setIsSorting(true));
  }

  return (
    // <div className={classes.grow}>
    <AppBar position="static" className={classes.appContainer}>
      {/* <div className={classes.appContainer}> */}
      <Typography variant="h6" color="inherit" className={classes.title}>
        Sorting Visualizer
        </Typography>
      <div className={classes.modifiers}>
        <div className={classes.slider}>
          <Slider
            aria-label="Array Size"
            value={arraySize}
            onChange={(evt: any, value: any) => handleSizeSlider(evt, value)}
            min={4}
            max={100}
            defaultValue={50}
            color="secondary"
          />
        </div>
        <div className={classes.slider}>
          <Slider
            aria-label="Sort Speed"
            value={sortSpeed}
            onChange={(evt: any, value: any) => handleSpeedSlider(evt, value)}
            min={1}
            max={100}
            defaultValue={50}
            color="secondary"
          />
        </div>
        <div className={classes.selectCont}>
          <Select value={algorithm} onChange={handleSelectChange} variant="standard" classes={{
            select: classes.select,
            icon: classes.icon
          }}>
            <MenuItem value="Bubble Sort">Bubble Sort</MenuItem>
            <MenuItem value="Insertion Sort">Insertion Sort</MenuItem>
            <MenuItem value="Seletion Sort">Selection Sort</MenuItem>
            <MenuItem value="Quick Sort">Quick Sort</MenuItem>
          </Select>
        </div>
        <Button variant="contained" size="small" onClick={handleSort} disabled={isSorting}>Sort!</Button>
      </div>
      {/* </div> */}
    </AppBar >
    // </div >
  )
}

export default Header;
