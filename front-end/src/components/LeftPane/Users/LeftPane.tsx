import { useContext } from 'react'
import { removeFromRoom } from '../../../utils/Rooms'
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
  const history = useHistory()
  const leaveRoom = async () => {
    console.log('leaving')
    const userLeft = await removeFromRoom(props.roomId)
    if (userLeft) {
      history.push('/')
    }
  }
  return (
    <div className={styles['left-pane']}>
      <h1 className={styles['user-list-heading']}>Users</h1>
      <div className={styles['user-list-users']}>
        {ctx.users.map((user) => (
          <li key={Math.random()}>
            <img src={props.image} alt='' className={styles['user-image']} />
            {user.username}
            <div className={styles[`user-${user.online ? 'online' : 'offline'}`]}></div>
          </li>
        ))}
      </div>
      <div className={styles['exit-group']}>
        <Button text='Leave Room' onClick={leaveRoom} color='red' />
      </div>
    </div>
  )
}
