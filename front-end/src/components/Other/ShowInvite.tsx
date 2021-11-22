import * as React from 'react'
import Container from '../UI/Container'
import styles from './ShowInvite.module.css'
import Card from '../UI/Card'
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
  const addToRoomButtonHandler = async () => {
    try {
      await addToRoom(props.roomId)
      await props.loadMessages()
      props.onJoin()
    } catch (e) {
      console.log(e)
      history.push('/')
      showNotification('Something went wrong. Please try again later')
    }
  }
  return (
    <Container type='flex' className={styles['container']}>
      <Card className={styles['card']}>
        <h1>Invite</h1>
        <h3>TO</h3>
        <h2 className={styles['roomName']}>{props.roomName}</h2>
        <h3 className={styles['text-consider']}>Things to consider</h3>
        <ul className={styles['list-about']}>
          <li>Your messages aren't encrypted</li>
          <li>Only the room admin can delete messages </li>
          <li>Leaving the room doesn't delete your messages</li>
          <li>You can leave and join the room any time you want</li>
          <li>However, the room admin can block you from the room</li>
        </ul>
        <div className={styles['btn-pair']}>
          <Button text='Yes, take me in!' onClick={addToRoomButtonHandler} />
          <Button text='No, thanks' onClick={() => {}} color='red' />
        </div>
      </Card>
    </Container>
  )
}
