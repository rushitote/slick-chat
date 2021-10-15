import { createContext, useState } from 'react'

interface loggedInContextInterface {
  isLoggedIn: boolean | undefined
  setIsLoggedIn: Function
}

const loggedInContext = createContext<loggedInContextInterface>({
  isLoggedIn: undefined,
  setIsLoggedIn: (val: boolean) => {},
})

const LoggedInProvider = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined)
  return (
    <loggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {props.children}
    </loggedInContext.Provider>
  )
}

export { LoggedInProvider }
export default loggedInContext
