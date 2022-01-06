const router = require('express').Router()

const { groupsController } = require('../controllers');

router.get('/', groupsController.getAllGroups)
router.post('/', groupsController.createGroup)
router.post('/:group_id', groupsController.addTaskForGroup)

module.exports = router
