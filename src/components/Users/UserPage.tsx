import { Link, useParams } from 'react-router-dom'
import { selectUserById } from '../../redux/slices/usersSlice'
import { useAppSelector } from '../../redux/hooks'
import { type IPostsStatePost } from '../../types/post.types'
import { selectPostsByUserId } from '../../redux/slices/postsSlice'

const UserPage = () => {
  const { userId } = useParams()
  const user = useAppSelector((state) => selectUserById(state, Number(userId)))

  const postsForUser: IPostsStatePost[] = useAppSelector((state) => selectPostsByUserId(state, Number(userId)))

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ))

  return (
    <section>
      <h2>{user?.name}</h2>

      <ol>{postTitles}</ol>
    </section>
  )
}

export default UserPage
