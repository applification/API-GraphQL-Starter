import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import config from './config'
import router from './router'
import morgan from 'morgan'

// Connect MongoDB with Mongoose
mongoose.connect(`mongodb://localhost/${config.db}`)

const app = express()
const port = process.env.PORT || 1973

app.use(morgan('combined'))
app.use(bodyParser.json({ type: '*/*' }))
router(app)

app.listen(port)

console.dir(`Middleware listening on port: ${port}`)
