import * as conversationService from "../service/conversation.service.js";

//  Get all user conversations
export async function getConversations(req, res, next) {
  try {
    const userId = req.user._id;
    const conversations = await conversationService.getUserConversations(userId);

    return res.status(200).json({
      success: true,
      data: conversations,
    });
  } catch (error) {
    next(error);
  }
}

// Send a message in a conversation
export async function sendMessage(req, res, next) {
  try {
    const { conversationId } = req.params;
    const { content } = req.body;
    const senderId = req.user._id;

    const message = await conversationService.sendConversationMessage(
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

// Get messages of a conversation
export async function getMessages(req, res, next) {
  try {
    const { conversationId } = req.params;
    const userId = req.user._id;

    const messages = await conversationService.getConversationMessages(
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