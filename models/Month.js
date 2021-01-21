module.exports = function (sequelize, DataTypes) {

    const Month = sequelize.define("Month", {
        day: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        month: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        UserIdnumber: { type: DataTypes.INTEGER, allowNull: false },
    });

    Month.associate = (models) => {
        Month.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
            },
        });
    };

    return Month;
}