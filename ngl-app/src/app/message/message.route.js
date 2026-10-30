import { Router } from "express";
import anonymousmessageRouter from "./anonymous-message/message.route.js";
import conversationRouter from "./conversation/conversation.route.js";
import conversationMessageRouter from './conversation-message/conversation-message.route.js';
import identifiedReqRouter from "./identity-request/identity-request.route.js";
const messageRouter = Router();

messageRouter.use('/anonymous',anonymousmessageRouter);
messageRouter.use('/conversationMess',conversationMessageRouter)
messageRouter.use('/conversation',conversationRouter)
messageRouter.use('/identify',identifiedReqRouter)
export default messageRouter ;