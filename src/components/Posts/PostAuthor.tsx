import React from 'react'
import { useAppSelector } from '../../redux/hooks'
import { selectUserById } from '../../redux/slices/usersSlice'

function PostAuthor(props: { userId?: string }) {
  const { userId } = props

  const author = useAppSelector((state) => selectUserById(state, userId))

  return <span>by {author != null ? author.name : 'unknown author'}</span>
}

export default PostAuthor
