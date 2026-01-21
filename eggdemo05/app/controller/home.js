const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hello world';
  }

  async user() {
    const { name } = this.ctx.query;
    const user = await this.ctx.service.user.get(name);
    if (!user) {
      this.ctx.status = 404;
      this.ctx.body = 'User not found';
      return;
    }
    this.ctx.body = user;
  }

}

module.exports = HomeController;
