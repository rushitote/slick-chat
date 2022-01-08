import styles from './Technologies.module.css'
import Card from './Card'
import Heading from '../UI/Heading'
import tsLogo from '../../images/ts_logo.svg'
import socketLogo from '../../images/socket.svg'
import postgresLogo from '../../images/postgres.svg'
import reactLogo from '../../images/react.svg'
export interface ITechnologiesProps {
  id?: string
}

export default function Technologies(props: ITechnologiesProps) {
  return (
    <div className={styles['root']} id={props.id || ''}>
      <Heading className={styles['heading']} text='Built With' />
      <Card heading='Typescript' image={tsLogo}>
        <p>A modern type-safe language which transpiles to Javascript</p>
      </Card>
      <Card heading='React' image={reactLogo}>
        <p>A JavaScript library for building user interfaces</p>
      </Card>
      <Card heading='Web Sockets' image={socketLogo}>
        <p>Provides a two-way interactive communication session between the user's browser and a server</p>
      </Card>
      <Card heading='PostgreSQL' image={postgresLogo}>
        <p>A free and open-source relational database management system </p>
      </Card>
    </div>
  )
}
