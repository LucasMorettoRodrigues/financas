const express = require('express')
const sequelize = require('./database')
const testRoutes = require('./router/testRoutes')
const accountsRoutes = require('./router/accountsRoutes')

sequelize.sync().then(() => console.log('Db is ready.'))

const app = express()

app.use(express.json())
app.use(testRoutes)
app.use('/accounts', accountsRoutes)


app.listen(5000, () => console.log('Server is listening on port 5000.'))