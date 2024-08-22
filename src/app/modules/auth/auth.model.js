const prisma = require('../../../config/database'); // Import prisma client

const { user } = prisma;

exports.createUser = async (userData) => {
    return user.create({ data: userData });
};

exports.findUserByEmail = async (email) => {
    return user.findUnique({ where: { email } });
};

exports.findUserByMobile = async (mobileNo) => {
    return user.findUnique({ where: { mobileNo } });
};

// Function to update the rememberMe field in the database
exports.updateUserRememberMe = async (userId, rememberMe) => {
    await user.update({
        where: { id: userId },
        data: { rememberMe },
    });
};

// Function to update the password field in the database
exports.updatePassword = async (userId, hashedPassword) => {
    await user.update({
        where: { id: userId },
        data: { password: hashedPassword },
    });
};