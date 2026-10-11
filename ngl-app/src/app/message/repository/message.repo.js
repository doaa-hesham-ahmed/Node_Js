import Message from './../model/message.model.js';
export async function createMessage(content,receiver,sender) {
    return await Message.create({
        content:content,
        receiver:receiver,
        sender:sender,
    })
    
}

export async function getAllMessages(userId) {
    return await Message.find({
      receviver:userId,
      isDeleted:true,
    },
    {},
    {
        populate:{path:"sender"}
    }
)
    
}

export async function getMessagesById(messageId,userId) {
    return await Message.findOne({
             _id:messageId,
             receiver:userId,
             isDeleted:true,
    },
   
)
    
}



export async function deleteMessage(messageId,userId) {
    return await Message.findOneAndUpdate(
        {
            _id:messageId,
            receiver:userId,
            isDeleted:true,
          
        },
        {
           isDeleted:true,
           deleteAt:new Date()
        }
    )
    
}