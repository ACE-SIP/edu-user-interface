const jwt = require('jsonwebtoken');
const User = require('../model/User');
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({'_id': decoded._id,
            'tokens.token': token});
        if (!user) {
            throw new Error();
        }
        // add user && token to req
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send('[Authenticate Error]');
    }
};
module.exports = auth;
