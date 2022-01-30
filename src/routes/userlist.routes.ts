// Libreries
import { Router } from 'express'
import userlistCtrl from '../controllers/userlist.controller'

const router = Router() // Starting Router

const {addMovieToList, userlistMovieRemove, returnAllList} = userlistCtrl

router.route('/')
    .get(returnAllList)
    .post(addMovieToList)
    .delete(userlistMovieRemove)

export default router