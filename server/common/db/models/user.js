var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true,
        trim: true,
        require: true
    },
    name: {
        type: String,
        trim: true,
        require: true
    },
    email: {
        type: String,
        trim: true,
        require: true
    }
});

UserSchema.path('username').required(true, 'username error');
UserSchema.path('name').required(true, 'name error');
UserSchema.path('email').required(true, 'email error');

module.exports = mongoose.model('User', UserSchema);
