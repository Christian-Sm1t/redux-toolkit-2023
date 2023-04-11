import { createSlice, nanoid, createAsyncThunk, type PayloadAction, bindActionCreators } from '@reduxjs/toolkit'
import axios from 'axios'
import { type RootState } from '../store'
import { type IPostsStatePost, type IPostsState, type IReactions } from '../../types/post.types'
import { sub } from 'date-fns'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

const initialState: IPostsState = {
  posts: [],
  status: 'idle',
  error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (controller: AbortController) => {
  const response = await axios.get(POSTS_URL, { signal: controller.signal })
  console.log(response)
  return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (newPost: { title: string; body: string; userId: string }) => {
  const response = await axios.post(POSTS_URL, newPost)
  return response.data
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      reducer(state: IPostsState, action: PayloadAction<IPostsStatePost>) {
        state.posts.push(action.payload)
      },
      prepare(title: string, body: string, userId: string) {
        return {
          payload: {
            id: nanoid(),
            title,
            body,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0
            }
          }
        }
      }
    },
    reactionAdded(state: IPostsState, action: PayloadAction<{ postId: string; reaction: keyof IReactions }>) {
      const { postId, reaction } = action.payload
      const existingPost: IPostsStatePost | undefined = state.posts.find((post) => post.id === postId)
      if (existingPost != null) {
        existingPost.reactions[reaction]++
      }
    },
    clearPosts(state: IPostsState) {
      state.posts = []
      state.status = 'idle'
      state.error = null
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // add fake date that is missing in fake api
        let min: number = 1
        const loadedPosts = action.payload.map((post: { userId: number; id: number; title: string; body: string; date?: string; reactions: IReactions }) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString()
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
          }
          return post
        })
        state.posts = state.posts.concat(loadedPosts)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.date = new Date().toISOString()
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0
        }
        console.log(action.payload)
        state.posts.push(action.payload)
      })
  }
})

export const selectAllPosts = (state: RootState) => state.posts.posts
export const getPostsStatus = (state: RootState) => state.posts.status
export const getPostsError = (state: RootState) => state.posts.error

export const { addPost, reactionAdded, clearPosts } = postsSlice.actions

export default postsSlice.reducer
