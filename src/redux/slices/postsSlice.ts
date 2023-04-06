import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '../store'
import { sub } from 'date-fns'

export interface IPostsState {
  id: string
  title: string
  userId?: string
  content: string
  date: string
}

export interface IReactions {
  thumbsUp: number
  wow: number
  heart: number
  rocket: number
  coffee: number
}

const initialState: Array<IPostsState & { reactions: IReactions }> = [
  {
    id: '1',
    title: 'About Redux Toolkit in 2023',
    content: 'How about getting to know the ways of using Redux in 2023',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: '2',
    title: 'About Redux Toolkit in 2023 extended',
    content: 'How about getting to know the ins and outs of Redux in 2023',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      reducer(state, action: PayloadAction<IPostsState & { reactions: IReactions }>) {
        state.push(action.payload)
      },
      prepare(title: string, content: string, userId: string) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        }
      },
    },
    reactionAdded(state, action: PayloadAction<{ postId: string; reaction: keyof IReactions }>) {
      const { postId, reaction } = action.payload
      const existingPost: (IPostsState & { reactions: IReactions }) | undefined = state.find((post) => post.id === postId)
      if (existingPost != null) {
        existingPost.reactions[reaction]++
      }
    },
  },
})

export const selectAllPosts = (state: RootState) => state.posts

export const { addPost, reactionAdded } = postsSlice.actions

export default postsSlice.reducer
