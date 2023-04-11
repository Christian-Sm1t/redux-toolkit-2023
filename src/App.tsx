import PostAddForm from './components/Posts/PostAddForm'
import PostsList from './components/Posts/PostsList'
import PostSinglePage from './components/Posts/PostSinglePage'
import Layout from './components/Layout/Layout'
import { Route, Routes } from 'react-router-dom'
import PostEditForm from './components/Posts/PostEditForm'

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
      </Route>
    </Routes>
  )
}

export default App
