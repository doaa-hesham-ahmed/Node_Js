import * as identityService from "../service/identity-request.service.js";

export async function createRequest(req, res, next) {
  try {
    const { messageId } = req.body;
    const userId = req.user._id;

    const request = await identityService.createRequest(messageId, userId);

    return res.status(201).json({
      success: true,
      message: "Identity request sent successfully",
      data: request,
    });
  } catch (error) {
    next(error);
  }
}

export async function getRequests(req, res, next) {
  try {
    const senderId = req.user._id;
    const requests = await identityService.getRequests(senderId);

    return res.status(200).json({
      success: true,
      data: requests,
    });
  } catch (error) {
    next(error);
  }
}

export async function respondToRequest(req, res, next) {
  try {
    const { requestId } = req.params;
    const { status } = req.body;
    const senderId = req.user._id;

    const result = await identityService.respondToRequest(requestId, senderId, status);

    return res.status(200).json({
      success: true,
      message: `Request ${status} successfully`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}