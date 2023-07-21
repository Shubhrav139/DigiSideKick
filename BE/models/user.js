const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        contact: { type: Number },
        email: { type: String, required: true },
        password: { type: String, required: true },
    }
);

// hash the password
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;