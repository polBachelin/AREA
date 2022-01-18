"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ActionSchema = new mongoose_1.Schema({
    _name: { type: String, unique: true, required: true },
    _serviceId: { type: Number, required: true },
    _actionId: { type: Number, required: true },
});
const ActionModel = (0, mongoose_1.model)('Action', exports.ActionSchema);
exports.default = ActionModel;
//# sourceMappingURL=Action.js.map