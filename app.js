const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const config = require('config')

const app = express()
app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/content', require('./routes/content.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

let port = process.env.PORT || config.get('port')
const MONGO_URI = config.get('mongoUri')

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('Database connected successfully!')

        app.listen(port, () => {
            console.log(`Server is on port ${port}`)
        })
    } catch (e) {
        console.log(`Server error: ${e.message}`)
        process.exit(1)
    }
}

start()


