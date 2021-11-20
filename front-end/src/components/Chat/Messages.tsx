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
  const scrollRef = useRef<any>(null)
  const [ref, inView] = useInView({
    threshold: 0,
  })
  useEffect(() => {
    const asyncWrapper = async () => {
      await refreshMessages(messages[0])
    }
    if (inView) {
      asyncWrapper()
    }
  }, [inView, messages, refreshMessages])
  if (!loading) {
    return (
      <div className={styles['chat-messages-container']} ref={scrollRef}>
        <div className={styles['chat-messages']}>
          <div ref={ref} className={styles['fetch_div']}>
            {isRefreshing && <SpinningCircle />}
          </div>
          {messages.map((message) => {
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
