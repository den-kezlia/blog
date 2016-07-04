var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    login: String,
    name: String,
    password: String
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(passwrod) {
    return bcrypt.compareSync(passwrod, this.password);
};

module.exports = mongoose.model('User', userSchema);