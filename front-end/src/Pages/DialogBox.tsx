import { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styles from './DialogBox.module.css'
import Button from '../components/UI/Button'
import { generateInviteLink } from '../utils/Rooms'
export interface Dialog {
  id: string
  name: string
}
export interface IDialogBoxProps {}
const DialogBox = (props: IDialogBoxProps) => {
  const params = useParams<Dialog>()
  const history = useHistory()
  const link = generateInviteLink(params.id)
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const copyInviteLink = () => {
    setIsClicked(true)
    navigator.clipboard.writeText(link)
  }
  const backButton = () => {
    history.push(`/group/${params.id}`)
  }
  return (
    <div className={styles['overlay']}>
      <div className={styles['inviteBox']}>
        <button className={styles['closing-button']} onClick={backButton}>
          X
        </button>
        <h1 className={styles['invite-heading']}>Invite Link</h1>
        <div className={styles['invite-desc']}>
          You are creating a invite link for
          <h4 className={styles['roomname']}>{params.name}</h4>
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
