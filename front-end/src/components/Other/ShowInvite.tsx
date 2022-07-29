import styles from './ShowInvite.module.css'
import Heading from '../UI/Heading'
import Button from '../UI/Button'
import { addToRoom } from '../../utils/Rooms'
import { useHistory } from 'react-router'
import toast from '../UI/Toast'
import { useContext } from 'react'
import socketContext from '../../utils/Contexts/socketContext'
export interface IShowInviteProps {
  loadMessages: Function
  onJoin: Function
}

export default function ShowInvite(props: IShowInviteProps) {
  const history = useHistory()
  const { roomName, roomId } = useContext(socketContext)
  const addTomRoomClickHandler = async () => {
    if (!roomId) {
      return
    }
    try {
      const { username, userId } = await addToRoom(roomId)
      await props.loadMessages()
      props.onJoin(username, userId)
      toast(`🦄 You've joined ${roomName}`)
    } catch (e) {
      console.log(e)
      history.push('/')
      toast('Something went wrong. Please try again later')
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
          <div className={styles['room-name']}>{roomName}</div>
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
