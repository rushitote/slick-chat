import styles from './SpinningCircle.module.css'
export interface ISpinningCircleProps {}

export default function SpinningCircle(props: ISpinningCircleProps) {
  return <div className={styles['spinning-circle']}></div>
}
