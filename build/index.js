"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var io_1 = require("./io");
process.env.TS_NODE_DEV && require("dotenv").config();
// Checking Mongo env var
if (!process.env.MONGO_URL) {
    throw new Error("No MongoDB uri defined");
}
// Starting the application daemons
mongoose_1.default.connect(process.env.MONGO_URL).then(function () {
    console.log("connected to mongo");
    io_1.httpServer.listen(3030);
});
