import messageContext from '../../utils/messagesContext'
import styles from './Messages.module.css'
import { useContext, useRef, useEffect } from 'react'
import Message from './Message'
import avatar from '../../images/avatar.png'
export interface IMessagesProps {}

export default function Messages(props: IMessagesProps) {
  const ctx = useContext(messageContext)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current !== null)
      scrollRef.current.scrollTop = scrollRef.current?.scrollHeight
  }, [ctx])
  return (
    <div className={styles['chat-messages-container']} ref={scrollRef}>
      <div className={styles['chat-messages']}>
        {ctx.messages.map((message) => {
          return (
            <Message
              content={message.content}
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
