import jwt from 'jsonwebtoken';
import User from '../db/models/User.js';

async function createUser(email, password, avatarURL) {
    const user = await User.create({ email, password, avatarURL });
    return user;
}

async function getUserById(userId) {
    return await User.findByPk(userId);
}

async function getUserByEmail(email) {
    return await User.findOne({ where: { email } });
}

function generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
}

function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

async function updateUserToken(userId, token) {
    return await User.update({ token }, { where: { id: userId } });
}

async function updateUserAvatar(userId, avatarURL) {
    return await User.update({ avatarURL }, { where: { id: userId } });
}

export default {
    createUser,
    getUserById,
    getUserByEmail,
    generateToken,
    verifyToken,
    updateUserToken,
    updateUserAvatar,
};