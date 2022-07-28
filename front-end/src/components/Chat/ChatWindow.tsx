import styles from './ChatWindow.module.css'
import Input from '../Input/Input'
import Messages from './Messages'
import { useEffect, useState } from 'react'
import { getRoomInfo } from '../../utils/Rooms'
export interface IChatWindowProps {
  roomId: string
}

export default function ChatWindow(props: IChatWindowProps) {
  const [roomTitle, setRoomTitle] = useState<string>('')
  const [roomMemberCount, setRoomMemberCount] = useState<number>(0)

  useEffect(() => {
    const getRoomDetails = async () => {
      let { roomName, users } = await getRoomInfo(props.roomId)
      setRoomTitle(roomName)
      setRoomMemberCount(users.length)
    }
    getRoomDetails()
  }, [])
  return (
    <div className={styles['chat-window']}>
      <div className={styles['roomHeading']}>
        <h2 className={styles['roomTitle']}>{roomTitle}</h2>
      </div>
      <Messages />
      <Input />
    </div>
  )
}
