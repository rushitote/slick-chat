import styles from './CreateRoom.module.css'
import Container from '../components/UI/Container'
import { useEffect, useRef } from 'react'
import Button from '../components/UI/Button'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import BottomFormPopup from '../components/UI/ButtonFormPopup'
import Heading from '../components/UI/Heading'
import InputField from '../components/UI/InputField'
import { Link } from 'react-router-dom'
import { RoomCreateResponse } from '../Interfaces/Responses'
import { generateSlug } from 'random-word-slugs'
import toast from '../components/UI/Toast'
export interface ICreateRoomProps {}

export default function CreateRoom(props: ICreateRoomProps) {
  const roomNameRef = useRef<HTMLInputElement>(null)
  const [errorShow, setErrorShow] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState('')
  const history = useHistory()
  const generateRandomRoomName = (e: any) => {
    if (roomNameRef.current) {
      roomNameRef.current.value = generateSlug(3)
    }
  }

  const createRoom = async (e: any) => {
    if (roomNameRef.current && roomNameRef.current.value.length !== 0) {
      const result = await axios.post<any, RoomCreateResponse>(
        `${process.env.REACT_APP_HOST}/rooms/create`,
        {
          roomName: roomNameRef.current.value,
        },
        {
          withCredentials: true,
        }
      )
      if (result.status === 200) {
        console.log('Added user successfully')
        history.push(`/`)
        history.push(`/group/${result.data.roomId}`)
      } else {
        toast('Something went wrong. Please try again later')
      }
    } else {
      setErrorMessage("Name can't be empty")
      setErrorShow(true)
      console.log("name can't be empty")
    }
  }
  useEffect(() => {
    document.title = 'Slick Chat | Create Room'
  }, [])
  return (
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
          Already have a Room ID? You can join the Room by going <Link to='/join'>here</Link>
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
  )
}
