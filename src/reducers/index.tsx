import generateArray, { DataPattern } from '../utils/generateRandomArray';
import { sliderToDelay } from '../utils/speed';

// ACTION TYPES
const GENERATE_NEW_ARRAY = 'GENERATE_NEW_ARRAY';
const RESET_ARRAY = 'RESET_ARRAY';
const COMPARE = 'COMPARE';
const SWAP_START = 'SWAP_START';
const SWAP_END = 'SWAP_END';
const SLEEP = 'SLEEP';
const MARK_SORTED = 'MARK_SORTED';
const SET_ARRAY_SIZE = 'SET_ARRAY_SIZE';
const SET_SORT_SPEED = 'SET_SORT_SPEED';
const SET_ALGORITHM = 'SET_ALGORITHM';
const SET_DATA_PATTERN = 'SET_DATA_PATTERN';
const IS_SORTING = 'IS_SORTING';

// ACTION CREATORS
export const setNewArray = (array: number[]) => {
  return {
    type: GENERATE_NEW_ARRAY,
    payload: array
  }
}

export const resetArray = () => {
  return {
    type: RESET_ARRAY
  }
}

export const setArraySize = (size: number) => {
  return {
    type: SET_ARRAY_SIZE,
    payload: size
  }
}

export const setSortSpeed = (sliderValue: number, speed: number) => {
  return {
    type: SET_SORT_SPEED,
    payload: { sliderValue, speed }
  }
}

export const setAlgorithm = (algorithm: string) => {
  return {
    type: SET_ALGORITHM,
    payload: algorithm
  }
}

export const setDataPattern = (pattern: DataPattern) => {
  return {
    type: SET_DATA_PATTERN,
    payload: pattern
  }
}

// count is how many real comparisons this highlight represents (0 for highlight-only steps)
export const compare = (compareIdxArr: number[], count: number = 1) => {
  return {
    type: COMPARE,
    payload: { indices: compareIdxArr, count }
  }
}

export const swapStart = (swapIdxArr: number[]) => {
  return {
    type: SWAP_START,
    payload: swapIdxArr
  }
}

export const swapEnd = (newArr: number[]) => {
  return {
    type: SWAP_END,
    payload: newArr
  }
}

export const sleep = () => {
  return {
    type: SLEEP
  }
}

export const markSorted = (indices: number[]) => {
  return {
    type: MARK_SORTED,
    payload: indices
  }
}

export const setIsSorting = (isSorting: boolean) => {
  return {
    type: IS_SORTING,
    payload: isSorting
  }
}

// ---------------------------- SEPARATE FILE

export interface RootState {
  array: number[];
  initialArray: number[];
  swapped: number[];
  compared: number[];
  sorted: number[];
  comparisons: number;
  swaps: number;
  arraySize: number;
  sortSpeed: number;
  speedSliderValue: number;
  algorithm: string;
  dataPattern: DataPattern;
  isSorting: boolean;
}

const DEFAULT_ARRAY_SIZE = 50;
const DEFAULT_SPEED_SLIDER = 80;
const initialArray = generateArray(DEFAULT_ARRAY_SIZE, 'random');

const clearedProgress = {
  swapped: [],
  compared: [],
  sorted: [],
  comparisons: 0,
  swaps: 0
}

// INITIAL STATE
const defaultState: RootState = {
  ...clearedProgress,
  array: initialArray,
  initialArray,
  arraySize: DEFAULT_ARRAY_SIZE,
  sortSpeed: sliderToDelay(DEFAULT_SPEED_SLIDER),
  speedSliderValue: DEFAULT_SPEED_SLIDER,
  algorithm: 'Bubble Sort',
  dataPattern: 'random',
  isSorting: false
}

// REDUCER
const reducer = (state: RootState = defaultState, action: any): RootState => {
  const { type, payload } = action;
  switch (type) {
    case GENERATE_NEW_ARRAY:
      return {
        ...state,
        ...clearedProgress,
        array: payload,
        initialArray: payload,
        isSorting: false
      }
    case RESET_ARRAY:
      return {
        ...state,
        ...clearedProgress,
        array: state.initialArray,
        isSorting: false
      }
    case COMPARE:
      return {
        ...state,
        compared: payload.indices,
        swapped: [],
        comparisons: state.comparisons + payload.count
      }
    case SWAP_START:
      return {
        ...state,
        compared: [],
        swapped: payload
      }
    case SWAP_END:
      return {
        ...state,
        array: payload,
        swaps: state.swaps + 1
      }
    case SLEEP:
      return {
        ...state,
        swapped: [],
        compared: []
      }
    case MARK_SORTED:
      return {
        ...state,
        sorted: state.sorted.concat(payload.filter((idx: number) => !state.sorted.includes(idx)))
      }
    case SET_ARRAY_SIZE: {
      return {
        ...state,
        arraySize: payload
      }
    }
    case SET_SORT_SPEED: {
      return {
        ...state,
        sortSpeed: payload.speed,
        speedSliderValue: payload.sliderValue
      }
    }
    case SET_ALGORITHM: {
      return {
        ...state,
        algorithm: payload
      }
    }
    case SET_DATA_PATTERN: {
      return {
        ...state,
        dataPattern: payload
      }
    }
    case IS_SORTING: {
      return payload
        ? { ...state, ...clearedProgress, isSorting: true }
        : { ...state, isSorting: false }
    }
    default:
      return state
  }
}
export default reducer;
