import { Request, Response } from 'express'
import User, { IUser } from '../models/Users'
import jwt from 'jsonwebtoken'
import config from '../config/config'

interface IUserCtrl {
    [key: string]: (req: Request, res: Response) => {}
}
function createToken(user: IUser) {
    return jwt.sign({
        id: user.id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        movies: user.movies
    }, config.jwtSecret) 
}
const userCtrl: IUserCtrl = {}

//Get all users
userCtrl.getUsers = async (req, res): Promise<Response> => {
    const user = await User.find({})
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
userCtrl.signIn = async (req, res) => {
    if (!(req.body.email || req.body.username) || !req.body.password) {
        res.status(400).json({msg: 'Please send user and password'})
    }

    const {email, username} = req.body

    const user = await User.findOne({$or: [{email}, {username}]})

    if (user) {
        const isMatch = await user.comparePassword(req.body.password)
        if (isMatch) {
            const token: string = createToken(user)
            return res.status(200).json({msg: 'User login correct', token})
        }
        return res.status(401).json({msg: 'User or password was wrong'})
    }
    return res.status(400).json({msg: 'User does not exist'})
}

export default userCtrl