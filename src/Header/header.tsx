import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Typography, Button, Slider, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { setArraySize, setSortSpeed, setAlgorithm, setIsSorting } from '../reducers';
import { bubbleSort, insertionSort, selectionSort, quickSort, mergeSort, heapSort } from '../SortingAlgorithms';

import './header.css';

const MOBILE = '@media (max-width: 900px)';

const useStyles = makeStyles({
  grow: {
    // flexGrow: 1,
    // backgroundColor: 'white'
  },
  appContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '78px',
    padding: '12px 16px',
    [MOBILE]: {
      flexDirection: 'column',
      height: 'auto',
      padding: '12px 16px 14px',
      gap: '8px'
    }
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minWidth: '200px',
    whiteSpace: 'nowrap',
    color: '#f8fafc',
    fontWeight: 600,
    [MOBILE]: {
      minWidth: 0,
      justifyContent: 'center',
      fontSize: '1.25rem'
    }
  },
  modifiers: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    gap: '18px',
    [MOBILE]: {
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: '4px 20px'
    }
  },
  sliderContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginRight: '4px',
    [MOBILE]: {
      flex: '1 1 0',
      minWidth: 0,
      marginRight: 0
    }
  },
  slider: {
    width: '140px',
    // marginLeft: '50px',
    [MOBILE]: {
      width: '100%'
    }
  },
  break: {
    display: 'none',
    [MOBILE]: {
      display: 'block',
      flexBasis: '100%',
      height: 0
    }
  },
  selectCont: {
    width: '200px',
    [MOBILE]: {
      flex: '1 1 auto',
      width: 'auto',
      textAlign: 'left'
    }
  },
  selectRoot: {
    [MOBILE]: {
      width: '100%'
    }
  },
  sortButton: {
    [MOBILE]: {
      minWidth: '96px',
      height: '36px'
    }
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

  const [sliderVal, setSliderVal] = useState(50);

  const dispatch = useDispatch();

  const classes = useStyles();

  function handleSizeSlider(evt: any, value: number) {
    dispatch(setArraySize(value));
  }

  function handleSpeedSlider(evt: any, value: number) {
    setSliderVal(value);
    // use slope of line equation to calculate speed in ms of sort
    const speed = Math.floor(-29.97 * value + 3000);
    dispatch(setSortSpeed(speed));
  }

  function handleSelectChange(evt: React.ChangeEvent<{ value: unknown }>) {
    const algorithm = evt.target.value as string;
    dispatch(setAlgorithm(algorithm));
  }

  function handleSort() {
    const arrayCopy = [...array];
    let didStartSort = true;

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
      case 'Merge Sort':
        mergeSort(arrayCopy, dispatch, sortSpeed);
        break;
      case 'Heap Sort':
        heapSort(arrayCopy, dispatch, sortSpeed);
        break;
      default:
        didStartSort = false;
        break;
    }

    if (didStartSort) {
      dispatch(setIsSorting(true));
    }
  }

  return (
    // <div className={classes.grow}>
    <AppBar
      position="static"
      className={`${classes.appContainer} header-variant-a`}
    >
      {/* <div className={classes.appContainer}> */}
      <Typography variant="h5" color="inherit" className={classes.title}>
        Sorting Visualizer
        </Typography>
      <div className={classes.modifiers}>
        <div className={classes.sliderContainer}>
          <Typography>
            Array Size
          </Typography>
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
        </div>
        <div className={classes.sliderContainer}>
          <Typography>
            Sort Speed
          </Typography>
          <div className={classes.slider}>
            <Slider
              aria-label="Sort Speed"
              value={sliderVal}
              onChange={(evt: any, value: any) => handleSpeedSlider(evt, value)}
              min={1}
              max={100}
              defaultValue={50}
              color="secondary"
            />
          </div>
        </div>
        <div className={classes.break} />
        <div className={classes.selectCont}>
          <Select value={algorithm} onChange={handleSelectChange} variant="standard" className={classes.selectRoot} classes={{
            select: classes.select,
            icon: classes.icon
          }}>
            <MenuItem value="Bubble Sort">Bubble Sort</MenuItem>
            <MenuItem value="Insertion Sort">Insertion Sort</MenuItem>
            <MenuItem value="Selection Sort">Selection Sort</MenuItem>
            <MenuItem value="Quick Sort">Quick Sort</MenuItem>
            <MenuItem value="Merge Sort">Merge Sort</MenuItem>
            <MenuItem value="Heap Sort">Heap Sort</MenuItem>
          </Select>
        </div>
        <Button variant="contained" size="small" className={classes.sortButton} onClick={handleSort} disabled={isSorting}>Sort!</Button>
      </div>
      {/* </div> */}
    </AppBar >
    // </div >
  )
}

export default Header;
