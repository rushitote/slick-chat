import { useContext, useEffect, useState } from 'react'
import { removeFromRoom, getRoomInfo } from '../../../utils/Rooms'
import { useHistory } from 'react-router'
import messageContext from '../../../utils/Contexts/messagesContext'
import Button from '../../UI/Button'
import styles from './LeftPane.module.css'
export interface ILeftPaneProps {
  image: string
  roomId: string
}

export default function LeftPane(props: ILeftPaneProps) {
  const ctx = useContext(messageContext)
  const currentUser = localStorage.getItem('username')
  const history = useHistory()
  const leaveRoom = async () => {
    const userLeft = await removeFromRoom(props.roomId)
    if (userLeft) {
      history.push('/')
    }
  }
  useEffect(() => {
    const getRoomDetails = async () => {
      let { roomOwnerUsername } = await getRoomInfo(props.roomId)
      setRoomOwnerUsername(roomOwnerUsername)
    }
    getRoomDetails()
  }, [props.roomId])
  const [roomOwnerUsername, setRoomOwnerUsername] = useState<string>('')
  return (
    <div className={styles['left-pane']}>
      <h1 className={styles['user-list-heading']}>Users</h1>
      <div className={styles['user-list-users']}>
        <li>
          <img src={props.image} alt='' className={styles['user-image']} />
          {roomOwnerUsername} 👑
        </li>
        {ctx.users
          .filter((user) => user.username !== roomOwnerUsername)
          .map((user) => (
            <li key={Math.random()}>
              <img src={props.image} alt='' className={styles['user-image']} />
              {user.username}
            </li>
          ))}
      </div>
      {currentUser !== roomOwnerUsername && (
        <div className={styles['exit-group']}>
          <Button text='Leave Room' onClick={leaveRoom} color='red' />
        </div>
      )}
    </div>
  )
}
