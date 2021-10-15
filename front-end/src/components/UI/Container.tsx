import styles from './Container.module.css'

export default function App(props: any) {
  return <div className={styles['container']}>{props.children}</div>
}
