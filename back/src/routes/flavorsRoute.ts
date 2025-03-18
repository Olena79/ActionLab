import express from 'express'
import { getFlavors } from '../controllers/flavorsController'
import { validateFlavorsRequest } from '../validators/floverValidator'

const router = express.Router()

router.get('/flavors', validateFlavorsRequest, getFlavors)

export default router
