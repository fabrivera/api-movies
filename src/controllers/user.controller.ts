import { Request, Response } from 'express'
import Users from '../models/Users'
import User from '../models/Users'

interface IUsersCtrl {
    [key: string]: (req: Request, res: Response) => {}
}

const usersCtrl: IUsersCtrl = {}

//Get all users
usersCtrl.getUsers = async (req, res): Promise<Response> => {
    const user = await Users.find({})
    return res.status(200).json(user)
}

// Create a new user
usersCtrl.createUser = async (req, res): Promise<Response> => {
    if (!req.body.username ||
        !req.body.email || 
        !req.body.password ||
        !req.body.firstname ||
        !req.body.lastname ) {
            res.status(400).json({msg: 'Please send user and password'})
    }
    
    const {username, email, password, firstname, lastname} = req.body

    const user = await User.find({email})
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

export default usersCtrl