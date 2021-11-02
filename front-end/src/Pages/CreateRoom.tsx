import styles from './CreateRoom.module.css'
import Container from '../components/UI/Container'
import { useContext, useRef } from 'react'
import Button from '../components/UI/Button'
import axios from 'axios'
import notificationContext from '../utils/Contexts/notificationContext'
import { withRouter } from 'react-router'
import { useState } from 'react'
import BottomFormPopup from '../components/UI/ButtonFormPopup'
import Heading from '../components/UI/Heading'
import InputField from '../components/UI/InputField'
import Authenticated from '../components/Other/Authenticated'
import { Link } from 'react-router-dom'
import { RoomCreateResponse } from '../Interfaces/Responses'
import { generateSlug } from 'random-word-slugs'
export interface ICreateRoomProps {
  history: any
}

function CreateRoom(props: ICreateRoomProps) {
  const roomNameRef = useRef<HTMLInputElement>(null)
  const notifCtx = useContext(notificationContext)
  const [errorShow, setErrorShow] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState('')

  const generateRandomRoomName = (e: any) => {
    if (roomNameRef.current) {
      roomNameRef.current.value = generateSlug(3)
    }
  }

  const createRoom = async (e: any) => {
    if (roomNameRef.current && roomNameRef.current.value.length !== 0) {
      const result = await axios.post<any, RoomCreateResponse>(
        'http://localhost:3000/rooms/create',
        {
          roomName: roomNameRef.current.value,
        },
        {
          withCredentials: true,
        }
      )
      if (result.status === 200) {
        console.log('Added user successfully')
        props.history.push(`/group/${result.data.roomId}`)
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
          <BottomFormPopup show={errorShow} message={errorMessage}>
            <Button
              text='Running out of ideas? Let us help you out!'
              onClick={generateRandomRoomName}
              color='blue'
            />
            <Button text='Create' onClick={createRoom} color='green' />
          </BottomFormPopup>
          <p>
            Already have a Room ID? You can join the Room by going{' '}
            <Link to='/join'>here</Link>
          </p>
        </div>
        <div className={styles['info']}>
          <p>Here are some things you might want to know</p>
          <ul>
            <li>Room IDs are generated randomly</li>
            <li>Anyone with your Room ID can join your room</li>
            <li>Changing your Room name later is not possible</li>
          </ul>
        </div>
      </Container>
    </Authenticated>
  )
}

export default withRouter(CreateRoom)
