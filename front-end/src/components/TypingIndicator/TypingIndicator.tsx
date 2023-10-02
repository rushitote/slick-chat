import React, { useContext } from 'react'
import messageContext from '../../utils/Contexts/messagesContext'
import styles from './TypingIndicator.module.css'
import { ThreeDots } from 'react-loader-spinner'

export const TypingIndicator = () => {
  const ctx = useContext(messageContext)
  const currentUser = localStorage.getItem('username')

  const usersTyping = ctx.users.filter((user) => user.typing && user.username !== currentUser)
  const count = usersTyping.length
  if (!count) {
    return null
  }

  let text
  if (count > 3) {
    text = `${usersTyping
      .map((user) => `${user.username}`)
      .slice(0, 2)
      .join(', ')} and ${count - 3} others are typing`
  } else if (count > 1) {
    text = `${usersTyping.map((user) => `${user.username}`).join(', ')} are typing`
  } else if (count === 1) {
    text = `${usersTyping.map((user) => `${user.username}`).join(', ')} is typing`
  }

  return (
    <div className={styles['root']}>
      {text && text}
      {usersTyping.length && (
        <ThreeDots
          height='30'
          width='30'
          radius='9'
          color='#4cc9f0'
          ariaLabel='three-dots-loading'
          wrapperStyle={{}}
          visible={true}
        />
      )}
    </div>
  )
}
