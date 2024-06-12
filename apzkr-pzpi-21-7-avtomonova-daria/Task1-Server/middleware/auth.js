const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const tokenHeader = req.header('Authorization');
    if (!tokenHeader || !tokenHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    const token = tokenHeader.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = auth;
