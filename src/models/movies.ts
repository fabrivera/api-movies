import { model, Schema, Document } from 'mongoose'
const mongoosePaginate = require('mongoose-paginate-v2')

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

MovieSchema.plugin(mongoosePaginate)

export default model<IMovies>('Movie', MovieSchema)