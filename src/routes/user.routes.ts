// Libreries
import { Router } from 'express'
import userCtrl from '../controllers/user.controller'
const router = Router() // Starting Router

// User functions
const { getUsers, createUser } = userCtrl
// Movies in user list functions
const { addMovieToList, returnAllList } = userCtrl

router.route('/user')
    .get(getUsers)
    .post(createUser)

router.route('/userlist')
    .post(returnAllList)
    .put(addMovieToList)

export default router