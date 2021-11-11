import mongoose from "mongoose"
import { User } from "../types"
import { UserSchema } from "./schema"

type DBUser = {
    email: string,
    password: string
}

export const UserModel = mongoose.model<DBUser>("users", UserSchema)