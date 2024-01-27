const express = require('express')
const morgan = require('morgan')
const userRoutes = require('./routes/userRoutes')
const billRoutes = require('./routes/bills')
const app = express()

app.use(express.json())
app.use(morgan('combined'))
app.use('/users', userRoutes)
app.use('/bills', billRoutes)

module.exports = app