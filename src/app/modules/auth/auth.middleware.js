const jwt = require('jsonwebtoken'); // Import jsonwebtoken library from node_modules

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization']; // Get the token from the headers of the request what front end send.
    if (!token) {
        return res.status(403).send({ message: 'No token provided!' });
    }
    const newToken = token.split(' ')[1]; // Split the token to remove Bearer and get the second part of the token

    jwt.verify(newToken, process.env.JWT_SECRET, (err, decoded) => {
        console.log('newToken', newToken);
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).send({ message: 'Token expired!' });
            }
            return res.status(401).send({ message: 'Unauthorized!' });
        }
        req.userId = decoded.id;
        next();
    });
};