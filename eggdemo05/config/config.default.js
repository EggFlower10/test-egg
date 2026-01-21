/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1768988865565_809';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.cluster = {
    listen: {
      port: 7001, // 默认端口，脚本传的 port 优先级更高
      hostname: '127.0.0.1', // 仅允许本机访问；如果需要外网访问，改为 '0.0.0.0'（注意安全风险）
      // path: '/var/run/egg.sock', // 用 socket 文件访问（可选，一般不用）
    },
  };

  config.alinode = {
    // 从 `Node.js 性能平台` 获取对应的接入参数
    appid: '<YOUR_APPID>',
    secret: '<YOUR_SECRET>',
  };
  return {
    ...config,
    ...userConfig,
  };
};
