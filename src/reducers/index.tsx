// ACTION TYPES
const GENERATE_NEW_ARRAY = 'GENERATE_NEW_ARRAY';
const COMPARE = 'COMPARE';
const SWAP_START = 'SWAP_START';
const SWAP_END = 'SWAP_END';
const SLEEP = 'SLEEP';

// ACTION CREATORS
export const setNewArray = (array: number[]) => {
  console.log('action creator setARray = ', array);
  return {
    type: GENERATE_NEW_ARRAY,
    payload: array
  }
}

export const compare = (compareIdxArr: number[]) => {
  console.log('in compare ', compareIdxArr)
  return {
    type: COMPARE,
    payload: compareIdxArr
  }
}

export const swapStart = (swapIdxArr: number[]) => {
  console.log('swapStart.. swapIdxArr = ', swapIdxArr);
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

// ---------------------------- SEPARATE FILE

// INITIAL STATE
const defaultState = {
  array: [],
  swapped: [],
  compared: []
}

// REDUCER
const reducer = (state = defaultState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case GENERATE_NEW_ARRAY:
      console.log('generate new array reducer ', payload)
      return {
        ...state,
        array: payload,
        swapped: [],
        compared: []
      }
    case COMPARE:
      console.log('reducer compare ', payload);
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
    default:
      return state
  }
}
export default reducer;
