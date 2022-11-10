const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Please Enter your email!'],
        trim: true,
        lowercase: true,
        validate(value) {
            if ( !validator.isEmail(value)) {
                throw new Error(' Email is invalid !');
            }
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [7, 'Password is too short!'],
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"');
            }
        },
    },
    username: {
        type: String,
        unique: false,
        default: 'learner',
        trim: true
    },
    role: {
        type: String,
        default: 'learner',
        enum: ['issuer', 'learner', 'verifier'],
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        },
    }],
    status: {
        type: String,
        default: 'Created',
        enum: ['Created', 'Expired', 'Deleted'],
    },
}, {
    timestamps: true,
});

UserSchema.methods.toJSON = function() {
    const user = this;
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.tokens;
    return userObj;
};

UserSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, process.env.SECRET_KEY,
        {expiresIn: '1 days'});
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
};

// Class statics method
UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if (!user) {
        throw new Error('Unable to Login');
    }
    // validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to Login');
    }
    return user;
};

// need standard function not arrow function
// encrypt the password
UserSchema.pre('save', async function(next) {
    // this access to individual user
    // const user = this;
    const user = this;
    // middleware, encrypt password before save data
    if (user.isModified('password')) {
        // add sault ensure strong encryption
        const sault = bcrypt.genSaltSync(10) + new Date().getTime();
        user.password = await bcrypt.hash(user.password, sault);
    }
    // but the user object, we can only get once time.
    next();
});


const User = mongoose.model('User', UserSchema);
module.exports = exports = User;
