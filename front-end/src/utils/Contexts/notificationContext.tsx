import { createContext } from 'react'

export interface NotificationInterface {
  message: String
  visible: Boolean
}

interface notificationContextInterface {
  showNotification: Function
  hideNotification: Function
}

const notificationContext = createContext<notificationContextInterface>({
  showNotification: (message: String) => {},
  hideNotification: () => {},
})

export default notificationContext
