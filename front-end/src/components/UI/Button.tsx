import * as React from 'react'
import styles from './Button.module.css'
export interface IButtonProps {
  text: string
  onClick: React.MouseEventHandler
  color?: 'blue' | 'green' | 'red'
}

export default function Button(props: IButtonProps) {
  return (
    <button
      type='submit'
      onClick={props.onClick}
      className={`${styles['btn']} ${styles['btn-' + (props.color ? props.color : 'green')]}`}
    >
      {props.text}
    </button>
  )
}
