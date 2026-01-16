import { defineConfigFactory, type PartialEggConfig } from 'egg';

// config/config.default.ts
export default defineConfigFactory((appInfo) => {
  const config = {} as PartialEggConfig;

  // 原有配置
  config.keys = appInfo.name + '_${keys}';
  config.middleware = [] as string[];
  config.multipart = {
    mode: 'file' as const,
  };

  // 数据库配置
  config.mysql = {
    password: 'encrypted_123456',
  };

  // 队列配置
  config.queue = {
    concurrency: 10,
  };

  // ✅ 修复：统一控制所有进程的控制台日志级别（v4.x 支持）
  config.logger = {
    consoleLevel: 'DEBUG', // 确保所有级别日志都输出到控制台
  };

  // ✅ 修复：bizConfig 保留
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  return {
    ...config,
    bizConfig,
  };
});