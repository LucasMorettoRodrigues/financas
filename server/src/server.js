const express = require('express')
const testRoutes = require('./router/testRoutes')

const app = express()

app.use(express.json())
app.use(testRoutes)

app.listen(5000, () => console.log('Server is listening on port 5000.'))