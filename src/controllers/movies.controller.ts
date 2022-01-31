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
        !req.body.category ||
        !req.body.sentence ) {
            res.status(400).json({msg: 'Please send user and password'})
    }
    
    const {name, description, category, sentence} = req.body

    let srcImg = ''
    if (!req.file || !req.file.path)  {
        res.status(400).json({msg: 'Image could not be upload'})
    } else {
        srcImg = req.file.path
    }

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

// Get all movies
moviesCtrl.getMovies = async (req, res): Promise<Response> => {
    const movies = Movie.findOne({})
    return res.status(200).send(movies)
}

export default moviesCtrl