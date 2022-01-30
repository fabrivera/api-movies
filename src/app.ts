// Libreries
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import passport from 'passport'
import passportMiddleware from './middlewares/passport'
// Routes Libreries
import router from './routes'


const app = express() // Starting express

// Settings
app.set('port', process.env.PORT || "4000")

// Middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(passport.initialize())
passport.use(passportMiddleware)

// Go routes
app.use('/api', router)


export default app