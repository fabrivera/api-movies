import { model, Schema, Document } from 'mongoose'

export interface IMovies extends Document {
    name: string
    description: string
    srcImg: string
    rate: number
    category: string
    sentence: string
}

const moviesSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    description: {
        type: String
    },
    srcImg: {
        type: String,
        lowercase: true
    },
    rate: {
        type: Number
    },
    category: {
        type: String
    },
    sentence: {
        type: String
    }
})

export default model<IMovies>('Movies', moviesSchema)