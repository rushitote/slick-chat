import styles from './Card.module.css'
export interface ICardProps {
  image: any
  heading: string
  children: any
}

export default function Card(props: ICardProps) {
  return (
    <div className={styles['card']}>
      <img src={props.image} alt={props.heading} />
      <h1>{props.heading}</h1>
      {props.children}
    </div>
  )
}
