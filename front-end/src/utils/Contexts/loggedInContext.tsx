import { createContext } from 'react'

interface loggedInContextInterface {
  isLoggedIn: boolean
  updateLogIn: Function
}

const loggedInContext = createContext<loggedInContextInterface>({
  isLoggedIn: false,
  updateLogIn: (val: boolean) => {},
})

export default loggedInContext
