const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userId: String,
    email: String,
    likes: [String]
});
module.exports = mongoose.model('User', UserSchema, 'bonsai-users')
