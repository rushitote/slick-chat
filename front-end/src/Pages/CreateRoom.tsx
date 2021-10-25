import styles from './CreateRoom.module.css'
import Container from '../components/UI/Container'
import loggedInContext from '../utils/Contexts/loggedInContext'
import { useContext, useEffect, useRef } from 'react'
import Button from '../components/UI/Button'
import axios from 'axios'
import notificationContext from '../utils/Contexts/notificationContext'
import { withRouter } from 'react-router'
import generateRandomRoom from '../utils/isNewRoom'
import { useState } from 'react'
import BottomFormPopup from '../components/UI/ButtonFormPopup'
import Heading from '../components/UI/Heading'
import InputField from '../components/UI/InputField'
import Authenticated from '../components/Other/Authenticated'
export interface ICreateRoomProps {
  history: any
}

function CreateRoom(props: ICreateRoomProps) {
  const { isLoggedIn } = useContext(loggedInContext)
  const roomNameRef = useRef<HTMLInputElement>(null)
  const notifCtx = useContext(notificationContext)
  const [roomId, setRoomId] = useState('')
  const [errorShow, setErrorShow] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const getRoomId = async () => {
      const id = await generateRandomRoom()
      setRoomId(id)
    }
    if (isLoggedIn) getRoomId()
  }, [isLoggedIn])

  const createRoom = async (e: any) => {
    if (roomNameRef.current && roomNameRef.current.value.length !== 0) {
      const result = await axios.post(
        'http://localhost:3000/rooms/add',
        {
          roomId,
        },
        {
          withCredentials: true,
        }
      )
      if (result.status === 200) {
        console.log('Added user successfully')
        props.history.push(`/group/${roomId}`)
      } else {
        notifCtx.showNotification(
          'Something went wrong. Please try again later'
        )
      }
    } else {
      setErrorMessage("Name can't be empty")
      setErrorShow(true)
      console.log("name can't be empty")
    }
  }
  const randomizeHandler = async (e: any) => {
    const roomId = await generateRandomRoom()
    setRoomId(roomId)
  }
  return (
    <Authenticated>
      <Container className={styles['root']} type='grid'>
        <Heading text='Create Room' className={styles['title']} />
        <div className={styles['create']}>
          <InputField
            type='text'
            name='roomName'
            id='roomName'
            placeholder='Room Name'
            ref={roomNameRef}
          />
          <InputField
            type='text'
            name='roomId'
            id='roomId'
            value={roomId}
            disabled={true}
          />
          <BottomFormPopup show={errorShow} message={errorMessage}>
            <Button text='Randomize' onClick={randomizeHandler} color='blue' />
            <Button text='Create' onClick={createRoom} color='green' />
          </BottomFormPopup>
        </div>
        <div className={styles['info']}>
          <p>Keep the following things in mind when creating a room</p>
          <ul>
            <li>Room IDs are generated randomly</li>
            <li>Anyone with your Room ID can join your room</li>
            <li>Keep your room name memorable</li>
            <li>Changing your Room name later is not possible</li>
          </ul>
        </div>
      </Container>
    </Authenticated>
  )
}

export default withRouter(CreateRoom)
