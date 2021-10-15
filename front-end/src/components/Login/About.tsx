import * as React from 'react'
import styles from './About.module.css'

export interface IAppProps {}

export default function App(props: IAppProps) {
  return (
    <div className={styles['about']}>
      <h1>Login</h1>
      <p>
        Logging in to your account ensures that your private chats are only for
        you to see
      </p>
    </div>
  )
}
