"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserEmail = exports.updateUserUsername = exports.updateUserPassword = exports.deleteUser = exports.createUser = void 0;
const mongoose_1 = require("mongoose");
const Area_1 = require("./Area");
const schema = new mongoose_1.Schema({
    _username: { type: String, unique: true, required: true },
    _email: { type: String, unique: true, required: true },
    _password: { type: String, required: true },
    _areas: [Area_1.AreaModelSchema],
});
const UserModel = (0, mongoose_1.model)('User', schema);
exports.default = UserModel;
async function createUser(username, email, password) {
    const user = new UserModel({
        _username: username,
        _email: email,
        _password: password,
        _areas: []
    });
    return user.save();
}
exports.createUser = createUser;
async function deleteUser(email) {
    UserModel.findOneAndDelete({ _email: email });
}
exports.deleteUser = deleteUser;
async function updateUser(email, update) {
    const filter = { _email: email };
    await UserModel.findOneAndUpdate(filter, update);
}
async function updateUserPassword(email, password) {
    const update = { _password: password };
    updateUser(email, update);
}
exports.updateUserPassword = updateUserPassword;
async function updateUserUsername(email, username) {
    const update = { _username: username };
    updateUser(email, update);
}
exports.updateUserUsername = updateUserUsername;
async function updateUserEmail(email, newEmail) {
    const update = { _email: newEmail };
    updateUser(email, update);
}
exports.updateUserEmail = updateUserEmail;
//# sourceMappingURL=User.js.map