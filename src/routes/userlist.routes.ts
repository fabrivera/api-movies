// Libreries
import { Router } from 'express'
import userlistCtrl from '../controllers/userlist.controller'

const router = Router() // Starting Router

const {addMovieToList, removeMovie, returnAllList} = userlistCtrl

router.route('/')
    .get(returnAllList)
    .delete(removeMovie)

export default router