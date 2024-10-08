const express = require('express');
const groupController = require('../controllers/groupController');

// Create the router
const groupRouter = express.Router();

// Add the routes to the router

groupRouter.get('/get-all', groupController.getGroups);

groupRouter.post('/post', groupController.postGroup);

groupRouter.get('/get/:id', groupController.getGroupById);

groupRouter.delete('/delete/:id',groupController.deleteGroup);

groupRouter.get('/get-by-code/:code', groupController.getGroupByCode);

groupRouter.post('/joinGroup',groupController.joinGroup)

groupRouter.post('/leaveGroup',groupController.leaveGroup)

groupRouter.post('/isLeader', groupController.isLeader)

groupRouter.post('/kickMember', groupController.kickMember)



module.exports = groupRouter;
