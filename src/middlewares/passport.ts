import {Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import config from '../config/config'
import User from '../models/Users'

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
}

export default new Strategy(opts, async (payload, done) => {
    const user = await User.findById(payload.id)
    if (user) {
        return done(null, user)
    }
    return done(null, false)
})