import styles from './Input.module.css'
import image from '../../images/send.png'
import { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import socketContext from '../../utils/Contexts/socketContext'

export interface IInputProps {}

export default function Input(props: IInputProps) {
  const { socket, roomId } = useContext(socketContext)
  const messageBoxRef = useRef<HTMLInputElement>(null)
  const [text, setText] = useState<string>('')
  const isTyping = useRef(false)
  const sendMessage = () => {
    if (messageBoxRef.current !== null) {
      if (messageBoxRef.current.value.trim().length !== 0) {
        if (isTyping) {
          socket?.emit('typing', JSON.stringify({ roomId, typing: false }))
          isTyping.current = false
        }
        socket?.emit(
          'newMessage',
          JSON.stringify({
            roomId,
            content: messageBoxRef.current.value,
          })
        )
        setText('')
      }
    }
  }
  useEffect(() => {
    if (!text) return
    if (!isTyping.current) {
      isTyping.current = true
      socket?.emit('typing', JSON.stringify({ roomId, typing: true }))
    }
    const timeout = setTimeout(() => {
      isTyping.current = false
      socket?.emit('typing', JSON.stringify({ roomId, typing: false }))
    }, 2000)
    return () => {
      clearTimeout(timeout)
    }
  }, [socket, roomId, text])
  const keyUpHandler = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  return (
    <div className={styles['input']}>
      <input
        type='text'
        className={styles['input-box']}
        ref={messageBoxRef}
        onKeyDown={keyUpHandler}
        placeholder='Type your message here'
        onChange={(e) => {
          setText(e.target.value)
        }}
        value={text}
      />
      <div className={`${styles['input-send-message']}`}>
        <img src={image} alt='' onClick={sendMessage} />
      </div>
    </div>
  )
}
