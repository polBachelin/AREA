"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaModelSchema = void 0;
const mongoose_1 = require("mongoose");
const Action_1 = require("./Action");
const Reaction_1 = require("./Reaction");
exports.AreaModelSchema = new mongoose_1.Schema({
    _name: { type: String, unique: true, required: true },
    _status: Boolean,
    _action: [Action_1.ActionSchema],
    _reaction: [Reaction_1.ReactionSchema],
});
const AreaModel = (0, mongoose_1.model)('Area', exports.AreaModelSchema);
exports.default = AreaModel;
//# sourceMappingURL=Area.js.map