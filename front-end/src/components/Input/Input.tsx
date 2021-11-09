import styles from './Input.module.css'
import image from '../../images/send.png'
import { KeyboardEvent, useRef } from 'react'
import { useContext } from 'react'
import socketContext from '../../utils/Contexts/socketContext'
export interface IInputProps {}

export default function Input(props: IInputProps) {
  const { socket, roomId } = useContext(socketContext)
  const messageBoxRef = useRef<HTMLInputElement>(null)

  const sendMessage = () => {
    if (messageBoxRef.current !== null) {
      if (messageBoxRef.current.value.trim().length !== 0) {
        socket?.emit(
          'newMessage',
          JSON.stringify({
            roomId,
            content: messageBoxRef.current.value,
          })
        )
        messageBoxRef.current.value = ''
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
        type='text'
        className={styles['input-box']}
        ref={messageBoxRef}
        onKeyDown={keyUpHandler}
        placeholder='Type your message here'
      />
      <div className={`${styles['input-send-message']}`}>
        <img src={image} alt='' onClick={sendMessage} />
      </div>
    </div>
  )
}
