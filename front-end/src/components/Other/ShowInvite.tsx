import styles from './ShowInvite.module.css'
import Heading from '../UI/Heading'
import Button from '../UI/Button'
import { addToRoom } from '../../utils/Rooms'
import { useContext } from 'react'
import { useHistory } from 'react-router'
import notificationContext from '../../utils/Contexts/notificationContext'
export interface IShowInviteProps {
  roomName: string
  roomId: string
  loadMessages: Function
  onJoin: Function
}

export default function ShowInvite(props: IShowInviteProps) {
  const { showNotification } = useContext(notificationContext)
  const history = useHistory()
  const addTomRoomClickHandler = async () => {
    try {
      const { username, userId } = await addToRoom(props.roomId)
      await props.loadMessages()
      props.onJoin(username, userId)
    } catch (e) {
      console.log(e)
      history.push('/')
      showNotification('Something went wrong. Please try again later')
    }
  }
  const denyRoomJoinClickHandler = () => {
    history.push('/')
  }
  return (
    <div className={styles['root']}>
      <div className={styles['container']}>
        <div className={styles['about']}>
          <Heading text='Invite to' className={styles['heading-text']} />
          <div className={styles['room-name']}>{props.roomName}</div>
        </div>
        <div className={styles['separator']}></div>

        <div className={styles['right']}>
          <h2 className={styles['lucky-text']}>Your friends are waiting!</h2>
          <div className={styles['btn-pair']}>
            <Button text='Yes, take me in!' onClick={addTomRoomClickHandler} />
            <Button text='No, thanks' onClick={denyRoomJoinClickHandler} color='red' />
          </div>
        </div>
      </div>
    </div>
  )
}
