const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const routes = require('./Routes/Routes')
const cors = require('cors')
require('dotenv').config();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/image', express.static('uploads'))

// mongodb://localhost:27017/jwt
mongoose.connect('mongodb://127.0.0.1:27017/jwt')
    .then(() => console.log('Data base connected'))
    .catch((error) => console.log(error))


// Middleware to log request details

app.get('/', (req, res) => res.send('Hello World!'))
app.use('/api', routes)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))