import { Router } from "express";
import * as conversationController from "./controller/conversation.controller.js";
import { authGuard } from "../../../lib/auth/guard.js";

const conversationRouter = Router();

// all conversation routes
conversationRouter.use(authGuard);

conversationRouter.get("/", conversationController.getConversations);
conversationRouter.post("/:conversationId/messages", conversationController.sendMessage);
conversationRouter.get("/:conversationId/messages", conversationController.getMessages);

export default conversationRouter;