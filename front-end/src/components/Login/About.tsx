import * as React from 'react'
import styles from './About.module.css'

export interface IAppProps {
  title: String
}

export default function App(props: IAppProps) {
  return (
    <div className={styles['about']}>
      <h1>{props.title}</h1>
    </div>
  )
}
