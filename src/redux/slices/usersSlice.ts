import { createSlice } from '@reduxjs/toolkit'
import { type RootState } from '../store'

interface IUserState {
  id: string
  name: string
}

const initialState: IUserState[] = [
  { id: '0', name: 'Dude Lebowki' },
  { id: '1', name: 'Paul Elstak' },
  { id: '2', name: 'Donny Devito' },
]

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
})

export const selectAllUsers = (state: RootState) => state.users

export const selectUserById = (state: RootState, userId?: string) => {
  return state.users.find((user) => user.id === userId)
}

export default userSlice.reducer
