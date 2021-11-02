import { useContext } from 'react'
import messageContext from '../../../utils/Contexts/messagesContext'
import styles from './UsersList.module.css'
import { Socket } from 'socket.io-client'
import { useEffect } from 'react'
export interface IUsersListProps {
  image: string
}

export default function UsersList(props: IUsersListProps) {
  const ctx = useContext(messageContext)
  return (
    <ul className={styles['user-list']}>
      <h1 className={styles['user-list-heading']}>Users</h1>
      <div className={styles['user-list-users']}>
        {ctx.users.map((user) => (
          <li key={Math.random()}>
            <img src={props.image} alt='' className={styles['user-image']} />
            {user.username}
          </li>
        ))}
      </div>
    </ul>
  )
}
