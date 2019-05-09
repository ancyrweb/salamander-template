import config from "./config/config";

module.exports = {
  ...config.orm,
  type: config.parameters.DATABASE_TYPE,
  host: config.parameters.DATABASE_HOST,
  port: config.parameters.DATABASE_PORT,
  username: config.parameters.DATABASE_USERNAME,
  password: config.parameters.DATABASE_PASSWORD,
  database: config.parameters.DATABASE_NAME,
};