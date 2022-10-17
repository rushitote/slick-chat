import styles from './ChatWindow.module.css'
import Input from '../Input/Input'
import Messages from './Messages'
import { useContext } from 'react'
import messageContext from '../../utils/Contexts/messagesContext'
import socketContext from '../../utils/Contexts/socketContext'
import LandingPage from '../../Pages/LandingPage'

export default function ChatWindow() {
  const users = useContext(messageContext).users
  const { roomName } = useContext(socketContext)
  if (!roomName) {
    return (
      <>
        <LandingPage />
      </>
    )
  }
  return (
    <div className={styles['chat-window']}>
      <div className={styles['roomHeading']}>
        <h2 className={styles['roomTitle']}>{roomName}</h2>
        <h3 className={styles['participant']}>{users.length} participants</h3>
      </div>
      <Messages />
      <Input />
    </div>
  )
}
