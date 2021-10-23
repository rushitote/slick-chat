import styles from './CreateRoom.module.css'
import Container from '../components/UI/Container'
import loggedInContext from '../utils/Contexts/loggedInContext'
import { useContext, useRef } from 'react'
import ErrorPage from '../components/UI/Error'
import Button from '../components/UI/Button'
import isValidRoom from '../utils/isValidRoom'
export interface ICreateRoomProps {}

export default function CreateRoom(props: ICreateRoomProps) {
  const { isLoggedIn } = useContext(loggedInContext)
  const roomIdRef = useRef<HTMLInputElement>(null)

  const generateRandomRoom = (e: any) => {
    const roomId = Math.random().toString().slice(2, 12) // 0.1453144xx. Index 2 starts at 0.1
    if (roomIdRef.current) {
      roomIdRef.current.value = roomId
    }
  }

  const createRoom = (e: any) => {
    if (roomIdRef.current) {
      if (isValidRoom(roomIdRef.current.value)) {
      }
    }
  }
  if (isLoggedIn === undefined) {
    return null
  } else if (isLoggedIn) {
    return (
      <Container className={styles['root']} type="grid">
        <h1 className={styles['title']}>Create Room</h1>
        <div className={styles['create']}>
          <input
            type="text"
            name="roomId"
            id="roomId"
            maxLength={10}
            ref={roomIdRef}
          />
          <Button text="Randomize" onClick={generateRandomRoom} color="blue" />
          <Button text="Create" onClick={createRoom} color="green" />
        </div>
        <div className={styles['info']}>
          <p>Keep the following things in mind when creating a room</p>
          <ul>
            <li>Room IDs must consist of numbers only</li>
            <li>Room IDs must be unique</li>
            <li>Room IDs must be of length 10</li>
            <li>Users with your Room ID can join your Room.</li>
          </ul>
        </div>
      </Container>
    )
  } else {
    return (
      <ErrorPage
        title="Not logged in"
        message="You need to login to create rooms"
        recommend="You can login by going"
        link="/login"
      />
    )
  }
}
