// Libreries
import { Router } from 'express'
import userCtrl from '../controllers/user.controller'
const router = Router() // Starting Router

// User functions
const { getUsers, createUser, signIn } = userCtrl

router.route('/')
    .get(getUsers)
    .post(createUser)

router.route('/login')
    .post(signIn)

export default router