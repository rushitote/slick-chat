import styles from './ChatWindow.module.css'
import Input from '../Input/Input'
import Messages from './Messages'
export interface IChatWindowProps {}

export default function ChatWindow(props: IChatWindowProps) {
  return (
    <div className={styles['chat-window']}>
      <Messages />
      <Input />
    </div>
  )
}
