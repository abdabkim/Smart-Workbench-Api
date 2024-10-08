const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const authenticate = async (req,res,next) => {

    try {
        const authorization = req.headers.authorization;
        
        if (!authorization) {
            res.status(400);
            throw new Error("No token detected");
        }

        if (!authorization.startsWith("Bearer")) {
            res.status(400);
            throw new Error("Bearer not detected");
        }

        const token = authorization.split(" ")[1];

        if (!jwt.verify(token, process.env.JWT_SECRET_TOKEN)) {
            res.status(400);
            throw new Error("Not valid token");
        }


        const decodedToken = jwt.decode(token);

        req.id = decodedToken.id;
        next();

    } catch (error) {
        next(error.message);
    }

    
}

module.exports = authenticate;