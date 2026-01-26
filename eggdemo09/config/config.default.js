/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {

  };
  // 加载 errorHandler 中间件
  config.middleware = ['errorHandler'];
  // 只对以 /api 为前缀的 URL 路径生效
  config.errorHandler = {
    match: '/api',
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1769420850530_8273';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    mysql: {
      client: {
        host: '127.0.0.1', // 你的 MySQL 地址
        port: '3306', // 端口
        user: 'root', // 用户名
        password: '123456', // 密码
        database: 'test', // 要连接的数据库名
      },
      app: true,
      agent: false,
    },
  };
  exports.security = {
    csrf: {
      enable: false,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
