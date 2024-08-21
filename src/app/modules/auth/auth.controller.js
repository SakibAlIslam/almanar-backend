//import files/libraries
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authModel = require('./auth.model');

//destructure the functions from the libraries
const { hash, compare } = bcrypt;
const { sign } = jwt;
const { createUser, findUserByMobile } = authModel;

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

        const token = sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: rememberMe ? '7d' : '1d',
        });

        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
};
