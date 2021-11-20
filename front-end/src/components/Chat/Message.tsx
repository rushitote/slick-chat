import * as React from 'react'
import styles from './Message.module.css'
import { forwardRef } from 'react'
export interface IMessageProps {
  content: string
  image: string
  username: string
  id: string
}

const Message = forwardRef((props: IMessageProps, ref: any) => {
  return (
    <div className={styles['message']} ref={ref} id={props.id}>
      <img className={styles['message-user-image']} alt='User profile' src={props.image} />
      <div className={styles['message-body']}>
        <div className={styles['message-user-name']}>{props.username}</div>
        <div className={styles['message-body-text']}>{props.content}</div>
      </div>
    </div>
  )
})

export default Message
