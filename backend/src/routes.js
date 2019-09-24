import express from 'express'
import multer from 'multer'

import uploadConfig from './config/uploadConfig'
import PostController from './controllers/PostController'
import LikeController from './controllers/LikeController'

const routes = new express.Router()
const upload = multer(uploadConfig)

// routes.get('/', (req, res) => {
//     return res.send(`Hello ${req.query.name}`)
// })


routes.get('/posts', PostController.index)
routes.post('/posts', upload.single('image'), PostController.store)

routes.post('/posts/:id/like', LikeController.store)

module.exports = routes