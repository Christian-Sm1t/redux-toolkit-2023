import { createSlice, createAsyncThunk, type PayloadAction, createSelector } from '@reduxjs/toolkit'
import axios from 'axios'
import { type RootState } from '../store'
import { type IPostsStatePost, type IPostsState, type IReactions } from '../../types/post.types'
import { sub } from 'date-fns'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

const initialState: IPostsState = {
  posts: [],
  status: 'idle',
  error: null,
  count: 0
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(POSTS_URL)
  return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (newPost: { title: string; body: string; userId: string }) => {
  const response = await axios.post(POSTS_URL, newPost)
  return response.data
})

export const updatePost = createAsyncThunk('posts/updatePosts', async (initialPost: Omit<IPostsStatePost, 'date'>) => {
  const { id } = initialPost
  const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
  return response.data
})

export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost: Omit<IPostsStatePost, 'date'>) => {
  const { id } = initialPost
  const response = await axios.delete(`${POSTS_URL}/${id}`)
  if (response?.status === 200) return initialPost // because of fake api
  return `${response?.status}: ${response?.statusText}`
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded(state: IPostsState, action: PayloadAction<{ postId: number; reaction: keyof IReactions }>) {
      const { postId, reaction } = action.payload
      const existingPost: IPostsStatePost | undefined = state.posts.find((post) => post.id === postId)
      if (existingPost != null) {
        existingPost.reactions[reaction]++
      }
    },
    increaseCount(state: IPostsState) {
      console.log(state.count)
      state.count++
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
        action.payload.userId = Number(action.payload.userId)
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
      .addCase(updatePost.fulfilled, (state, action) => {
        if (action.payload.id === undefined) {
          return
        }
        const { id } = action.payload as IPostsStatePost
        action.payload.date = new Date().toISOString()
        action.payload.userId = Number(action.payload.userId)
        const posts = state.posts.filter((post) => post.id !== id)
        state.posts = [...posts, action.payload]
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (typeof action.payload === 'string') {
          return
        }
        if (action.payload.id === undefined) {
          return
        }
        const { id } = action.payload as IPostsStatePost
        const posts = state.posts.filter((post) => post.id !== id)
        state.posts = posts
      })
  }
})

export const selectAllPosts = (state: RootState) => state.posts.posts
export const getPostsStatus = (state: RootState) => state.posts.status
export const getPostsError = (state: RootState) => state.posts.error
export const getPostCount = (state: RootState) => state.posts.count

export const selectPostById = (state: RootState, postId: number): IPostsStatePost | undefined => state.posts.posts.find((post) => post.id === postId)

export const selectPostsByUserId = createSelector([selectAllPosts, (state, userId) => userId], (posts, userId) => posts.filter((post) => post.userId === userId))

export const { increaseCount, reactionAdded, clearPosts } = postsSlice.actions

export default postsSlice.reducer
