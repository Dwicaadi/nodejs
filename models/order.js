import { Sequelize } from "sequelize";
import db from "../config/config.js";
import User from "./user.js";
import Product from "./product.js";

const { DataTypes } = Sequelize;
const Order = db.define(
  "Order", 
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    customerId: {
        type: DataTypes.INTEGER,
    },
    productId: {
        type: DataTypes.INTEGER,
    },
    customerName: {
        type: DataTypes.STRING,
    },
    customerPhone: {
        type: DataTypes.STRING,
    },
    quantity: {
        type: DataTypes.INTEGER,
    },
    status: {
        type: DataTypes.STRING,
    },
    date: {
        type: DataTypes.DATE,
    },
    revenue: {
        type: DataTypes.DECIMAL,
    },

  },
  {
    freezeTableName: true,
  }
);

//relasi
const initAssociations = () => {
  Order.belongsTo(User, {foreignKey: 'customerId', as: 'customer'});
  Order.belongsTo(Product, {foreignKey: 'productId', as: 'product'});
  Product.hasMany(Order, {foreignKey: 'productId', as: 'orders'});
};

//untuk memastikan relasi terbentuk setelah semua model diimpor
setTimeout(initAssociations, 0);

export default Order;