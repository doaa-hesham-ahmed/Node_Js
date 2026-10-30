import { validateBody } from "../../../../lib/validation/validation.js";
import { sendMessage } from "../dto/message.dto.js";
import * as messageService from "../service/message.service.js"


export async function createMessage(req,res,next){
    try {
        const data = await validateBody(sendMessage,req.body);
        const {content,receiver} = data;
        const sender = req.user?.id;
        const createdMessages = await messageService.createMessage(content,receiver,sender)
        res.status(201).json({
            message:'message is Created Succesfully',
            success:true,
            data:createdMessages
        })
        
    } catch (error) {
        next(error)
    }
}


export async function getAllMessages(req,res,next){
    try {
        const messages = await messageService.getAllMessages(req.user.id)
        res.status(200).json({
            message:'message is reterive Succesfully',
            success:true,
            data:messages
        })
        
    } catch (error) {
        next(error)
    }
}

export async function getMessagesById(req,res,next){
    try {
        const {messageId} = req.params;
        const userId = req.user.id;
        const message = await messageService.getMessagesById(messageId,userId)
        res.status(200).json({
            message:'message is retereive Succesfully',
            success:true,
            data:message
        })
        
    } catch (error) {
        next(error)
    }
}


export async function deleteMessage(req,res,next){
    try {
        const {messageId} = req.params;
        const userId = req.user.id;
        const delmessages = await messageService.deleteMessage(messageId,userId)
        res.status(200).json({
            message:'message is deleted Succesfully',
            success:true,
            data:delmessages
        })
        
    } catch (error) {
        next(error)
    }
}