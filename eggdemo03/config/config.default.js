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
  config.keys = appInfo.name + '_1768640457064_3984';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.customLoader = {
    // 在 app 对象上定义的属性名为 app.adapter
    model: {
      // 路径相对于 app.config.baseDir
      directory: 'app/model',
      // 如果用于 ctx，则应该使用 loadToContext 方法
      inject: 'app',
      // 是否加载框架和插件的目录
      loadunit: false,
      // 也可以定义其他 LoaderOptions
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
