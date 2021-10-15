import * as React from 'react'
import styles from './About.module.css'

export interface IAppProps {}

export default function App(props: IAppProps) {
  return (
    <div className={styles['about']}>
      <h1>React Chat App</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate
        suscipit accusantium velit explicabo, iste neque facilis, sapiente
        impedit placeat sint doloremque itaque molestias dolore. Asperiores
        reiciendis modi ad facilis suscipit?
      </p>
    </div>
  )
}
