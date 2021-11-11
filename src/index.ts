import mongoose from "mongoose";
import { httpServer } from "./io";

process.env.TS_NODE_DEV && require("dotenv").config()

// Checking Mongo env var
if (!process.env.MONGO_URL) {
    throw new Error("No MongoDB uri defined")
}

// Starting the application daemons

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("connected to mongo")
    httpServer.listen(3030);
})
