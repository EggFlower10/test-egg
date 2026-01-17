// app/middleware/static.js
'use strict';

const staticCache = require('koa-static-cache');
const assert = require('assert');
const mkdirp = require('mkdirp');

module.exports = (options, app) => {
    // 校验配置必填项
    assert.strictEqual(
        typeof options.dir,
        'string',
        'Must set `app.config.static.dir` when static plugin enable'
    );

    // 确保静态资源目录存在
    mkdirp.sync(options.dir);

    // 打印启动日志
    app.loggers.coreLogger.info(
        '[egg-static] starting static serve %s -> %s',
        options.prefix,
        options.dir
    );

    // 返回 koa-static-cache 中间件
    return staticCache({
        dir: options.dir,
        prefix: options.prefix,
        dynamic: true, // 动态加载文件
        cacheControl: 'max-age=3600',
    });
};