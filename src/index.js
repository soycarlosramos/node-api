const express = require('express')
const app = express()
const routes = require('./routes')

app.set('port', process.env.PORT || 5000)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

require('./conn/pool')

app.use(routes)

app.listen(app.get('port'), () => {
  console.log(`Server running on http://localhost:${app.get('port')} 🚀`)
})