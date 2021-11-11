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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpServer = void 0;
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var app_1 = require("./app");
var model_1 = require("./rooms/model");
var shared_1 = require("./shared");
// Create a standard NodeJS httpServer based on our express application
var httpServer = http_1.createServer(app_1.app);
exports.httpServer = httpServer;
// Create a io Server based on our NodeJS httpServer
var io = new socket_io_1.Server(httpServer, { allowEIO3: true });
io.on("connection", function (socket) {
    console.log(socket.id);
    socket.on("setUsername", function (_a) {
        // With this username:
        // we can now save the username in a list of online users
        var username = _a.username, room = _a.room;
        shared_1.shared.onlineUsers.push({ username: username, socketId: socket.id, room: room });
        socket.join(room);
        // we can emit back a logged in message to the client
        socket.emit("loggedin");
        // we can emit an event to all other clients, i.e. excluding this one
        socket.broadcast.emit("newConnection");
        // this is how you emit an event to EVERY client, including this one
        // io.sockets.emit("someevent")
    });
    socket.on("sendmessage", function (_a) {
        var message = _a.message, room = _a.room;
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: 
                    // console.log(room)
                    // we need to save the message to the Database
                    // try {
                    //     throw new Error("Something went wrong")
                    return [4 /*yield*/, model_1.RoomModel.findOneAndUpdate({ room: room }, {
                            $push: { chatHistory: message }
                        })
                        // socket.broadcast.emit("message", message)
                    ];
                    case 1:
                        // console.log(room)
                        // we need to save the message to the Database
                        // try {
                        //     throw new Error("Something went wrong")
                        _b.sent();
                        // socket.broadcast.emit("message", message)
                        socket.to(room).emit("message", message);
                        return [2 /*return*/];
                }
            });
        });
    });
    socket.on("disconnect", function () {
        console.log("disconnected socket " + socket.id);
        shared_1.shared.onlineUsers = shared_1.shared.onlineUsers.filter(function (user) { return user.socketId !== socket.id; });
    });
});
