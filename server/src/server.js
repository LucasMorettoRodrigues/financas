const express = require('express')
const sequelize = require('./database')
const cors = require('cors')
const testRoutes = require('./router/testRoutes')
const accountsRoutes = require('./router/accountsRoutes')

sequelize.sync().then(() => console.log('Db is ready.'))

const app = express()

app.use(cors())
app.use(express.json())
app.use(testRoutes)
app.use('/api/v1/accounts', accountsRoutes)


app.listen(5000, () => console.log('Server is listening on port 5000.'))