const {model, Schema} = require('mongoose')

const billSchema = new Schema ({
    title: { type: String, required: true },
    cost: { type: Number, required: true },
    paid: { type: Boolean, required: true }, 
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
}, {
    timestamps: true
})

const Bill = model('Bill', billSchema)

module.exports = Bill