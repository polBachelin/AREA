"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ReactionSchema = new mongoose_1.Schema({
    _name: { type: String, unique: true, required: true },
    _serviceId: { type: Number, required: true },
    _reactionId: { type: Number, required: true },
});
const ReactionModel = (0, mongoose_1.model)('Reaction', exports.ReactionSchema);
exports.default = ReactionModel;
