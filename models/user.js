import { Sequelize } from "sequelize";
import db from "../config/config.js";
const { DataTypes } = Sequelize;

const User = db.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    role: {
        type: Sequelize.ENUM('member', 'admin'),
        defaultValue: 'member',
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
  },
  {
    freezeTableName: true,
  }
);

export default User;