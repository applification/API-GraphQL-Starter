import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import config from './config'
import router from './router'

// Connect MongoDB with Mongoose
mongoose.connect(`mongodb://localhost/${config.db}`)

const app = express()

app.use(bodyParser.json({ type: '*/*' }))
router(app)

export default app
