import * as React from 'react'
import styles from './About.module.css'
import Heading from '../UI/Heading'

export interface IAppProps {
  title: string
}

export default function About(props: IAppProps) {
  return (
    <div className={styles['about']}>
      <Heading text={props.title} />
    </div>
  )
}
