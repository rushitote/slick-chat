import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './DialogBox.module.css'
import Button from '../components/UI/Button'
import { generateInviteLink } from '../utils/Rooms'
import socketContext from '../utils/Contexts/socketContext'
export interface Dialog {
  id: string
  name: string
}
export interface IDialogBoxProps {
  hideInvite: () => void
}
const DialogBox = ({ hideInvite }: IDialogBoxProps) => {
  const params = useParams<Dialog>()
  const link = generateInviteLink(params.id)
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const { roomName } = useContext(socketContext)
  const copyInviteLink = () => {
    setIsClicked(true)
    navigator.clipboard.writeText(link)
  }
  return (
    <div className={styles['overlay']}>
      <div className={styles['inviteBox']}>
        <button className={styles['closing-button']} onClick={hideInvite}>
          X
        </button>
        <h1 className={styles['invite-heading']}>Invite Link</h1>
        <div className={styles['invite-desc']}>
          You are creating a invite link for
          <h4 className={styles['roomname']}>{roomName}</h4>
        </div>
        <span className={styles['invite-link']}>
          <div className={styles['link-box']}>{link}</div>
          <Button text={isClicked ? 'Copied' : 'Copy Link'} onClick={copyInviteLink} />
        </span>
      </div>
    </div>
  )
}
export default DialogBox
