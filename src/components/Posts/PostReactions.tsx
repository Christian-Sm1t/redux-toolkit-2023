import React from 'react'
import { type IPostsStatePost, type IReactions } from '../../types/post.types'
import { useAppDispatch } from '../../redux/hooks'
import { reactionAdded } from '../../redux/slices/postsSlice'

const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕'
}

function PostReactions(props: { post: IPostsStatePost & { reactions: IReactions } }) {
  const { post } = props
  const dispatch = useAppDispatch()

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button key={name} type="button" onClick={() => dispatch(reactionAdded({ postId: post.id, reaction: name as keyof IReactions }))}>
        {emoji} {post.reactions[name as keyof IReactions]}
      </button>
    )
  })
  return <div>{reactionButtons}</div>
}

export default PostReactions
