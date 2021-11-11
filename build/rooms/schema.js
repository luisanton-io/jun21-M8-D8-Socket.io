"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var MessageSchema = new mongoose_1.default.Schema({
    text: { type: String },
    sender: { type: String },
    timestamp: { type: Number },
    id: { type: String },
});
exports.RoomSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    chatHistory: {
        type: [MessageSchema],
        required: true,
        default: []
    }
});
