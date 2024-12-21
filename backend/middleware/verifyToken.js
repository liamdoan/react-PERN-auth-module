const jwt = require('jsonwebtoken');

module.exports.verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Not authorized, no token found!"
        })
    };

    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

        if(!decodeToken) {
            return res.status(401).json({
                message: "Not authorized, invalid token!"
            })
        };

        req.userId = decodeToken.userId;

        next();
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "server error!"
        });
    }
}
