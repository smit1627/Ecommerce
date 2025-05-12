const { Schema, model } = require("mongoose");
// Reusable field config
const commonField = {
    type: String,
    required: true,
    trim: true,
};

// UserSignUp schema
const UserSignUp = new Schema({
    name: commonField,
    password: commonField,
});

// User schema
const User = new Schema({
    name: commonField,
    lastName: commonField,
    email: { ...commonField, unique: true },
    password: commonField,
});

// Models
const UserSignUpModel = model('UserSignUp', UserSignUp);
const UserSchema = model('User', User); // Use 'User' as model name for collection

module.exports = { UserSchema, UserSignUpModel };
