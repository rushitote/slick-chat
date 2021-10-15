import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { LoggedInProvider } from './utils/Contexts/loggedInContext'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <LoggedInProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LoggedInProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
