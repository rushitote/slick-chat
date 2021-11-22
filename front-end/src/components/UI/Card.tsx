import * as React from 'react'
import styles from './Card.module.css'
export interface ICardProps {
  className: string
  children: any
}

export default function Card(props: ICardProps) {
  return <div className={`${props.className} ${styles['card']}`}>{props.children}</div>
}
