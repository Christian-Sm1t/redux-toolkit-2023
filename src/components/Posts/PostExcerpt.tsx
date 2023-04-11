import React from 'react'
import PostAuthor from './PostAuthor'
import PostReactions from './PostReactions'
import TimeAgo from './TimeAgo'
import { type IPostsStatePost } from '../../types/post.types'
import { Link } from 'react-router-dom'

interface IProps {
  post: IPostsStatePost
}

function PostExcerpt(props: IProps) {
  const { post } = props

  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body.substring(0, 100)}</p>
      <PostAuthor userId={post.userId} />
      <PostReactions post={post} />
      <Link to={`post/${post.id}`}>see full Post</Link>
      <TimeAgo timestamp={post.date} />
    </article>
  )
}

export default PostExcerpt
