'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.INTEGER,
    }, {});
    User.associate = function (models) {
        // associations can be defined here
    };
    User.encryptPassword = function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };
    User.validPassword = function (password, hash) {
        return bcrypt.compareSync(password, hash);
    };
    return User;
};