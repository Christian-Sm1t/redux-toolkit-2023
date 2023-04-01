import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface ICounterState {
  count: number
}

const initialState: ICounterState = {
  count: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1
    },
    decrement: (state) => {
      state.count -= 1
    },
    reset: (state) => {
      state.count = 0
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.count += action.payload
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      state.count -= action.payload
    },
  },
})

export const {
  increment,
  decrement,
  reset,
  incrementByAmount,
  decrementByAmount,
} = counterSlice.actions
export default counterSlice.reducer
