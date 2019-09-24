// Global imports
import express from 'express'  //routes, params , requests and responses
import mongoose from 'mongoose'
import path from 'path'
import cors from 'cors'

const app = express() // top-level function exported by the express module.

const server = require('http').Server(app)
const io = require('socket.io')(server)

mongoose.connect('mongodb+srv://reactinsta:3HLS2nI4KOwkNEsX@cluster0-7ut8b.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


app.use((req, res, next) => {
    req.io = io

    next()
})

app.use(cors())

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))

app.use(require('./routes'))

server.listen(3333, () => console.log('Example app listening on port 3333!'))


