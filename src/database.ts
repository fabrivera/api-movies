// Libreries
import mongoose from 'mongoose'
import config from './config/config'

// Database configuration
mongoose.connect(config.DB.URI)
const connection = mongoose.connection

export default connection