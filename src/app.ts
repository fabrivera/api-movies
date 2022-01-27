// Libreries
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
// Routes Libreries
import movesRouter from './routes/movies.routes';
;


const app = express() // Starting express

// Settings
app.set('port', process.env.PORT || "4000")

// Middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Routes


export default app