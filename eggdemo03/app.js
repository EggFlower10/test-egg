// app.js
const path = require('path');

module.exports = (app) => {
    // 使用 loadFile 加载 app/xx.js
    app.loader.loadFile(path.join(app.config.baseDir, 'app/applocal.js'));

    // 2. loadToApp 示例：加载 app/model 到 app.model
    // const modelDir = path.join(app.config.baseDir, 'app/model');
    // app.loader.loadToApp(modelDir, 'model', {
    //     initializer: (Model, opt) => {
    //         // 初始化时传入 app 实例
    //         return new Model(app);
    //     },
    // });

    // 3. loadToContext 示例：加载 app/repository 到 ctx.repository
    const repoDir = path.join(app.config.baseDir, 'app/repository');
    app.loader.loadToContext(repoDir, 'repository', {
        call: true, // 懒加载时自动实例化
        initializer: (Repository, opt) => {
            // 初始化时传入 ctx 实例
            return new Repository(opt.ctx);
        },
    });
};