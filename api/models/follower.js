const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");
const sequelize = require("../database/config");

const Follower = sequelize.define("follower", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Follower;
