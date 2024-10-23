const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true }, // Renamed from 'name' to 'username'
  password: { type: String, required: true }, // Added password field
  email: { type: String, required: true, unique: true }, // Remains the same
  createdAt: { type: Date, default: Date.now } // Updated to match the new data structure
}, 
{  versionKey: false,collection: "user" });

const User = mongoose.model('User', userSchema);

module.exports = User;
