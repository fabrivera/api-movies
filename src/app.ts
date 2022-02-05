// Libreries
import express from 'express'
import path from 'path'
import morgan from 'morgan'
import cors from 'cors'
import passport from 'passport'
import passportMiddleware from './middlewares/passport'
// Routes Libreries
import router from './routes'


const app = express() // Starting express

// Settings
const _app_folder = 'dist/desafio2';
app.set('port', process.env.PORT || "4000")
// ---- SERVE STATIC FILES ---- //
app.get('*.*', express.static(_app_folder));

// Middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(passport.initialize())
passport.use(passportMiddleware)

// Go routes
app.all('/', function (req, res) {
    res.status(200).sendFile(`/`, {root: _app_folder});
});
app.use('/api', router)

// Public files folder
app.use('/uploads', express.static(path.resolve('uploads')))


export default app