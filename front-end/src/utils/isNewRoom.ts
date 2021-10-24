import axios from 'axios'
import User from '../Interfaces/UserResponse'

// generates a random ID for the room
// then checks if that room already exists
const generateRandomRoom = async () => {
  while (true) {
    const roomId = Math.random().toString().slice(2, 12)
    try {
      const response = await axios.get('http://localhost:3000/rooms/get', {
        params: {
          roomId,
        },
        withCredentials: true,
      })
      const users: User[] = (response.data as any).users as User[]
      console.log(users)
      if (users.length === 0) {
        return roomId
      } else {
        continue
      }
    } catch (e) {
      console.log(e)
      throw new Error("Can't generate room")
    }
  }
}

export default generateRandomRoom
