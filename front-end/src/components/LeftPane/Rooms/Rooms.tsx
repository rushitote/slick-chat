import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Room } from '../../../Interfaces/Responses'
import { getUserRooms } from '../../../utils/Rooms'
import groupAvatar from '../../../images/groupAvatar.png'
import styles from './Rooms.module.css'

export default function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([])
  const getRooms = async () => {
    const rooms = await getUserRooms()
    setRooms(rooms)
  }
  useEffect(() => {
    getRooms()
  }, [])
  return (
    <div className={styles['left-pane']}>
      <h1 className={styles['user-list-heading']}>Rooms</h1>
      <div className={styles['user-list-users']}>
        {rooms.map((room) => (
          <li key={Math.random()}>
            <Link to={`/group/${room.roomId}`}>
              <div className={styles[`room-info`]}>
                <img src={groupAvatar} alt="" className={styles['room-image']} />
                <div className={styles[`room-name`]}>{room.roomName}</div>
              </div>
            </Link>
          </li>
        ))}
      </div>
    </div>
  )
}
