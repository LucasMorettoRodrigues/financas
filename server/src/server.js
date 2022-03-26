require('dotenv').config()
const express = require('express')
const sequelize = require('./database')
const cors = require('cors')
const testRoutes = require('./router/testRoutes')
const accountsRoutes = require('./router/accountsRoutes')
const postingsRoutes = require('./router/postingsRoutes')

// db connection
sequelize.sync().then(() => console.log('Db is ready.'))

const app = express()

// middlewares
app.use(cors())
app.use(express.json())

// routes
app.use(testRoutes)
app.use('/api/v1/accounts', accountsRoutes)
app.use('/api/v1/postings', postingsRoutes)

const port = process.env.PORT || 5000


app.listen(port, () => console.log(`Server is listening on port ${port}.`))