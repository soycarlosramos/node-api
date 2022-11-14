const express = require('express')
const app = express()

// DB connection
require('./conn/pool')

// Settings
app.set('port', process.env.PORT || 5000)

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Routes
app.get('/', (req, res) => res.json({ message:'Hellow world' }))
const { userRoutes } = require('./routes')
app.use(userRoutes)

app.listen(app.get('port'), () => {
  console.log(`Server running on http://localhost:${app.get('port')} 🚀`)
})