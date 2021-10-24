import styles from './CreateRoom.module.css'
import Container from '../components/UI/Container'
import loggedInContext from '../utils/Contexts/loggedInContext'
import { useContext, useEffect, useRef } from 'react'
import ErrorPage from '../components/UI/Error'
import Button from '../components/UI/Button'
import axios from 'axios'
import notificationContext from '../utils/Contexts/notificationContext'
import { withRouter } from 'react-router'
import generateRandomRoom from '../utils/isNewRoom'
import { useState } from 'react'
export interface ICreateRoomProps {
  history: any
}

function CreateRoom(props: ICreateRoomProps) {
  const { isLoggedIn } = useContext(loggedInContext)
  const roomNameRef = useRef<HTMLInputElement>(null)
  const notifCtx = useContext(notificationContext)
  const [roomId, setRoomId] = useState('')

  useEffect(() => {
    const getRoomId = async () => {
      const id = await generateRandomRoom()
      setRoomId(id)
    }
    getRoomId()
  }, [])

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
      console.log("name can't be empty")
    }
  }
  const randomizeHandler = async (e: any) => {
    const roomId = await generateRandomRoom()
    setRoomId(roomId)
  }
  if (isLoggedIn === undefined) {
    return null
  } else if (isLoggedIn) {
    return (
      <Container className={styles['root']} type='grid'>
        <h1 className={styles['title']}>Create Room</h1>
        <div className={styles['create']}>
          <input
            type='text'
            name='roomName'
            id='roomName'
            placeholder='Room Name'
            ref={roomNameRef}
          />
          <input
            type='text'
            name='roomId'
            id='roomId'
            maxLength={10}
            value={roomId}
            disabled
          />

          <Button text='Randomize' onClick={randomizeHandler} color='blue' />
          <Button text='Create' onClick={createRoom} color='green' />
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
    )
  } else {
    return (
      <ErrorPage
        title='Not logged in'
        message='You need to login to create rooms'
        recommend='You can login by going'
        link='/login'
      />
    )
  }
}

export default withRouter(CreateRoom)
