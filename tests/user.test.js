const request = require('supertest')

const { MongoMemoryServer } = require('mongodb-memory-server')

const app = require('../app')

const User = require('./models/User')
const mongoose = require('mongoose')
const server = app.listen(8080, () => console.log('Testing on Port 8080'))
let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true })
})

afterAll(async () => {
    await mongoose.connection.close()
    mongoServer.stop()
    server.close()
})