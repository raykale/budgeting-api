require('dotenv').config
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.SECRET)
        console.log(data)
        const user = await User.findOne({_id: data._id })
        if(!user){ 
            throw new Error('User not found') 
        }
        req.user = user
        next()
    }catch(error){
        res.status(401).json ({ message: error.message })
    }
}

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.json({ user, token })
    } catch (error) {
        res.status(400).json({ message: error.messege })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if(!user || !await bcrypt.compare(req.body.password, user.password)){
            throw new Error('User Not Found')
        } else {
            const token = await user.generateAuthToken()
            res.json({ user, token })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        updates.forEach(update => req.user[update] = req.body[update])
        await req.user.save()
        res.json(req.user)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        updates.forEach(update => req.user[update] = req.body[update])
        await req.user.deleteOne()
        res.sendStatus(204)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.show = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).populate("bills")
        const unpaidTotal = await user.calculateUnpaidTotal()
        const budgetTotal = await user.calculateBillTotal()
        const data = {
            ...user, 
            unpaidTotal, 
            budgetTotal
        }
        res.json(data)
    } catch (error) {
     res.status(400).json({ message: error.message })
    }
}