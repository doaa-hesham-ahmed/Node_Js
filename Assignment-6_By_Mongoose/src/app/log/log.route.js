const {Router} = require('express');
const logRouter = Router();
const logController = require('./log.controller')
logRouter.post('/collection/logs/capped',logController.createLogCollection);
logRouter.post('/logs',logController.insertLog);
module.exports=logRouter;