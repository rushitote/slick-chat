import axios from "axios"

const login = async (usernameRef :any,passwordRef:any) => {
    const jsonResponse=JSON.stringify({
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
      })
    const response = await axios.post(`${process.env.REACT_APP_HOST}/login`, jsonResponse,{
        withCredentials:true,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log(response)
    return response
  }
const logout = async () => {
    try {
      let res = await axios.post(`${process.env.REACT_APP_HOST}/logout`, {
        withCredentials: true,
      })
      if (res.status === 200) {
        localStorage.removeItem('username')
        document.cookie = 'connect.sid =; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        return true
      }
    } catch (e) {
      console.log('Error while logging out')
      console.log(e)
    }
  }

export {logout,login}