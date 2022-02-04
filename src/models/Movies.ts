import { model, Schema, Document } from 'mongoose'

export interface IMovies extends Document {
    name: string
    description: string
    srcImg: string
    rate: number
    category: string
    sentence: string
}

const MovieSchema = new Schema({
    name: {
        type: String,
        unique: true,
        index: true
    },
    description: {
        type: String,
        index: true
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
        type: String,
        index: true
    }
})

export default model<IMovies>('Movie', MovieSchema)