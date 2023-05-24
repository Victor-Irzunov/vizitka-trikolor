const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

const Service = sequelize.define('services', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tel1: {
    type: DataTypes.STRING,
  },
  tel2: {
    type: DataTypes.STRING,
  },
  rezhim1: {
    type: DataTypes.STRING,
  },
  rezhim2: {
    type: DataTypes.STRING,
  },
  h1: {
    type: DataTypes.STRING,
  },
  h1_2: {
    type: DataTypes.STRING,
  },
  h2: {
    type: DataTypes.STRING,
  },
  h3: {
    type: DataTypes.STRING,
  },
  h4: {
    type: DataTypes.STRING,
  },
  list: {
    type: DataTypes.TEXT,
  },
  h5: {
    type: DataTypes.STRING,
  },
  h6: {
    type: DataTypes.STRING,
  },
  p: {
    type: DataTypes.STRING,
  },
  data: {
    type: DataTypes.TEXT,
  },
  contact: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  img: {
    type: DataTypes.STRING,
  },
  alt: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.TEXT,
  },
});

module.exports = { User, Service }
