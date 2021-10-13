import { useContext } from 'react'
import messageContext from '../../../utils/messagesContext'
import styles from './UsersList.module.css'
import { Socket } from 'socket.io-client'
import { useEffect } from 'react'
export interface IUsersListProps {
  image: string
  socket: Socket
  groupId: string
}

export default function UsersList(props: IUsersListProps) {
  useEffect(() => {
    props.socket.emit(
      'joinRoom',
      JSON.stringify({
        roomId: props.groupId,
      })
    )
  })
  const ctx = useContext(messageContext)
  useEffect(() => {
    props.socket.on('newMessage', (data) => {
      console.log(data)
    })
  }, [props.socket])
  return (
    <ul className={styles['user-list']}>
      <h1 className={styles['user-list-heading']}>Users</h1>
      <div className={styles['user-list-users']}>
        {ctx.users.map((user) => (
          <li key={Math.random()}>
            <img src={props.image} alt="" className={styles['user-image']} />
            {user}
          </li>
        ))}
      </div>
    </ul>
  )
}
