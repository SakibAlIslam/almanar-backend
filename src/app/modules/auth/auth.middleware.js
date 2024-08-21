const jwt = require('jsonwebtoken'); // Import jsonwebtoken library from node_modules

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization']; // Get the token from the headers of the request what front end send.
    if (!token) {
        return res.status(403).send({ message: 'No token provided!' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized!' });
        }
        req.userId = decoded.id;
        next();
    });
};