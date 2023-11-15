const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();
console.log(process.env.DB_USERNAME);

const sequelize = new Sequelize({
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
});

export { sequelize };
