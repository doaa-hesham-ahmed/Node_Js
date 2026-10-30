import { Router } from "express";
import * as identityController from "./controller/identity-request.controller.js";
import { authGuard } from "../../../lib/auth/guard.js";

const identifiedReqRouter = Router();

identifiedReqRouter.use(authGuard);

identifiedReqRouter.post("/", identityController.createRequest);
identifiedReqRouter.get("/", identityController.getRequests);
identifiedReqRouter.patch("/:requestId/respond", identityController.getRequests);

export default identifiedReqRouter;