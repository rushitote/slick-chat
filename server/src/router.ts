import express from 'express'
const router = express.Router()
import * as passportConfig from './controllers/auth'
import * as roomConfig from './controllers/rooms'
import * as messagesConfig from './controllers/messages'
import * as mappingConfig from './controllers/userRoomMapping'

router.post('/login', passportConfig.login)
router.post('/logout', passportConfig.logout)
router.post('/create', passportConfig.create)
router.get('/test-auth', passportConfig.getTestAuth)

router.post('/rooms/create', roomConfig.createRoom)
router.get('/rooms/get', mappingConfig.getUsersOfRoom)
router.post('/rooms/add', mappingConfig.addUserRoomMapping)
router.post('/rooms/remove', mappingConfig.removeUserRoomMapping)

router.post('/messages/post', messagesConfig.postMessage)
router.get('/messages/get', messagesConfig.getMessages)

export default router
