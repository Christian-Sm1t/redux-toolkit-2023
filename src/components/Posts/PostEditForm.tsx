import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectPostById, updatePost } from '../../redux/slices/postsSlice'
import { selectAllUsers } from '../../redux/slices/usersSlice'

function PostEditForm() {
  const { postId } = useParams<{ postId: string }>()

  const post = useAppSelector((state) => selectPostById(state, Number(postId)))
  const navigate = useNavigate()

  const users = useAppSelector(selectAllUsers)

  const [title, setTitle] = useState<string>(post?.title ?? '')
  const [body, setBody] = useState<string>(post?.body ?? '')
  const [userId, setUserId] = useState<string>(post?.userId ?? '')
  const [editRequestStatus, setEditRequestStatus] = useState('idle')

  const dispatch = useAppDispatch()

  if (post === undefined) {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    )
  }

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value)
  }

  const onAuthorChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(e.target.value)
  }

  const canSave = Boolean(title) && Boolean(body) && Boolean(userId) && editRequestStatus === 'idle'

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setEditRequestStatus('pending')
        void dispatch(updatePost({ id: post.id, title, body, userId, reactions: post.reactions })).unwrap()

        setTitle('')
        setBody('')
        setUserId('')
        navigate(`/post/${post.id}`)
      } catch (err) {
        console.error('Failed to save the post', err)
      } finally {
        setEditRequestStatus('idle')
      }
    }
  }

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" name="postTitle" value={title} onChange={onTitleChanged} />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" defaultValue={userId} onChange={onAuthorChanged}>
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

export default PostEditForm
