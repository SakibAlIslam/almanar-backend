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
