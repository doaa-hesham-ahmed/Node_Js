import { Router } from "express";
import * as msgController
  from "./controller/conversation-message.controller.js";
import { authGuard } from "../../../lib/auth/guard.js";

const conversationMessageRouter = Router({ mergeParams: true });

conversationMessageRouter.use(authGuard);

conversationMessageRouter.post("/", msgController.sendMsg);
conversationMessageRouter.get("/", msgController.getMsgs);
conversationMessageRouter.delete("/:messageId", msgController.deleteMsg);

export default conversationMessageRouter;