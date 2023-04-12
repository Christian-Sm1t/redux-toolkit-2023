import PostExcerpt from './PostExcerpt'
import { useAppSelector } from '../../redux/hooks'
import { getPostsError, getPostsStatus, selectAllPosts } from '../../redux/slices/postsSlice'

function PostsList() {
  const posts = useAppSelector(selectAllPosts)
  const postsStatus = useAppSelector(getPostsStatus)
  const error = useAppSelector(getPostsError)

  let content
  if (postsStatus === 'loading') {
    content = <p>Loading...</p>
  } else if (postsStatus === 'succeeded') {
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    content = orderedPosts.map((post) => <PostExcerpt key={post.id} post={post} />)
  } else if (postsStatus === 'failed') {
    content = <p>{error}</p>
  }

  return <section>{content}</section>
}

export default PostsList
