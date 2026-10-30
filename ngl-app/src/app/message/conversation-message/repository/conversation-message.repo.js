import ConversationMessage from "../model/conversation-message.model.js";

export async function createConversationMessage(conversationId, senderId, content) {
  return await ConversationMessage.create({
    conversation: conversationId,
    sender: senderId,
    content,
  });
}

export async function getConversationMessages(conversationId) {
  return await ConversationMessage.find({
    conversation: conversationId,
    isDeleted: false,
  })
    .populate("sender", "name profilePicPath")
    .sort({ createdAt: 1 });
}

export async function findMessageById(messageId) {
  return await ConversationMessage.findById(messageId);
}

export async function softDeleteMessage(messageId, userId) {
  return await ConversationMessage.findOneAndUpdate(
    { _id: messageId, sender: userId, isDeleted: false },
    { isDeleted: true },
    { new: true }
  );
}