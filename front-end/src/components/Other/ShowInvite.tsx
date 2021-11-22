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
        <h2 className={styles['roomName']}>{props.roomName}</h2>
        <ul className={styles['list-about']}>
          <li>Your messages will be visible to everyone in the room</li>
          <li>You can leave the room as and when you wish</li>
          <li>People who join the room in the future will be able to read your past messages</li>
          <li>Your messages are not encrypted</li>
        </ul>
        <div className={styles['btn-pair']}>
          <Button text='Yes, take me in!' onClick={addToRoomButtonHandler} />
          <Button text='No, thanks' onClick={() => {}} color='red' />
        </div>
      </Card>
    </Container>
  )
}
