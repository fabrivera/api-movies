// Libreries
import { Router } from 'express'
import multer from 'multer'
import storage from '../libs/multer'
import moviesCtrl from '../controllers/movies.controller'

const router = Router() // Starting Router

const { addMovie, search, getMoviesPaginated } = moviesCtrl

router.route('/')
    .get(getMoviesPaginated)
    .post(multer({storage}).single('image'), addMovie)
    .put(search)

export default router