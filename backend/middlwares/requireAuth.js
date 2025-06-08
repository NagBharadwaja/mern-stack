const jwt = require("jsonwebtoken");
const { EndUser } = require("../models/user.model");

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "Authorization is required!"});
    }

    const token = authorization.split(" ")[1];

    try {
        const { _id } = jwt.verify(token, process.env.AUTH_SECRET);
        req.user = await EndUser.findOne({ _id }).select('_id')
        next();
    } catch(error) {
        console.log(error);
        return res.status(401).json({ error: "Request is not authorized!" });
    }
}

module.exports = { requireAuth };