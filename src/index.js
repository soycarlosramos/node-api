import express from 'express'
import path from 'path'
import * as dotenv from 'dotenv'
dotenv.config({ path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`) })

// App
const app = express()

// DB connection
import './conn/pool.js'

// Settings
app.set('port', process.env.PORT ?? 3000)

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Routes
app.get('/', (req, res) => res.json({ message: 'Hello world' }))
import { auth, users, notFound } from './routes/index.js'
app.use(auth)
app.use(users)
app.use(notFound)

// Listenning server
app.listen(app.get('port'), () => {
	if (process.env.NODE_ENV == 'development') {
		console.log(`Server running on http://localhost:${app.get('port')} 🚀`)
		return
	}
	console.log('Node server running...')
})