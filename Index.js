require('dotenv').config()

const express = require('express')
const cors = require('cors')
require('./DB_connection/db')
const router = require('./Router/router')


const server = express()

server.use(cors())
server.use(express.json())
server.use(router)
 

server.use('/uploads',express.static('./uploads'))


const PORT = 3000 || process.env.PORT

server.listen(PORT, () => {
    console.log("Server running at : ", PORT)
})

server.get('/', (req, res) => {
    res.send("<h1>Learnify Server is Active</h1>")
})