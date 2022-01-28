// Libreries
import { Router } from 'express'
import usersCtrl from '../controllers/user.controller'
const router = Router() // Starting Router


const { getUsers, createUser } = usersCtrl

router.route('/')
    .get(getUsers)
    .post(createUser)

export default router