import PostExcerpt from './PostExcerpt'
import { useAppSelector } from '../../redux/hooks'
import { selectPostIds, getPostsError, getPostsStatus } from '../../redux/slices/postsSlice'

function PostsList() {
  const orderedPostIds = useAppSelector(selectPostIds)
  const postsStatus = useAppSelector(getPostsStatus)
  const error = useAppSelector(getPostsError)

  let content
  if (postsStatus === 'loading') {
    content = <p>Loading...</p>
  } else if (postsStatus === 'succeeded') {
    content = orderedPostIds.map((postId) => <PostExcerpt key={postId} postId={postId} />)
  } else if (postsStatus === 'failed') {
    content = <p>{error}</p>
  }

  return <section>{content}</section>
}

export default PostsList
