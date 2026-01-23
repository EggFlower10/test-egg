const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const data = ctx.service.source.get('foo');
    const count = ctx.service.source.get('count');
    ctx.body = {
      data,
      count,
      lastUpdateBy: ctx.app.lastUpdateBy || 'none',
    };
  }
}

module.exports = HomeController;
