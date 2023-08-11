const db = require('../models')
const Conversation = db.Conversation
const MembreConversation = db.MembreConversation
const Message = db.Message

const sendMessage = async (req, res) => {
    try {
        
        const promiseA = new Promise(async (resolve, reject) => {
            try {
                if (!req.body.conversation_id) {
                    const conversation_id = await findOrCreateConversation(req)
                    console.log('conversation', conversation_id);
                    resolve(conversation_id);
                } else {
                    resolve(req.body.conversation_id);
                }
            } catch (error) {
                reject(error)
            }
        });
        promiseA.then(async (conv) => { 
            const message = await createMessage(req, conv)
            res.status(200).send(message)
        }).catch((error) => {
            res.status(500).send(error)
        })
    } catch (error) {
        res.status(500).send(error)
    }
}
const findOrCreateConversation = async (req) => {
    console.log('fdsfdsfdsfdsfdsf8786778787')
    const conversation = await Conversation.findOne({
        include: [{
            model: MembreConversation,
            where:{
                user_id: req.user.userId,
                user_id: req.body.client_id,
            }
        }]
    })
    if (conversation) {
        return conversation.id
    }
    return await createConversation(req)
}
const createConversation = async (req) => {
    const conversation = await Conversation.create({ last_message: new Date() })
    console.log('conversation', conversation);
    await MembreConversation.create({ conversation_id: conversation.id, user_id: req.body.client_id })
    await MembreConversation.create({ conversation_id: conversation.id, user_id: req.user.userId })
    return conversation.id
}
const createMessage = async (req, conversation_id) => {
    const message = await Message.create({ conversation_id, message: req.body.message, user_id: req.user.userId })
    return message
}

const getConversation = async (req,res) => {
    try {
        const conversations =await  Conversation.findAll({
            include:[
                {
                    model: MembreConversation,
                    where: {user_id: req.user.userId}
                },
                {
                    model:Message ,as: "lastmessage",
                    order: [
                        ['createdAt', 'DESC']
                    ]
                },
                {
                    model: MembreConversation ,
                    as: "whodiscut",
                    include: [{
                        model:  db.User,
                        attributes: {
                            exclude: ['password']
                        }
                    }]
                }
            ]
        })
        res.status(200).send(conversations)
    } catch (error) {
        res.status(500).send(error)
    }
}
module.exports = {
    sendMessage,
    getConversation
}