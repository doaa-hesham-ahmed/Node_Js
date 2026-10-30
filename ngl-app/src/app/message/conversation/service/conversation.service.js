import * as conversationRepo from "../repository/conversation.repo.js";
import * as conversationMessageRepo from "../../conversation-message/repository/conversation-message.repo.js";
import { UnauthorizeAccessConversion } from "../error.js";


// Verify if a user is an active participant in a specific conversation[cite: 2]
export async function verifyParticipant(conversationId, userId) {
  const conversation = await conversationRepo.findParticipantConversation(conversationId,userId)
  // If the user is not a participant, block access with a 403 error[cite: 2]
  if (!conversation) throw UnauthorizeAccessConversion;
  return conversation;
}

// Get all conversations for a specific user inbox
export async function getUserConversations(userId) {
  return await conversationRepo.getUserConversations(userId)
}

// Send a message inside an existing conversation[cite: 2]
export async function sendConversationMessage(conversationId, senderId, content) {
  // Step 2.1: Verify the sender is a participant before sending[cite: 2]
  await verifyParticipant(conversationId, senderId);

  // Create and save the conversation message
  const message = await conversationMessageRepo.createConversationMessage(conversationId,senderId,content)

  return message;
}

// Retrieve all messages for a specific conversation
export async function getConversationMessages(conversationId, userId) {
  // Step 3.1: Verify the user is a participant before viewing messages[cite: 2]
  await verifyParticipant(conversationId, userId);

  // Fetch non-deleted messages belonging to this conversation
  const messages = await conversationRepo.getConversationMessages(conversationId)
  return messages;
}