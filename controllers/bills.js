const Bill = require('../models/bill')
const User = require('../models/user')


exports.create = async function (req,res){
    try {
        req.body.user = req.user._id
        const bill = await Bill.create(req.body)
        req.user.bills?
        req.user.bills.addToSet({_id: bill._id }):
        req.user.bills = [{_id: bill._id }]
        await req.user.save()
        res.json(bill)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.show = async function (req, res){
    try{
        const bill = await Bill.findOne({_id: req.params.id })
        res.json(bill)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.indexFinished = async function (req, res){
    try{
        const bills = await Bill.find({ paid: true, user: req.user._id })
        res.json(bills)
    } catch(error){
        res.status(400).json({ message: error.message })
    }
}

exports.indexNotFinished = async function (req, res){
    try{
        const bills = await Bill.find({ paid: false, user: req.user._id })
        res.json(bills)
    } catch(error){
        res.status(400).json({ message: error.message })
    }
}

exports.update = async function (req, res){
    try{
        const bill = await Bill.findOneAndUpdate({ _id: req.params.id}, req.body, { new: true })
        res.json(bill)
    } catch(error){
        res.status(400).json({ message: error.message })
    }
}

exports.delete = async function (req, res){
    try{
        const bill = await Bill.findOneAndDelete({ _id: req.params.id})
        res.sendStatus (204)
    } catch(error){
        res.status(400).json({ message: error.message })
    }
}