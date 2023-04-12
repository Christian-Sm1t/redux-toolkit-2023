import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { addNewPost } from '../../redux/slices/postsSlice'
import { selectAllUsers } from '../../redux/slices/usersSlice'
import { useNavigate } from 'react-router-dom'

function PostAddForm() {
  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const [userId, setUserId] = useState<string>('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useAppDispatch()
  const users = useAppSelector(selectAllUsers)

  const navigate = useNavigate()

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value)
  }

  const onAuthorChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(e.target.value)
  }

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        void dispatch(addNewPost({ title, body, userId })).unwrap()

        setTitle('')
        setBody('')
        setUserId('')
        navigate(`/`)
      } catch (err) {
        console.error(err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }
  const canSave = Boolean(title) && Boolean(body) && Boolean(userId) && addRequestStatus === 'idle'

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" name="postTitle" value={title} onChange={onTitleChanged} />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" value={body} onChange={onContentChanged} />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  )
}

export default PostAddForm
