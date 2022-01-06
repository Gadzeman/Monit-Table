const { Schema, model } = require('mongoose')

const { TASK, GROUP } = require('../config/collection.db.enum')

const groupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: TASK
    }]
})

module.exports = model(GROUP, groupSchema)
