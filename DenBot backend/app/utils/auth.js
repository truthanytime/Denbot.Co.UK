const jwt = require("jsonwebtoken");
const { UserModel } = require("../models");

export const generateAccessToken = (data) => {
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);
};

export const authenticateToken = (req, res, next) => {
    // Gather the jwt access token from the request header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    console.log('token:', token);

    if (token == null) return res.sendStatus(401); // if there isn't any token

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        const userData = await UserModel.findById(user.id).lean();
        if (userData) {
            req.user = {
                ...user,
                sessions: userData.sessions,
                name: userData.name,
            };
            console.log(userData);
            next(); // pass the execution off to whatever request the client intended
        } else {
            console.log('Auth Failed:');
        }
    });
}

