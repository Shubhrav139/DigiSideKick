const userModel = require('../models/user');

async function createNewUser(data) {
    try {
        if ('name' in data && 'email' in data && 'password' in data) {
            const user = new userModel(data);
            user.password = user.generateHash(data.password);
            const res = await user.save();
            return res;
        } else {
            throw { code: 400, message: 'Request body is malformed' }
        }
    } catch (error) {
        throw error;
    }
}

async function getAllUsers() {
    try {
        const users = await userModel.find();
        return users;
    } catch (error) {
        throw error;
    }
}

async function deleteUser(userId) {
    try {
        const user = await userModel.findByIdAndDelete({ _id: userId });
        return user;
    } catch (error) {
        throw error;
    }
}

async function updateUser(userId, data) {
    try {
        const updatedUser = await userModel.findByIdAndUpdate({ _id: userId }, { $set: data }, { new: true });
        if (data.password) {
            updatedUser.password = updatedUser.generateHash(data.password);
            updatedUser.save();
        }
        return updatedUser;
    } catch (error) {
        throw error;
    }
}


module.exports = { createNewUser, getAllUsers, deleteUser, updateUser };