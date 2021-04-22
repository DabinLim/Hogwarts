const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    nickname: String,
    password: String,
    profile_img: String,
    user_house: String,
    user_wand: String,
    user_patronus: String
});
UserSchema.virtual('userId').get(function () {
    return this._id.toHexString();
});
UserSchema.set('toJSON', {
    virtuals: true,
});
module.exports = mongoose.model('User', UserSchema);