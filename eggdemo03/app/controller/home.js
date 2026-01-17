// app/controller/home.js
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;

    // 验证 loadToApp：访问 app.model.user
    const modelInfo = app.model.user.getInfo();

    // 验证 loadToContext：访问 ctx.repository.user
    const repoInfo = ctx.repository.user.findById(123);

    ctx.body = {
      loadFile: '✅ 已在启动日志中打印配置',
      loadToApp: modelInfo,
      loadToContext: repoInfo,
    };
  }
}

module.exports = HomeController;