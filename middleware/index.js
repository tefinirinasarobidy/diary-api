const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) return res.status(403).send("Access denied.");
        jwt.verify(token.split(' ')[1], process.env.JWT_KEY, (err, client) => {
            if (err) {
              return res.status(403).json({ message: 'Invalid token',err });
            }
            req.user = client;
            next();
        })
    } catch (error) {
        res.status(500).send(error);
    }
};