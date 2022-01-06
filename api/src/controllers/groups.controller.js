const Group = require('../models/groups.model')
const Task = require('../models/tasks.model')
const ErrorHandler = require('../errors/error.handler')

module.exports = {
    getAllGroups: async (req, res, next) => {
        try {
            const gotGroups = await Group.find({}).populate('tasks', { group: 0 })

            res.json(gotGroups)
        } catch (e) {
            next(e)
        }
    },
    createGroup: async (req, res, next) => {
        try {
            if (req.body.name.length <= 1) {
                throw new ErrorHandler(400, 'Length is small')
            }

            const createdGroup = await Group.create(req.body)

            res.json(createdGroup)
        } catch (e) {
            next(e)
        }
    },
    addTaskForGroup: async (req, res, next) => {
        try {
            const createdTask = await Task.create({...req.body, group: req.params.group_id})

            const foundGroup = await Group.findOne({ _id: req.params.group_id })

            foundGroup.tasks.push( createdTask._id )

            await Group.updateOne({ _id: req.params.group_id }, foundGroup)

            res.json(foundGroup)
        } catch (e) {
            next(e)
        }
    }
}
