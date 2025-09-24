import { Router } from 'express'
import { streamChat } from '../controllers/chatController'

const router = Router()

router.post('/stream', streamChat)

export default router
