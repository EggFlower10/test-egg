// Egg 插件的入口文件：注册 ejs 视图引擎
module.exports = app => {
    // 注册 view 引擎：key 是插件名（ejs），值是我们写的 View 类
    app.view.use('ejs', require('./lib/view'));
};