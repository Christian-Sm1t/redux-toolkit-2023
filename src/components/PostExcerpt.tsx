import React from 'react'
import PostAuthor from './PostAuthor'
import PostReactions from './PostReactions'
import TimeAgo from './TimeAgo'
import { type IPostsStatePost } from '../types/post.types'

interface IProps {
  post: IPostsStatePost
}

function PostExcerpt(props: IProps) {
  const { post } = props

  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 100)}</p>
      <PostAuthor userId={post.userId} />
      <PostReactions post={post} />
      <TimeAgo timestamp={post.date} />
    </article>
  )
}

export default PostExcerpt
