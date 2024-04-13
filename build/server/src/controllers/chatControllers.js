"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessages = exports.sendMessage = void 0;
const Conversation_1 = __importDefault(require("../models/Conversation"));
const Message_1 = __importDefault(require("../models/Message"));
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { senderId, message } = req.body;
        const { id: receiverId } = req.params;
        if (!senderId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        let conversation = yield Conversation_1.default.findOne({
            members: { $all: [senderId, receiverId] },
        });
        if (!conversation) {
            conversation = yield Conversation_1.default.create({
                members: [senderId, receiverId],
            });
        }
        const newMessage = new Message_1.default({
            senderId,
            receiverId,
            message,
        });
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        yield Promise.all([conversation.save(), newMessage.save()]);
        // the next lines will be uncommented as soonas we begin the creation of the front enf of  the chat 
        // const receiverSocketId = getReceiverSocketId(receiverId);
        // if (receiverSocketId) {
        //     io.to(receiverSocketId).emit("newMessage", newMessage);
        // }
        res.status(201).json(newMessage);
    }
    catch (error) {
        console.log("Error in sendMessage controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.sendMessage = sendMessage;
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: userToChatId } = req.params;
        const { senderId } = req.body;
        if (!senderId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const conversation = yield Conversation_1.default.findOne({
            members: { $all: [senderId, userToChatId] },
        }).populate("messages");
        if (!conversation) {
            res.status(200).json([]);
            return;
        }
        const messages = conversation.messages;
        res.status(200).json(messages);
    }
    catch (error) {
        console.log("Error in getMessages controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getMessages = getMessages;
