import multer from 'multer'
import path from 'path'




module.exports = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    })
}