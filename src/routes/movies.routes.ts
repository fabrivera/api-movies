// Libreries
import { Router } from 'express'
import multer from 'multer'
import storage from '../libs/multer'
import moviesCtrl from '../controllers/movies.controller'

const router = Router() // Starting Router

const { addMovie, getMovies } = moviesCtrl

router.route('/')
    .get(getMovies)
    .post(multer({storage}).single('image'), addMovie)

export default router