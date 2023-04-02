import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '../store'

interface IPostsState {
  id: string
  title: string
  content: string
}

const initialState: IPostsState[] = [
  {
    id: '1',
    title: 'About Redux Toolkit in 2023',
    content: 'How about getting to know the ways of using Redux in 2023',
  },
  {
    id: '2',
    title: 'About Redux Toolkit in 2023 extended',
    content: 'How about getting to know the ins and outs of Redux in 2023',
  },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      reducer(state, action: PayloadAction<IPostsState>) {
        state.push(action.payload)
      },
      prepare(title: string, content: string) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
          },
        }
      },
    },
  },
})

export const selectAllPosts = (state: RootState) => state.posts

export const { addPost } = postsSlice.actions

export default postsSlice.reducer
