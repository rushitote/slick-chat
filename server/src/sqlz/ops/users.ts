import argon2 from 'argon2'
import Users, { UserInstance } from '../models/users'
import { nanoid } from 'nanoid'
import { ModelCtor } from 'sequelize/types'

export async function addUser(username, password) {
  try {
    const userExists = await Users.findOne({ where: { username: username } })
    if (userExists) {
      return { status: false, err: 'User already exists' }
    }

    const hashedPass = await argon2.hash(password)
    const userId = nanoid()

    await Users.create({
      userId: userId,
      username: username,
      password: hashedPass,
    })

    return { status: true }
  } catch (err) {
    console.log('logeerr', err)
    return { status: false, err: err }
  }
}

export async function checkUser(username, password, Users) {
  try {
    const user = await Users.findOne({ where: { username: username } })
    if (!user) {
      return { status: false, err: 'User does not exist' }
    }

    if (await argon2.verify(user.password, password)) {
      return { status: true, user: user }
    } else {
      return { status: false, err: 'Wrong password' }
    }
  } catch (err) {
    return { status: false, err: err }
  }
}

export async function findById(userId, Users: ModelCtor<UserInstance>) {
  try {
    const user = await Users.findOne({ where: { userId: userId } })
    return { status: true, user: user }
  } catch (err) {
    return { status: false, err: err }
  }
}

export async function getUserNameOfUser(userID: string) {
  return (await findById(userID, Users)).user.get('username')
}

export async function getUser(userId: string) {
  if (!userId) {
    return
  }
  const findRes = await findById(userId, Users)
  console.log(findRes)
  if (findRes.status && findRes.user) {
    return {
      userId: findRes.user.get('userId'),
      username: findRes.user.get('username'),
    }
  }
}
