import * as React from 'react'
import styles from './Message.module.css'
import { forwardRef } from 'react'
export interface IMessageProps {
  content: string
  image: string
  username: string
  id: string
  oneLine?: boolean
}

const Message = forwardRef((props: IMessageProps, ref: any) => {
  if (props.oneLine === undefined) {
    return (
      <div className={styles['message']} ref={ref} id={props.id}>
        <img className={styles['message-user-image']} alt='User profile' src={props.image} />

        <div className={styles['message-body']}>
          <div className={styles['message-user-name']}>{props.username}</div>
          <div>{props.content}</div>
        </div>
      </div>
    )
  } else {
    return (
      <div ref={ref} id={props.id}>
        <div className={styles['message-body-text']}>{props.content}</div>
      </div>
    )
  }
})

export default Message
