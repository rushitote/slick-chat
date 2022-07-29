import styles from './ChatWindow.module.css'
import Input from '../Input/Input'
import Messages from './Messages'
import { useContext, useEffect, useState } from 'react'
import { getRoomInfo } from '../../utils/Rooms'
import messageContext from '../../utils/Contexts/messagesContext'
export interface IChatWindowProps {
  roomId: string
}

export default function ChatWindow(props: IChatWindowProps) {
  const [roomTitle, setRoomTitle] = useState<string>('')
  const users = useContext(messageContext).users
  useEffect(() => {
    const getRoomDetails = async () => {
      let { roomName } = await getRoomInfo(props.roomId)
      setRoomTitle(roomName)
    }
    getRoomDetails()
  }, [])
  return (
    <div className={styles['chat-window']}>
      <div className={styles['roomHeading']}>
        <h2 className={styles['roomTitle']}>{roomTitle}</h2>
        <h3 className={styles['participant']}>{users.length} participants</h3>
      </div>
      <Messages />
      <Input />
    </div>
  )
}
