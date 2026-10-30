import * as conversationMessageService from "../service/conversation-message.service.js";

export async function sendMsg(req, res, next) {
  try {
    const { conversationId } = req.params;
    const { content } = req.body;
    const senderId = req.user._id;

    const message = await conversationMessageService.sendMessage(
      conversationId,
      senderId,
      content
    );

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: message,
    });
  } catch (error) {
    next(error);
  }
}

export async function getMsgs(req, res, next) {
  try {
    const { conversationId } = req.params;
    const userId = req.user._id;

    const messages = await conversationMessageService.getMessages(
      conversationId,
      userId
    );

    return res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteMsg(req, res, next) {
  try {
    const { messageId } = req.params;
    const userId = req.user._id;

    await conversationMessageService.deleteMessage(messageId, userId);

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}