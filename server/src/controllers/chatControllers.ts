import { Request, Response } from "express";
import Conversation, { ConversationDocument } from "../models/Conversation";
import Message, { MessageDocument } from "../models/Message";
import { getReceiverSocketId, io } from "../socket/socket";


export const sendMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { senderId , message } = req.body;
        const { id: receiverId } = req.params;

        if (!senderId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        let conversation: ConversationDocument | null = await Conversation.findOne({
            members: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                members: [senderId, receiverId],
            });
        }

        const newMessage: MessageDocument = new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        // the next lines will be uncommented as soonas we begin the creation of the front enf of  the chat 
        // const receiverSocketId = getReceiverSocketId(receiverId);
        // if (receiverSocketId) {
        //     io.to(receiverSocketId).emit("newMessage", newMessage);
        // }
        

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessages = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id: userToChatId } = req.params;
        const {senderId} = req.body

        if (!senderId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const conversation: ConversationDocument | null = await Conversation.findOne({
            members: { $all: [senderId, userToChatId] },
        }).populate("messages"); 

        if (!conversation) {
            res.status(200).json([]);
            return;
        }

        const messages = conversation.messages;

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
