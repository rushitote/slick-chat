import express from 'express'
const router = express.Router()
import * as passportConfig from './controllers/auth'
import * as roomConfig from './controllers/rooms'
import * as messagesConfig from './controllers/messages'

router.post('/login', passportConfig.login)
router.post('/logout', passportConfig.logout)
router.post('/create', passportConfig.create)
router.get('/test-auth', passportConfig.getTestAuth)

router.post('/rooms/create', roomConfig.createRoom)

router.post('/messages/post', messagesConfig.postMessage)
router.get('/messages/get', messagesConfig.getMessages)

export default router
