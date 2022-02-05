import multer from 'multer'
import path from 'path'
import cloudinary from 'cloudinary'

export interface IMulter {
    single: string
}

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, callback) => {
        cloudinary.v2.config({ 
            cloud_name: 'des1wmoy4', 
            api_key: '736815393194356', 
            api_secret: 'XdkZenXHGfoEBc_jiUtsWYWZKbU' 
        });
        cloudinary.v2.uploader.upload(path.extname(file.originalname), result => {
            if (result) {
                const imgUrl = result.url
                callback(null, imgUrl)
            }
            callback(null, 'null')
        })
    }
})

export default storage