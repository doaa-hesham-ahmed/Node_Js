import { Router } from "express";
import * as messageController from "../anonymous-message/controller/message.controller.js"
import { authGuard } from "../../../lib/auth/guard.js";
const anonymousmessageRouter = Router();
anonymousmessageRouter.use(authGuard)
anonymousmessageRouter.post('/',messageController.createMessage);
anonymousmessageRouter.post('/public',authGuard,messageController.createMessage);
anonymousmessageRouter.get('/',authGuard,messageController.getAllMessages);
anonymousmessageRouter.get('/messageId',authGuard,messageController.getMessagesById);
anonymousmessageRouter.delete('/messageId',authGuard,messageController.deleteMessage);

export default anonymousmessageRouter ;