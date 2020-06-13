// ACTION TYPES
const GENERATE_NEW_ARRAY = 'GENERATE_NEW_ARRAY';
const COMPARE = 'COMPARE';
const SWAP_START = 'SWAP_START';
const SWAP_END = 'SWAP_END';
const SLEEP = 'SLEEP';
const SET_ARRAY_SIZE = 'SET_ARRAY_SIZE';
const SET_SORT_SPEED = 'SET_SORT_SPEED';
const SET_ALGORITHM = 'SET_ALGORITHM';
const IS_SORTING = 'IS_SORTING';

// ACTION CREATORS
export const setNewArray = (array: number[]) => {
  return {
    type: GENERATE_NEW_ARRAY,
    payload: array
  }
}

export const setArraySize = (size: number) => {
  return {
    type: SET_ARRAY_SIZE,
    payload: size
  }
}

export const setSortSpeed = (speed: number) => {
  return {
    type: SET_SORT_SPEED,
    payload: speed
  }
}

export const setAlgorithm = (algorithm: string) => {
  return {
    type: SET_ALGORITHM,
    payload: algorithm
  }
}

export const compare = (compareIdxArr: number[]) => {
  return {
    type: COMPARE,
    payload: compareIdxArr
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

export const setIsSorting = (isSorting: boolean) => {
  console.log('setIsSorting = ', isSorting)
  return {
    type: IS_SORTING,
    payload: isSorting
  }
}

// ---------------------------- SEPARATE FILE

// INITIAL STATE
const defaultState = {
  array: [],
  swapped: [],
  compared: [],
  arraySize: 50,
  sortSpeed: 50,
  algorithm: 'Bubble Sort',
  isSorting: false
}

// REDUCER
const reducer = (state = defaultState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case GENERATE_NEW_ARRAY:
      return {
        ...state,
        array: payload,
        swapped: [],
        compared: []
      }
    case COMPARE:
      return {
        ...state,
        compared: payload,
        swapped: []
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
        array: payload
      }
    case SLEEP:
      return {
        ...state,
        swapped: [],
        compared: []
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
        sortSpeed: payload
      }
    }
    case SET_ALGORITHM: {
      return {
        ...state,
        algorithm: payload
      }
    }
    case IS_SORTING: {
      return {
        ...state,
        isSorting: payload
      }
    }
    default:
      return state
  }
}
export default reducer;
