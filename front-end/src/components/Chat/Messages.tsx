import messageContext from '../../utils/messagesContext'
import styles from './Messages.module.css'
import { useContext } from 'react'
import Message from './Message'
import avatar from '../../images/avatar.jpg'
export interface IMessagesProps {}

export default function Messages(props: IMessagesProps) {
  const ctx = useContext(messageContext)
  return (
    <div className={styles['chat-messages-container']}>
      <div className={styles['chat-messages']}>
        {ctx.received.map((message) => {
          return (
            <Message
              text={message.text}
              image={message.image || avatar}
              username={message.username}
              key={Math.random()}
            />
          )
        })}
      </div>
    </div>
  )
}
