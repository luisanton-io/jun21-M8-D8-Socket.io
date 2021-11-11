import mongoose from "mongoose"
import { RoomSchema } from './schema'

export const RoomModel = mongoose.model("rooms", RoomSchema);