import * as conversationMessageRepo from "../repository/conversation-message.repo.js";
import { verifyParticipant } from "../../conversation/service/conversation.service.js";
import { AppError } from "../../../../lib/error/error.js";
import { MessageNotFound } from "../../identity-request/error.js";
import { UnauthorizedDelMessage } from "../error.js";

//  Send a message inside a conversation
export async function sendMessage(conversationId, senderId, content) {
  // Ensure user is a participant of the conversation
  await verifyParticipant(conversationId, senderId);

  // Save the message via repository
  return await conversationMessageRepo.createConversationMessage(conversationId, senderId,content);
}

//Retrieve all messages for a conversation[cite: 2]
export async function getMessages(conversationId, userId) {
  // Verify user participation[cite: 2]
  await verifyParticipant(conversationId, userId);

  // Fetch messages
  return await conversationMessageRepo.getConversationMessages(conversationId);
}

// Delete a message within a conversation
export async function deleteMessage(messageId, userId) {
  //Find the message
  const message = await conversationMessageRepo.findMessageById(messageId);
  if (!message) throw MessageNotFound;

  // Ensure only the original message sender can delete it
  if (message.sender.toString() !== userId.toString()) {
    throw UnauthorizedDelMessage;
  }

  // Soft delete the message
  return await conversationMessageRepo.softDeleteMessage(messageId, userId);
}