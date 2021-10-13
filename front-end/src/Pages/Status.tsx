import * as React from 'react'
import { useEffect } from 'react'
export interface IStatusProps {}

export default function Status(props: IStatusProps) {
  useEffect(() => {
    const data = {
      username: 'shashwat',
      password: 'password',
    }
    const response = fetch('http://localhost:3000/testAuth', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'include', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      // redirect: 'follow', // manual, *follow, error
      // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
      .then((resp) => resp.text())
      .then((d) => {
        console.log(d)
      })
      .catch((e) => {
        console.log(e)
      })
    console.log(response)
  }, [])
  return <div></div>
}
