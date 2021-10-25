import styles from './Heading.module.css'
export interface IHeadingProps {
  text: string
  className?: string
}

export default function Heading(props: IHeadingProps) {
  return (
    <h1 className={`${props.className || ''} ${styles['heading']}`}>
      {props.text}
    </h1>
  )
}
