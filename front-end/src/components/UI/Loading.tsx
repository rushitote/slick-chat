import * as React from 'react'
import Container from './Container'
import styles from './Loading.module.css'
import SpinningCircle from './SpinningCircle'
export interface ILoadingProps {}

export default function Loading(props: ILoadingProps) {
  return (
    <Container type='flex' className={styles['loading-container']}>
      <SpinningCircle />
    </Container>
  )
}
