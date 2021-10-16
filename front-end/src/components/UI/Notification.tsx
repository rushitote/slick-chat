import { forwardRef, Ref, useContext } from 'react'
import styles from './Notification.module.css'
import './Notification.css'
export interface INotificationProps {
  hideNotification: Function
}

const Notification = forwardRef(
  (props: INotificationProps, ref: Ref<HTMLDivElement>) => {
    return (
      <div className={styles['prompt']}>
        <div className={styles['prompt-box']} ref={ref}>
          <div></div>
          <div
            className={styles['prompt-close']}
            onClick={() => props.hideNotification()}
          >
            Dismiss
          </div>
        </div>
      </div>
    )
  }
)

export default Notification
