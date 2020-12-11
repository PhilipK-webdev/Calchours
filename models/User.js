// const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define("User", {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validtae: {
                [Op.iRegexp]: '^[h|a|t]',
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idnumber: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                len: [3, 9]
            }
        }
    });
    User.associate = (models) => {
        User.hasMany(models.Month, {
            onDelete: "cascade",
        });
    };

    return User;
};
