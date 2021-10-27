import Container from '../components/UI/Container'
import styles from './JoinRoom.module.css'
import Heading from '../components/UI/Heading'
import Authenticated from '../components/Other/Authenticated'
import InputField from '../components/UI/InputField'
import Button from '../components/UI/Button'
import { Link } from 'react-router-dom'
export interface IJoinRoomProps {}

export default function JoinRoom(props: IJoinRoomProps) {
  return (
    <Authenticated>
      <Container type='grid' className={styles['root']}>
        <Heading text='Join Room' className={styles['title']} />
        <div className={styles['pair']}>
          <InputField
            maxLength={10}
            className={styles['roomId']}
            placeholder='Room ID'
          />
          <Button text='Join' onClick={() => {}} />
          <p>
            Don't have a Room ID? You can create one for yourself{' '}
            <Link to='/create'> here</Link>
          </p>
        </div>
      </Container>
    </Authenticated>
  )
}
