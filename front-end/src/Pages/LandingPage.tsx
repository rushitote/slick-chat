import styles from './LandingPage.module.css'
import greenishArt from '../images/greenishArt.svg'
import Card from '../components/Home/Card'
export interface ILandingPage {}

export default function LandingPage(props: ILandingPage) {
  return (
    <div className={styles['landing-window']}>
      <div className={styles['heading']}>
        <h2>Slick Chat</h2>
      </div>
      <div className={styles['description']}>
        <Card heading='' image={greenishArt}>
          <p>Welcome to Slick</p>
        </Card>
        <div>Click on the rooms on your left, to start chatting.</div>
      </div>
    </div>
  )
}
