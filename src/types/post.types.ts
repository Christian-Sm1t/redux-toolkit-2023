export interface IPostsStatePost {
  id: number
  title: string
  userId?: string
  body: string
  date: string
  reactions: IReactions
}

export interface IReactions {
  thumbsUp: number
  wow: number
  heart: number
  rocket: number
  coffee: number
}

export interface IPostsState {
  posts: IPostsStatePost[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined | null
}
