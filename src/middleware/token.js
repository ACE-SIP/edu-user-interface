requireLogin = (req, res, next)=> {
    if (req.session.token && req.session.userId) {
        return next();
    } else {
        res.render('login', {
            title: 'Login',
            message: 'Thanks!.',
        });
    }
};
module.exports = requireLogin;
