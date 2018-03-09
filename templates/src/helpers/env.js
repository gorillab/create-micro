const getEnv = () => process.env.NODE_ENV;

const isDevelopment = () => !getEnv();

const isTesting = () => getEnv() === 'testing';

const isProduction = () => getEnv() === 'production';

module.exports = {
  getEnv,
  isDevelopment,
  isTesting,
  isProduction,
};
