import express from 'express'
import cakeRoute from './cakeRoute'
import ingridientRoute from './ingridientRoute'
import flavorsRoute from './flavorsRoute'

const router = express.Router()

router.use('/api', cakeRoute)
router.use('/api', ingridientRoute)
router.use('/api', flavorsRoute)

export default router
