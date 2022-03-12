const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: String,
    password: String
},
{ timestamps: true });

const UserDB = mongoose.model.bidstackeruser || mongoose.model('bidstackeruser', UserSchema);    
module.exports = UserDB;