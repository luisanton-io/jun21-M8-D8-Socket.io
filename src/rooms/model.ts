import mongoose from "mongoose"
import { RoomSchema } from './schema'

type Message = {
    text: string,
    sender: string,
    timestamp: number,
    id: string
}

type Room = {
    name: string
    chatHistory: Message[]
}

export const RoomModel = mongoose.model("rooms", RoomSchema);