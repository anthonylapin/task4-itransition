const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const path = require('path')

const app = express()
app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/content', require('./routes/content.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

let port = process.env.PORT || 5000
const MONGO_URI = config.get('mongoUri')



const start = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        app.listen(port, () => {
            console.log(`Server is on port ${port}`)
        })
    } catch (e) {
        console.log(`Server error: ${e.message}`)
        process.exit(1)
    }
}

process.on('uncaughtException', function (err) {
    console.log(" UNCAUGHT EXCEPTION ")
    console.log("[Inside 'uncaughtException' event] " + err.stack || err.message)
    process.exit(0)
})

process.on('SIGTERM', function () {
    app.close(function () {
        process.exit(0);
    })
})

start()

