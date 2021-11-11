import cors from "cors";
import express from "express";
import { RoomModel } from "./rooms/model";
import { shared } from "./shared";
import userRouter from "./users";

// Configuring our Express application

const app = express();
// Configure our express application with middlewares and routes and all of that...
app.use(cors())
app.use(express.json())

app.get('/online-users', (req, res) => {
    res.send({ onlineUsers: shared.onlineUsers })
})

app.get('/chat/:room', async (req, res) => {
    const room = await RoomModel.findOne({ name: req.params.room })

    if (!room) {
        res.status(404).send()
        return
    }

    res.send(room.chatHistory)
})

app.use("/users", userRouter)

export { app }