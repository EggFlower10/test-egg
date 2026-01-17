// app.js
'use strict';

const assert = require('assert');

module.exports = app => {
    // 配置静态资源中间件的参数
    app.config.myStatic = {
        dir: app.baseDir + '/public', // 静态资源目录
        prefix: '/myStatic/', // 访问前缀
    };

    // 将 static 中间件插入到 bodyParser 之前
    const index = app.config.coreMiddleware.indexOf('bodyParser');
    assert(index >= 0, 'bodyParser 中间件必须存在');
    app.config.coreMiddleware.splice(index, 0, 'myStatic');
};