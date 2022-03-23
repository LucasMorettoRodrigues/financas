const express = require('express')
const sequelize = require('./database')
const testRoutes = require('./router/testRoutes')

sequelize.sync().then(() => console.log('Db is ready.'))

const app = express()

app.use(express.json())
app.use(testRoutes)


app.listen(5000, () => console.log('Server is listening on port 5000.'))