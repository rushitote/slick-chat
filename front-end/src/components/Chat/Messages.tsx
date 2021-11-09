import styles from './Messages.module.css'
import messageContext from '../../utils/Contexts/messagesContext'
import { useContext, useRef, useEffect } from 'react'
import Message from './Message'
import avatar from '../../images/avatar.png'
import Loading from '../UI/Loading'
export interface IMessagesProps {}

export default function Messages(props: IMessagesProps) {
  const ctx = useContext(messageContext)

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current !== null) scrollRef.current.scrollTop = scrollRef.current?.scrollHeight
  }, [ctx])
  if (!ctx.loading) {
    return (
      <div className={styles['chat-messages-container']} ref={scrollRef}>
        <div className={styles['chat-messages']}>
          {ctx.messages.map((message) => {
            return (
              <Message
                content={message.content}
                image={message.image || avatar}
                username={message.username}
                key={message.messageId}
              />
            )
          })}
        </div>
      </div>
    )
  } else {
    return <Loading />
  }
}
