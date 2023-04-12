import PostAddForm from './components/Posts/PostAddForm'
import PostsList from './components/Posts/PostsList'
import PostSinglePage from './components/Posts/PostSinglePage'
import Layout from './components/Layout/Layout'
import { Route, Routes, Navigate } from 'react-router-dom'
import PostEditForm from './components/Posts/PostEditForm'
import UsersList from './components/Users/UsersList'
import UserPage from './components/Users/UserPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />
        <Route path="post">
          <Route index element={<PostAddForm />} />
          <Route path=":postId" element={<PostSinglePage />} />
          <Route path="edit/:postId" element={<PostEditForm />} />
        </Route>
        <Route path="user">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
