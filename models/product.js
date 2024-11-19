import { DataTypes } from "sequelize";
import db from "../config/config.js";

const Product = db.define(
  "Product", 
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
    },
    price: {
        type: DataTypes.INTEGER,
    },
    image: {
        type: DataTypes.STRING,
    }
  },
  {
    freezeTableName: true,
  }
);

export default Product;