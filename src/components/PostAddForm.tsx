import React, { useState } from 'react'
import { useAppDispatch } from '../redux/hooks'
import { addPost } from '../redux/slices/postsSlice'

function PostAddForm() {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const dispatch = useAppDispatch()

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const onSavePostClicked = () => {
    if (title.length > 0 && content.length > 0) {
      dispatch(addPost(title, content))
      setTitle('')
      setContent('')
    }
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" name="postTitle" value={title} onChange={onTitleChanged} />
        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" value={content} onChange={onContentChanged} />
        <button type="button" onClick={onSavePostClicked}>
          Save Post
        </button>
      </form>
    </section>
  )
}

export default PostAddForm
