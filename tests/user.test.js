const request = require('supertest')

const { MongoMemoryServer } = require('mongodb-memory-server')

const app = require('../app')

const User = require('../models/user')
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

describe('Test suite for the routes on our api', () => {
    //users
    test('It should create a new user in the db', async () => {
        const response = await request(app).post('/users').send({name: 'Ray Ruby', email: 'redruby@real.com', password: '12345'})

        expect(response.statusCode).toBe(200)
        expect(response.body.user.name).toEqual('Ray Ruby')
        expect(response.body.user.email).toEqual('redruby@real.com')
        expect(response.body).toHaveProperty('token')
    })

    //users/login
    test('It should log the user in', async () => {
        const user = new User({ name: 'Ray Ruby', email: 'redruby@real.com', password: '12345' })
        await user.save()

        const response = await request(app)
        .post('/users/login')
        .send({ email: 'redruby@real.com', password: '12345' })

    expect(response.statusCode).toBe(200)
    expect(response.body.user.name).toEqual('Ray Ruby')
    expect(response.body.user.email).toEqual('redruby@real.com')
    expect(response.body).toHaveProperty('token')
    })

    // users/:id update
    test('It update a user', async () => {
        const user = new User({ name: 'Ray Ruby', email: 'redruby@real.com', password: '12345' })
        await user.save()
        const token = await user.generateAuthToken()

        const response = await request(app)
        .put(`/users/${user._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Brandy Sue', email: 'brandysue@soblue.com' })
    
    expect(response.statusCode).toBe(200)
    expect(response.body.name).toEqual('Brandy Sue')
    expect(response.body.email).toEqual('brandysue@soblue.com')
  })
    

    // user/:id delete
    test('It should delete a user', async () => {
        const user = new User({ name: 'Ray Ruby', email: 'redruby@real.com', password: '12345' })
        await user.save()
        const token = await user.generateAuthToken()
    
        const response = await request(app)
          .delete(`/users/${user._id}`)
          .set('Authorization', `Bearer ${token}`)
        
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toEqual('User deleted')
      })


test('It should show a user', async () => {
    const user = new User({ name: 'Ray Ruby', email: 'redruby@real.com', password: '12345' })
    await user.save()
    const token = await user.generateAuthToken()

    const response = await request(app)
      .get(`/users/${user._id}`)
      .set('Authorization', `Bearer ${token}`)
    
    expect(response.statusCode).toBe(200)
    expect(response.body.user.name).toEqual('Ray Ruby')
    expect(response.body.user.email).toEqual('redruby@real.com')
  })
})



