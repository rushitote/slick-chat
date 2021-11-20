import styles from './Messages.module.css'
import messageContext from '../../utils/Contexts/messagesContext'
import { useContext, useRef, useEffect } from 'react'
import Message from './Message'
import avatar from '../../images/avatar.png'
import Loading from '../UI/Loading'
import { useInView } from 'react-intersection-observer'
import SpinningCircle from '../UI/SpinningCircle'
export interface IMessagesProps {}

export default function Messages(props: IMessagesProps) {
  const { messages, refreshMessages, loading, isRefreshing } = useContext(messageContext)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [ref, inView] = useInView({
    threshold: 0,
  })

  useEffect(() => {
    console.log('refreshed')
    const asyncWrapper = async () => {
      // const lastMessage = document.getElementById(messages[0].messageId)
      await refreshMessages(messages[0])
      // lastMessage?.scrollIntoView()
    }
    if (inView) {
      asyncWrapper()
    }
  }, [inView, messages, refreshMessages])
  if (!loading) {
    return (
      <div className={styles['chat-messages-container']} ref={scrollRef}>
        <div className={styles['chat-messages']}>
          {messages.map((message, i) => {
            if (Math.floor(messages.length / 2) === i) {
              return (
                <Message
                  content={message.content}
                  image={message.image || avatar}
                  username={message.username}
                  key={message.messageId}
                  id={message.messageId}
                  ref={ref}
                />
              )
            } else {
              return (
                <Message
                  content={message.content}
                  image={message.image || avatar}
                  username={message.username}
                  key={message.messageId}
                  id={message.messageId}
                />
              )
            }
          })}
        </div>
      </div>
    )
  } else {
    return <Loading />
  }
}
