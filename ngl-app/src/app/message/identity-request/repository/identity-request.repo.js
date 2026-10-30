import IdentityRequest from '../model/identity-request.model.js';

export async function createRequest(messageId, senderId, receiverId) {
  return await IdentityRequest.create({
    message: messageId,
    sender: senderId,
    receiver: receiverId,
    status: 'pending',
  });
}

export async function findExistingRequest(messageId, receiverId) {
  return await IdentityRequest.findOne({ message: messageId, receiver: receiverId });
}

export async function getRequestsForSender(senderId) {
  return await IdentityRequest.find({ sender: senderId })
    .populate('receiver', 'name email profilePicPath')
    .populate('message', 'content createdAt');
}

export async function findRequestById(requestId) {
  return await IdentityRequest.findById(requestId);
}

export async function updateRequestStatus(requestId, status) {
  return await IdentityRequest.findByIdAndUpdate(
    requestId,
    { status },
    { new: true }
  );
}