const request = require('supertest')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const Bill = require('../models/bill')
const User = require('../models/user')
const mongoose = require('mongoose')
const server = app.listen(8081, () => console.log('Testing on PORT 8081')) 
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
    //bills // router.post('/',userController.auth, billCtrl.create)
    test('It should create a new bill in the db', async () => {
        const user = new User({ name: 'Ray Ruby', email: 'redruby@real.com', password: '12345' })
        await user.save()

        const token = await user.generateAuthToken()
       
        const response = await request(app).post('/bills').send({title: 'Rent', cost: 1200, paid: true})
        .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.title).toEqual('Rent')
        expect(response.body.cost).toEqual(1200)
        expect(response.body.paid).toBeTruthy()
    })

 //bills// router.get('/', userController.auth, billCtrl.indexNotFinished)list bills that has not been paid
 test('It should show a list of unpaid bills db', async () => {
    const user = new User({ name: 'Ray Ruby', email: 'redruby@real.com', password: '12345' })
    await user.save()

    const token = await user.generateAuthToken()
    const bill = new Bill({ title: 'Rent', cost: 400, paid: false, user: user._id })
    await bill.save()
          
    const response = await request(app).get('/bills')
    .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    for(let i = 0; i < response.body.length; i++){
        expect(response.body[i]).toHaveProperty('title')
        expect(response.body[i]).toHaveProperty('cost')
        expect(response.body[i].paid).toBeFalsy()
    }
})

    //bills/paid// router.get('/paid', userController.auth, billCtrl.indexFinished) list of paid bills

    test('It should show a list of paid bills db', async () => {
        const user = new User({ name: 'Ray Ruby', email: 'redruby@real.com', password: '12345' })
        await user.save()
    
        const token = await user.generateAuthToken()
        const bill = new Bill({ title: 'Rent', cost: 400, paid: true, user: user._id })
        await bill.save()
              
        const response = await request(app).get('/bills')
        .set('Authorization', `Bearer ${token}`)
    
        expect(response.statusCode).toBe(200)
        for(let i = 0; i < response.body.length; i++){
            expect(response.body[i]).toHaveProperty('title')
            expect(response.body[i]).toHaveProperty('cost')
            expect(response.body[i].paid).toBeTruthy()
        }
    })
    //bills/:id// router.delete('/:id', userController.auth, billCtrl.delete)

    test('It should delete a bill db', async () => {
        const user = new User({ name: 'Ray Ruby', email: 'redruby@real.com', password: '12345' })
        await user.save()
    
        const token = await user.generateAuthToken()
        const bill = new Bill({ title: 'Rent', cost: 400, paid: false, user: user._id })
        await bill.save()
              
        const response = await request(app).delete(`/bills/${bill._id}`)
        .set('Authorization', `Bearer ${token}`)
    
        expect(response.statusCode).toBe(204)
    })
   //bills/:id// router.put('/:id', userController.auth, billCtrl.update)
   test('It should update a bill db', async () => {
    const user = new User({ name: 'Ray Ruby', email: 'redruby@real.com', password: '12345' })
    await user.save()

    const token = await user.generateAuthToken()
    const bill = new Bill({ title: 'Rent', cost: 400, paid: false, user: user._id })
    await bill.save()
          
    const response = await request(app).put(`/bills/${bill._id}`).send({
        cost: 1500
    })
    .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.cost).toEqual(1500)
})
    //bills/:id// router.get('/:id', userController.auth, billCtrl.show)
    test('It should show a bill db', async () => {
        const user = new User({ name: 'Ray Ruby', email: 'redruby@real.com', password: '12345' })
        await user.save()
    
        const token = await user.generateAuthToken()
        const bill = new Bill({ title: 'Rent', cost: 400, paid: false, user: user._id })
        await bill.save()
              
        const response = await request(app).get(`/bills/${bill._id}`)
        .set('Authorization', `Bearer ${token}`)
    
        expect(response.statusCode).toBe(200)
        expect(response.body.title).toEqual('Rent')
        expect(response.body.cost).toEqual(400)
        expect(response.body.paid).toBeFalsy()
    })

})