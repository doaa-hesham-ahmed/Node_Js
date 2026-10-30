import { AppError } from "../../../../lib/error/error.js";
import * as identityRepo from "../repository/identity-request.repo.js";
import * as messageRepo from "../../anonymous-message/repository/message.repo.js";
import { createConversation } from "../../conversation/repository/conversation.repo.js";
import { MessageNotFound, MessageReceiverIdentifyReq, reqNotExist, UnauthorizedReqToRes } from "../error.js";

export async function createRequest(messageId, userId){
  //find message by Id
const message = await messageRepo.getMessagesById(userId)
  //if Not exist _>"throw error"
  if(!message) throw MessageNotFound;
  //check if reciever message is requesting the identity
  if (message.receiver.toString() !== userId.toString()) {
    throw MessageReceiverIdentifyReq;
  }

  //find request exist request 
  const existRquest = await identityRepo.findExistingRequest(messageId,userId)
  //if (yes) message exist
  if(existRquest) throw reqAlreadyExist
  //create+retrun
return await identityRepo.createRequest(messageId,message.sender,userId)
}

export async function getRequests(){
    const request = await identityRepo.getRequestsForSender(senderId)
    if(!request || request.length === 0) throw new Error("request not exist ",404);
    
    return request;
}

export async function respondToRequest(requestId, status){
if (!["accepted", "rejected"].includes(status))  throw new AppError("Invalid status, must be accepted or rejected", 400);

  // Find the identity request by its ID
  const request = await identityRepo.findRequestById(requestId);
  if (!request) throw reqNotExist;

  // Ensure only the original message sender is authorized to respond to this request
  if (request.sender.toString() !== senderId.toString()) {
    throw UnauthorizedReqToRes
  }

  //  Verify request hasn't already been processed (must be 'pending')
  if (request.status !== "pending") {
    throw new AppError(`This request has already been ${request.status}`, 400);
  }

  // Update the request status in the database
  const updatedRequest = await identityRepo.updateRequestStatus(requestId, status);

  // Step 3.6: If accepted, automatically create a conversation between both participants linked to the original message
  let conversation = null;
  if (status === "accepted") {
    conversation = await createConversation(
      [request.sender, request.receiver],
      request.message
    );
  }

  return { request: updatedRequest, conversation };
}
