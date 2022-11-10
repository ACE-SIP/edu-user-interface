const UserController = require('../controller/UserController');
const auth = require('../middleware/auth');

module.exports = (app) => {
    // add user api route
    app.route('/api/user').patch(UserController.resetPassword); // reset password
    app.route('/api/user').post(UserController.createUser); // create user
    app.route('/api/user/login').post(UserController.login);
    app.route('/api/user/logout').post(auth, UserController.logout);
};
