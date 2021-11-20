import { useContext } from 'react'
import messageContext from '../../../utils/Contexts/messagesContext'
import Button from '../../UI/Button'
import styles from './LeftPane.module.css'
export interface ILeftPaneProps {
  image: string
}

export default function LeftPane(props: ILeftPaneProps) {
  const ctx = useContext(messageContext)
  const leaveRoom = () => {
    console.log('leaving')
  }
  return (
    <div className={styles['left-pane']}>
      <h1 className={styles['user-list-heading']}>Users</h1>
      <div className={styles['user-list-users']}>
        {ctx.users.map((user) => (
          <li key={Math.random()}>
            <img src={props.image} alt='' className={styles['user-image']} />
            {user.username}
          </li>
        ))}
      </div>
      <div className={styles['exit-group']}>
        <Button text='Leave Room' onClick={leaveRoom} color='red' />
      </div>
    </div>
  )
}
