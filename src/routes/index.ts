import { Router } from 'express'
import passport from 'passport'
import usersRouter from './user.routes'
import userlistRouter from './userlist.routes'
const router = Router()


// Routes
router.use('/user', usersRouter)
router.use('/userlist',passport.authenticate('jwt', {session: false}), userlistRouter)

export default router