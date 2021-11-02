import Container from './Container'
import styles from './Error.module.css'
import { Link } from 'react-router-dom'
export interface IAppProps {
  title: String
  message: String
  recommend: String
  link: string
}

export default function ErrorPage(props: IAppProps) {
  return (
    <Container className={styles['root']} type='flex'>
      <h1>{props.title}</h1>
      <p>{props.message}</p>

      <p>
        {props.recommend} <Link to={props.link}>here</Link>
      </p>
    </Container>
  )
}
