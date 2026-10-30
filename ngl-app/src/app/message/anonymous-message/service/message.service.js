import { AppError } from "../../../../lib/error/error.js";
import { userNotExist } from "../../../user/error.js";
import * as userRepository from "../../../user/repository/user.repo.js";
import * as messageRepository from "../repository/message.repo.js";

export async function createMessage(content,receiver,sender){
    //check user exist
    const User = await userRepository.findUserById(receiver);
    // not throw error
    if(!User) throw new userNotExist;
    //create message :save message into DB
    return await messageRepository.createMessage(content,receiver,sender)

}

export async function getAllMessages(userId){
    //create message :save message into DB
    const messages = await messageRepository.getAllMessages(userId);
    if(messages.length === 0) throw new AppError("messages not found",404);
    return messages;
}

export async function getMessagesById(messageId,userId){
    //create message :save message into DB
    const messages = await messageRepository.getMessagesById(messageId,userId);
    if(!messages) throw new AppError("messages not found",404);
    return messages;
}

export async function deleteMessage(messageId,userId){
    //create message :save message into DB
    const messages = await messageRepository.deleteMessage(messageId,userId);
    if(!messages) throw new AppError("messages not found so can not delete it ",404);
    return messages;
}