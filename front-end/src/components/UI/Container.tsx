import styles from './Container.module.css'

export interface IContainerProps {
  children: any
  className: string
  type: 'grid' | 'flex'
}
export default function Container(props: IContainerProps) {
  return (
    <div
      className={`${props.className} ${styles[props.type + '-container']} ${
        styles['container']
      }`}
    >
      {props.children}
    </div>
  )
}
