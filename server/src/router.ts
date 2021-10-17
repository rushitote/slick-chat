import express from 'express'
const router = express.Router()
import * as passportConfig from './controllers/auth'
import * as roomConfig from './controllers/rooms'
import * as messagesConfig from './controllers/messages'
import * as mappingConfig from './controllers/userRoomMapping'
import { checkIfAuthenticated } from './helpers'

router.post('/login', passportConfig.login)
router.post('/logout', passportConfig.logout)
router.post('/create', passportConfig.create)
router.get('/test-auth', passportConfig.getTestAuth)

router.use('/rooms/:url', function(req, res, next) {
  if (checkIfAuthenticated(req, res)) next()
})

router.post('/rooms/create', roomConfig.createRoom)
router.post('/rooms/get', mappingConfig.getUsersOfRoom)
router.post('/rooms/add', mappingConfig.addUserRoomMapping)
router.post('/rooms/remove', mappingConfig.removeUserRoomMapping)

router.use('/messages/:url', function(req, res, next) {
  if (checkIfAuthenticated(req, res)) next()
})

router.post('/messages/post', messagesConfig.postMessage)
router.post('/messages/get', messagesConfig.getMessages)

export default router
