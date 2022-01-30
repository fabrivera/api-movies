import { Request, Response } from 'express'
import Movie, { IMovies } from '../models/Movies'

interface IMoviesCtrl {
    [key: string]: (req: Request, res: Response) => {}
}

const moviesCtrl: IMoviesCtrl = {}

// create new movie
moviesCtrl.addMovie = async (req, res): Promise<Response> => {
    if (!req.body.name ||
        !req.body.description || 
        !req.body.srcImg ||
        !req.body.category ||
        !req.body.sentence ) {
            res.status(400).json({msg: 'Please send user and password'})
    }
    
    const {name, description, srcImg, category, sentence} = req.body

    const newMovie: IMovies = new Movie({
        name,
        description,
        srcImg,
        category,
        sentence
    })

    await newMovie.save()

    return res.status(201).json({msg: 'New movie added', movie: newMovie})
}