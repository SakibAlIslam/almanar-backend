//import files/libraries
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authModel = require('./auth.model');
const prisma = require('../../../config/database');

//destructure the functions from the libraries
const { hash, compare } = bcrypt;
const { sign } = jwt;
const { createUser, findUserByMobile } = authModel;
const { user } = prisma;

// Function to update the rememberMe field in the database
const updateUserRememberMe = async (userId, rememberMe) => {
    await user.update({
        where: { id: userId },
        data: { rememberMe },
    });
};

exports.register = async (req, res, next) => {
    const { firstName, lastName, mobileNo, email, password, rememberMe } = req.body;
    try {
        const hashedPassword = await hash(password, 10);
        const user = await createUser({
            firstName,
            lastName,
            mobileNo,
            email,
            password: hashedPassword,
            rememberMe: rememberMe || false,
        });
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    const { mobileNo, password, rememberMe } = req.body;

    try {
        const user = await findUserByMobile(mobileNo);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Update rememberMe status in the database
        await updateUserRememberMe(user.id, rememberMe);

        const token = sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: rememberMe ? '7d' : '1d',
        });

        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
};

exports.changePassword = async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const {userId} = req;

    try {
        const user = await user.findUnique({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const hashedPassword = await hash(newPassword, 10);
        await user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        next(error);
    }
};