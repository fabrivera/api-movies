import multer from 'multer'
import { v4 as uuid } from 'uuid'
import path from 'path'

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, callback) => {
        callback(null, uuid() + path.extname(file.originalname))
    }
})

export default storage