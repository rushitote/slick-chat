import { useContext } from 'react'
import { removeFromRoom } from '../../../utils/Rooms'
import { useHistory } from 'react-router'
import messageContext from '../../../utils/Contexts/messagesContext'
import Button from '../../UI/Button'
import styles from './LeftPane.module.css'
import socketContext from '../../../utils/Contexts/socketContext'
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
  const createInvite = () => {
    navigator.clipboard.writeText(`${process.env.REACT_APP_HOST}/group/${props.roomId}`)
  }
  const { roomOwner } = useContext(socketContext)
  const roomOwnerStatus = ctx?.users?.filter((user) => user.userId === roomOwner?.userId)[0]?.online
  return (
    <div className={styles['left-pane']}>
      <h1 className={styles['user-list-heading']}>Users</h1>
      <div className={styles['user-list-users']}>
        <li>
          <img src={props.image} alt='' className={styles['user-image']} />
          {roomOwner?.username} 👑
          <div className={styles[`user-${roomOwnerStatus ? 'online' : 'offline'}`]}></div>
        </li>
        {ctx.users
          .filter((user) => user.username !== roomOwner?.username)
          .map((user) => (
            <li key={Math.random()}>
              <img src={props.image} alt='' className={styles['user-image']} />
              {user.username}
              <div className={styles[`user-${user.online ? 'online' : 'offline'}`]}></div>
            </li>
          ))}
      </div>
      {currentUser !== roomOwner?.username ? (
        <div className={styles['exit-group']}>
          <Button text='Leave Room' onClick={leaveRoom} color='red' />
        </div>
      ) : (
        <div className={styles['exit-group']}>
          <Button text='Create Invite' onClick={createInvite} color='blue' />
        </div>
      )}
    </div>
  )
}
