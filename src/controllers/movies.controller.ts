import { Request, Response } from 'express'
import Movie, { IMovies } from '../models/Movies'
import cloudinary from '../libs/cloudinary'

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
    
    const {name, description, category, sentence, rate = 0} = req.body

    let url = ''
    if (!req.file || !req.file.path)  {
        res.status(400).json({msg: 'Image could not be upload'})
    } else {
        url = req.file.path
    }
    const srcImg = await cloudinary(url)

    const newMovie: IMovies = await new Movie({
        name,
        description,
        srcImg,
        category,
        sentence,
        rate
    })

    await newMovie.save()

    return res.status(201).json({msg: 'New movie added', movie: newMovie})
}

// Get all movies Paginated
moviesCtrl.getAllMovies = async (req, res): Promise<Response> => {
    const movies = await Movie.find({})
    return res.status(200).send(movies)
}

// Get all movies Paginated
moviesCtrl.getMoviesPaginated = async (req, res): Promise<Response> => {
    if (!req.query.page || !req.query.limit) {
        return res.status(400).json({msg: 'Page or limit are not define'})
    }
    
    const page = Number(req.query.page)
    const limit = Number(req.query.limit)

    console.log(page,limit);

    const movies = await Movie.find({})
        .select('name srcImg rate')
        .limit(limit)
        .skip(limit * page)
    return res.status(200).send(movies)
}

// Search a movie
moviesCtrl.search = async (req, res): Promise<Response> => {
    if (!req.body.search) {
        return res.status(400).json({msg: 'Not query send'})
    }
    const search = req.body.search
    const result = await Movie.find(
        { $text : { $search : search}},
        { score : {$meta : "textScore"}}
    ).sort({ score : { $meta : 'textScore'}})

    return res.status(200).send(result)
}

export default moviesCtrl