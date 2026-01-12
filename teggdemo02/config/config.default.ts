import { defineConfigFactory, type PartialEggConfig } from 'egg';

export default defineConfigFactory((appInfo) => {
  const config = {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_{{keys}}',

    // add your egg config in here
    middleware: [] as string[],

    // change multipart mode to file
    // @see https://github.com/eggjs/multipart/blob/master/src/config/config.default.ts#L104
    multipart: {
      mode: 'file' as const,
    },
  } as PartialEggConfig;

  // add your special config in here
  // Usage: `app.config.bizConfig.sourceUrl`
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  config.cors = {
    origin: '*', // 开发环境允许所有域名（生产环境需指定具体前端域名，比如'http://127.0.0.1:5500'）
    allowMethods: 'GET,POST,PUT,DELETE', // 允许的请求方法
    allowHeaders: 'Content-Type,X-Custom' // 允许的请求头（包含你用的X-Custom）
  };
  config.security = {
    csrf: {
      enable: false, // 生产环境需开启并配置白名单
    },
  };
  // the return config will combines to EggAppConfig
  return {
    ...config,
    bizConfig,
  };
});
