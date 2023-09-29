import styles from './ChatWindow.module.css'
import Input from '../Input/Input'
import Messages from './Messages'
import { useContext } from 'react'
import messageContext from '../../utils/Contexts/messagesContext'
import socketContext from '../../utils/Contexts/socketContext'
import { TypingIndicator } from '../TypingIndicator/TypingIndicator'

export default function ChatWindow() {
  const users = useContext(messageContext).users
  const { roomName } = useContext(socketContext)
  return (
    <div className={styles['chat-window']}>
      <div className={styles['roomHeading']}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            width: '100%',
          }}
        >
          <h2 className={styles['roomTitle']}>{roomName}</h2>
          <h3 className={styles['participant']}>{users.length} participants</h3>
        </div>
        <TypingIndicator />
      </div>
      <Messages />
      <Input />
    </div>
  )
}
