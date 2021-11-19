import styles from './Messages.module.css'
import messageContext from '../../utils/Contexts/messagesContext'
import { useContext, useRef, useEffect } from 'react'
import Message from './Message'
import avatar from '../../images/avatar.png'
import Loading from '../UI/Loading'
import { useInView } from 'react-intersection-observer'
export interface IMessagesProps {}

export default function Messages(props: IMessagesProps) {
  const ctx = useContext(messageContext)
  const scrollRef = useRef<any>(null)
  const [ref, inView] = useInView({
    threshold: 0,
  })
  useEffect(() => {
    const asyncWrapper = async () => {
      await ctx.refreshMessages(ctx.messages[0])
    }
    if (inView) {
      console.log('calling fetch')
      asyncWrapper()
    }
  }, [inView, ctx])
  if (!ctx.loading) {
    return (
      <div className={styles['chat-messages-container']} ref={scrollRef}>
        <div className={styles['chat-messages']}>
          <div ref={ref}></div>
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
