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
  config.keys = appInfo.name + '_1768812625907_2845';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    apiClient: {
      subMap: {
        foo: { dataId: 'foo' },
        bar: { dataId: 'bar' }
      }
    }
  };
  return {
    ...config,
    ...userConfig,
  };
};
