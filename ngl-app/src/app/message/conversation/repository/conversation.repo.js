import Conversation from "../model/conversation.model.js";

//  Create a new conversation between participants linked to the original message[cite: 2]
export async function createConversation(participants, originalMessageId) {
  return await Conversation.create({
    participants,
    originalMessage: originalMessageId,
  });
}

//  Check if a user is a participant in a specific conversation
export async function findParticipantConversation(conversationId, userId) {
  return await Conversation.findOne({
    _id: conversationId,
    participants: userId,
  });
}

//  Get all conversations belonging to a user (inbox)
export async function getUserConversations(userId) {
  return await Conversation.find({ participants: userId })
    .populate("participants", "name email profilePicPath")
    .populate("originalMessage", "content createdAt")
    .sort({ updatedAt: -1 });
}