import * as React from 'react'
import styles from './Message.module.css'
export interface IMessageProps {
  content: string
  image: string
  username: string
}

export default function Message(props: IMessageProps) {
  return (
    <div className={styles['message']}>
      <img
        className={styles['message-user-image']}
        alt='User profile'
        src={props.image}
      />
      <div className={styles['message-body']}>
        <div className={styles['message-user-name']}>{props.username}</div>
        <div className={styles['message-body-text']}>{props.content}</div>
      </div>
    </div>
  )
}
