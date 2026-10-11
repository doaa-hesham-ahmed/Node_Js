import { Router } from "express";
import * as messageController from "../message/controller/message.controller.js"
import { Guard } from "../../lib/auth/guard.js";
const messageRouter = Router();
messageRouter.post('/',messageController.createMessage);
messageRouter.post('/public',Guard,messageController.createMessage);
messageRouter.get('/',Guard,messageController.getAllMessages);
messageRouter.get('/messageId',Guard,messageController.getMessagesById);
messageRouter.delete('/messageId',Guard,messageController.deleteMessage);

export default messageRouter ;