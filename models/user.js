require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: String,
    email: String, 
    password: String,
    bills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bill'}]
}, {
    toJSON: {
        virtuals: true
    }
})
userSchema.methods.calculateUnpaidTotal = async function(){
    const user = await this.populate('bills')
    const unpaid = user.bills.reduce( (total, bill) => {
        if(bill.paid) return total
         return total + bill.cost
     }, 0)
     return unpaid
}

userSchema.methods.calculateBillTotal = async function(){
    const user = await this.populate('bills')
    const budget = user.bills.reduce( (total, bill) => {
         return total + bill.cost
     }, 0)
     return budget
}




userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({_id: this._id }, process.env.SECRET)
    return token
}

const User = mongoose.model('User', userSchema)

module.exports = User