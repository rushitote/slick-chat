import * as React from 'react'
import styles from './Button.module.css'
export interface IAppProps {
  text: String
  loginHandler: React.MouseEventHandler
}

export default function App(props: IAppProps) {
  return (
    <button
      type="submit"
      onClick={props.loginHandler}
      className={styles['btn']}
    >
      {props.text}
    </button>
  )
}
