import { useAppSelector, useAppDispatch } from '../redux/hooks'
import {
  increment,
  decrement,
  reset,
  incrementByAmount,
  decrementByAmount,
} from '../redux/counterSlice'
import { useState } from 'react'

const Counter = () => {
  const count = useAppSelector((state) => state.counter.count)
  const dispatch = useAppDispatch()

  const [incrementAmount, setIncrementAmount] = useState<number>(0)

  const resetAll = () => {
    setIncrementAmount(0)
    dispatch(reset())
  }

  return (
    <section>
      <p>{count}</p>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
        <div>
          <input
            type="number"
            value={incrementAmount}
            onChange={(e) => {
              setIncrementAmount(parseInt(e.target.value))
            }}
          />
          <button onClick={() => dispatch(incrementByAmount(incrementAmount))}>
            increment by amount
          </button>
          <button onClick={() => dispatch(decrementByAmount(incrementAmount))}>
            decrement by amount
          </button>
        </div>
        <button onClick={resetAll}>reset</button>
      </div>
    </section>
  )
}

export default Counter
