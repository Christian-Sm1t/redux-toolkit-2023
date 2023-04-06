import { useAppSelector } from '../redux/hooks'
import { selectAllPosts } from '../redux/slices/postsSlice'
import PostAuthor from './PostAuthor'
import PostReactions from './PostReactions'
import TimeAgo from './TimeAgo'

function PostsList() {
  const posts = useAppSelector(selectAllPosts)
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  const renderedPosts = orderedPosts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <PostAuthor userId={post.userId} />
      <PostReactions post={post} />
      <TimeAgo timestamp={post.date} />
    </article>
  ))

  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}

export default PostsList
