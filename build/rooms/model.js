"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var schema_1 = require("./schema");
exports.RoomModel = mongoose_1.default.model("rooms", schema_1.RoomSchema);
