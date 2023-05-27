import PostAuthor from './PostAuthor'
import PostReactions from './PostReactions'
import TimeAgo from './TimeAgo'
import { type IPostsStatePost } from '../../types/post.types'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks'
import { selectPostById } from '../../redux/slices/postsSlice'
import { type EntityId } from '@reduxjs/toolkit'

interface IProps {
  postId: EntityId
}

function PostExcerpt(props: IProps) {
  const { postId } = props

  const post: IPostsStatePost | undefined = useAppSelector((state) => selectPostById(state, postId))

  if (post === undefined) {
    return null
  }

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
