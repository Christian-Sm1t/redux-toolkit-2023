import React from 'react'
import PostAuthor from './PostAuthor'
import PostReactions from './PostReactions'
import TimeAgo from './TimeAgo'
import { useAppSelector } from '../../redux/hooks'
import { selectPostById } from '../../redux/slices/postsSlice'
import { Link, useParams } from 'react-router-dom'

function PostSinglePage() {
  const { postId } = useParams<{ postId: string }>()

  const post = useAppSelector((state) => selectPostById(state, Number(postId)))

  if (post === undefined) {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    )
  }
  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <Link to={`/post/edit/${post.id}`}>Edit post</Link>
      <PostAuthor userId={post.userId} />
      <PostReactions post={post} />
      <TimeAgo timestamp={post.date} />
    </article>
  )
}

export default PostSinglePage
