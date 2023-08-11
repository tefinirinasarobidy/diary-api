
const auth = require('../middleware/index.js')
const userController = require('../controllers/userController.js')
const eventController = require('../controllers/eventController.js')
const chatController = require('../controllers/chatController.js')
// router
const router = require('express').Router()

router.post('/auth/register', userController.register)
router.post('/auth/login', userController.login)
router.post('/event/create',auth, eventController.creatEvent)
router.get('/event/all',auth, eventController.allEvents)
router.post('/chat/send',auth, chatController.sendMessage)
router.get('/chat/conversation',auth, chatController.getConversation)

module.exports = router