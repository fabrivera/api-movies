import { Request, Response } from 'express'
import Users from '../models/Users'
import User from '../models/Users'

interface IUserCtrl {
    [key: string]: (req: Request, res: Response) => {}
}

const userCtrl: IUserCtrl = {}

//Get all users
userCtrl.getUsers = async (req, res): Promise<Response> => {
    const user = await Users.find({})
    return res.status(200).json(user)
}

// Create a new user
userCtrl.createUser = async (req, res): Promise<Response> => {
    if (!req.body.username ||
        !req.body.email || 
        !req.body.password ||
        !req.body.firstname ||
        !req.body.lastname ) {
            res.status(400).json({msg: 'Please send user and password'})
    }
    
    const {username, email, password, firstname, lastname} = req.body

    const user = await User.findOne({email})
    if (user) {
        res.status(400).json({msg: 'User already exist'})
    }

    const newUser = new User({
        username,
        email,
        passwordHash: password,
        firstname,
        lastname
    })

    await newUser.save()

    return res.status(201).json({msg: 'User created'})
}

// Login

// Add a movie to my list
userCtrl.addMovieToList = async (req, res): Promise<Response> => {
    const { movieId } = req.body
    const _id = req.body.userId
    const user = await User.findOneAndUpdate({_id}, { "$push": { "movies": { "$each": [movieId] }}})

    if (!user) {
        return res.status(400).json({msg: 'Please login first'})
    }

    return res.status(200).json({msg: 'Movie added to list'})
}

// Remove a movie

// Return all movies from list
userCtrl.returnAllList = async (req, res): Promise<Response> => {
    const _id = req.body.userId
    const user = await User.findOne({_id})

    if (!user) {
        return res.status(400).json({msg: 'Please login first'})
    }

    return res.status(200).json({user: user.username, movies: user.movies})
}

// Search movies added

export default userCtrl