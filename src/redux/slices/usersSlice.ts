import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { type RootState } from '../store'
import { type IUserState } from '../../types/user.types'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

const initialState: IUserState[] = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get(USERS_URL)
  return response.data
})

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export const selectAllUsers = (state: RootState) => state.users

export const selectUserById = (state: RootState, userId?: number) => {
  return state.users.find((user) => user.id === userId)
}

export default userSlice.reducer
