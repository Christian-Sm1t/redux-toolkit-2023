import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts, addPost, clearPosts } from '../redux/slices/postsSlice'
import PostExcerpt from './PostExcerpt'

function PostsList() {
  const dispatch = useAppDispatch()

  const posts = useAppSelector(selectAllPosts)
  const postsStatus = useAppSelector(getPostsStatus)
  const error = useAppSelector(getPostsError)

  useEffect(() => {
    const controller = new AbortController()
    if (postsStatus === 'idle') {
      void dispatch(fetchPosts(controller))
    }
    return () => {
      controller.abort()
      console.log(postsStatus)
      console.log(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let content
  if (postsStatus === 'loading') {
    content = <p>Loading...</p>
  } else if (postsStatus === 'succeeded') {
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    content = orderedPosts.map((post) => <PostExcerpt key={post.id} post={post} />)
  } else if (postsStatus === 'failed') {
    content = <p>{error}</p>
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  )
}

export default PostsList
