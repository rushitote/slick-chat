import Container from '../components/UI/Container'
import styles from './JoinRoom.module.css'
import Heading from '../components/UI/Heading'
import Authenticated from '../components/Other/Authenticated'
import InputField from '../components/UI/InputField'
import Button from '../components/UI/Button'
import { Link } from 'react-router-dom'
import { useContext, useRef, useState } from 'react'
import { isValidRoom, roomExists, addToRoom } from '../utils/Rooms'
import BottomFormPopup from '../components/UI/ButtonFormPopup'
import notificationContext from '../utils/Contexts/notificationContext'
import { useHistory } from 'react-router'
export interface IJoinRoomProps {}

export default function JoinRoom(props: IJoinRoomProps) {
  const roomIdRef = useRef<HTMLInputElement>(null)
  const [errorShow, setErrorShow] = useState(false)
  const [errorMessage, setErrorMessage] = useState('initialState')
  const history = useHistory()
  const notifContext = useContext(notificationContext)
  const roomJoinHandler = async (e: any) => {
    if (roomIdRef.current) {
      const roomId = roomIdRef.current.value
      if (!isValidRoom(roomId)) {
        roomIdRef.current.classList.add(styles['invalid'])
        setErrorMessage('Invalid Room ID')
        setErrorShow(true)
      } else {
        roomIdRef.current.classList.remove(styles['invalid'])
        setErrorShow(false)
        if (!(await roomExists(roomId))) {
          notifContext.showNotification('This room does not exist')
        } else {
          try {
            addToRoom(roomId)
            history.push(`/redirecting`)
            history.push(`/group/${roomId}`)
          } catch (e: any) {
            notifContext.showNotification(e.message)
          }
        }
      }
    }
  }
  return (
    <Authenticated>
      <Container type='grid' className={styles['root']}>
        <Heading text='Join Room' className={styles['title']} />
        <div className={styles['pair']}>
          <InputField maxLength={7} className={styles['roomId']} placeholder='Room ID' ref={roomIdRef} />
          <BottomFormPopup show={errorShow} message={errorMessage}>
            <Button text='Join' onClick={roomJoinHandler} />
            <p>
              Don't have a Room ID? You can create one for yourself <Link to='/create'> here</Link>
            </p>
          </BottomFormPopup>
        </div>
      </Container>
    </Authenticated>
  )
}
