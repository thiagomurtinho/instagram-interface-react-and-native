import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

import Post from '../models/Post'


module.exports = {
    async index(req, res) {
        const posts =  await Post.find().sort('-createdAt')

        return res.json(posts)
    },

    async store(req, res) {
        console.log(req.body)
        console.log(req.file)

        const { author, place, description, hashtags } = req.body
        const { filename: image } = req.file

        //Rename image
        const [name, ext] = image.split('.')
        const fileName = `${name}.jpg`

        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70 })
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName)
            )
        
        fs.unlinkSync(req.file.path)

        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: fileName,
        })

        req.io.emit('post', post)
        
        return res.json(post)
    }
}