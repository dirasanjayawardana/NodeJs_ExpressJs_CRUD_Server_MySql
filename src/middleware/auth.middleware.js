const { JWT_SECRET } = require("../configs/env.config");
const jwt = require("jsonwebtoken");

//=== middleware digunakan untuk melakukan filtering antara request dengan response, yg diletakkan antara router dengan constroller
module.exports = {
    authMiddleware: (req, res, next) => {
        try {
            const { authorization } = req.headers;
            const token = authorization.slice(7);
            jwt.verify(token, JWT_SECRET);
            next();
        } catch (error) {
            console.log(error);
            return res.status(403).json({error});
        }
    },
};
