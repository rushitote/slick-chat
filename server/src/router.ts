import express from 'express'
const router = express.Router()
import * as passportConfig from './controllers/auth'
import * as roomConfig from './controllers/rooms'
import * as messagesConfig from './controllers/messages'
import * as mappingConfig from './controllers/userRoomMapping'
import { checkIfAuthenticated } from './helpers'
import { getUserDetails } from './controllers/users'

router.post('/login', passportConfig.login)
router.post('/logout', passportConfig.logout)
router.post('/create', passportConfig.create)
router.get('/authenticated', passportConfig.getIsAuthenticated)

router.get('/users/info', getUserDetails) // leaving this publicly available

router.use('/rooms/:url', function(req, res, next) {
  if (checkIfAuthenticated(req, res)) next()
})

router.post('/rooms/create', roomConfig.createRoom)
router.get('/rooms/info', roomConfig.getRoomInfo)
router.post('/rooms/add', mappingConfig.addUserRoomMapping)
router.post('/rooms/remove', mappingConfig.removeUserRoomMapping)

router.use('/messages/:url', function(req, res, next) {
  if (checkIfAuthenticated(req, res)) next()
})

router.post('/messages/post', messagesConfig.postMessage)
router.get('/messages/get', messagesConfig.getMessages)

export default router
