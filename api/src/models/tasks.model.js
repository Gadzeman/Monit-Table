const { Schema, model } = require('mongoose')

const { TASK, GROUP } = require('../config/collection.db.enum')

const taskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'creating'
    },
    last_check: {
        type: String,
        default: null
    },
    last_download: {
        type: String,
        required: true
    },
    expected_refresh_date: {
        type: String,
        default: null
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: GROUP
    },

})

module.exports = model(TASK, taskSchema)
