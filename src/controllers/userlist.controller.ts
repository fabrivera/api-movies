import { Request, Response } from 'express'
import User from '../models/Users'
import Movie from '../models/Movies'


interface IUserlistCtrl {
    [key: string]: (req: Request, res: Response) => {}
}

declare global {
    namespace Express {
        interface User {
            _id: string;
        }
    }
}

const userlistCtrl: IUserlistCtrl = {}

// Add a movie to my list
userlistCtrl.addMovieToList = async (req, res): Promise<Response> => {
    const { movieId } = req.body
    const _id = req.body.userId

    const movie = await Movie.findOne({_id: movieId})

    if (!movie) {
        return res.status(400).json({msg: 'Movie does not exist'})
    }

    const user = await User.findOneAndUpdate({_id}, { "$push": { "movies": { "$each": [movieId] }}})

    if (!user) {
        return res.status(400).json({msg: 'Please login first'})
    }

    return res.status(200).json({msg: 'Movie added to list'})
}

// Remove a movie
userlistCtrl.userlistMovieRemove = async (req, res): Promise<Response> => {
    if (!req.user) {
        return res.status(400).json({msg: 'Please login first'})
    }

    const user = await User.findOne({_id: req.user._id})
    
    if (!user) {
        return res.status(400).json({msg: 'Please login first'})
    }
    if (!req.body.movieId) {
        return res.status(400).json({msg: 'You have to send te movie ID'})
    }

    const movieList: [] = user?.movies

    console.log(req.body.movieId)
    const newMovieList = movieList.filter(movie => {
        return movie != req.body.movieId
    })

    await User.findOneAndUpdate({_id: req.user._id}, {movies: newMovieList})


    return res.status(200).json({msg: 'Movie removed', newList: newMovieList})
}


// Return all movies from list
userlistCtrl.returnAllList = async (req, res): Promise<Response> => {
    if (!req.user) {
        return res.status(400).json({msg: 'Please login first'})
    }

    const user = await User.findOne({_id: req.user._id})

    if (!user) {
        return res.status(400).json({msg: 'Please login first'})
    }

    return res.status(200).json({user: user.username, movies: user.movies})
}

// Search movies added

export default userlistCtrl