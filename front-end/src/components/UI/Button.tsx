import * as React from 'react'
import styles from './Button.module.css'
export interface IAppProps {
  text: String
  onClick: React.MouseEventHandler
}

export default function App(props: IAppProps) {
  return (
    <button type="submit" onClick={props.onClick} className={styles['btn']}>
      {props.text}
    </button>
  )
}
