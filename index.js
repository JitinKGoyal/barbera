// api endpoint 
const express = require('express')
const connectMongo = require('./db')
const cors = require('cors')

connectMongo();

const app = express()
const port = 3003

app.use(cors())
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb' }));



// customer authentication endpoint
app.use('/api/auth/customer', require('./routes/auth/customerAuthRouter'))
// serviceProvider authentication endpoint
app.use('/api/auth/serviceProvider', require('./routes/auth/seviceProviderRouter'))
// worker authentication endpoint
app.use('/api/auth/worker', require('./routes/auth/workerAuthRouter'))



app.listen(port, () => {
    console.log(`barbera app listening on port ${port}`)
})

// mongoose, nodemon, express