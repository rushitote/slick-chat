import styles from './Input.module.css'
import image from '../../images/send.png'
import { KeyboardEvent, useRef } from 'react'
import { useContext } from 'react'
import messageContext, { Message } from '../../utils/messagesContext'
import socketContext from '../../utils/socketContext'
export interface IInputProps {}

export default function Input(props: IInputProps) {
  const ctx = useContext(messageContext)
  const { socket, roomId } = useContext(socketContext)
  const messageBoxRef = useRef<HTMLInputElement>(null)

  const sendMessage = () => {
    if (messageBoxRef.current !== null) {
      if (messageBoxRef.current.value.trim().length !== 0) {
        const message: Message = {
          content: messageBoxRef.current.value,
          username: 'Me',
        }
        ctx.sendMessage(message)
        messageBoxRef.current.value = ''
        socket?.emit(
          'newMessage',
          JSON.stringify({
            roomId,
            content: message.content,
          })
        )
      }
    }
  }
  const keyUpHandler = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }
  return (
    <div className={styles['input']}>
      <input
        type="text"
        className={styles['input-box']}
        ref={messageBoxRef}
        onKeyDown={keyUpHandler}
        placeholder="Type your message here"
      />
      <div className={`${styles['input-send-message']}`}>
        <img src={image} alt="" onClick={sendMessage} />
      </div>
    </div>
  )
}
