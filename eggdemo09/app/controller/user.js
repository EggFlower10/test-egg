const Controller = require('egg').Controller;

class UserController extends Controller {
  // 获取用户列表
  async index() {
    const { ctx } = this;
    const users = await ctx.service.user.list();
    ctx.body = {
      code: 200,
      data: users,
    };
  }

  // 新增用户
  async create() {
    const { ctx } = this;
    const user = ctx.request.body;
    const result = await ctx.service.user.add(user);
    ctx.body = {
      code: 200,
      data: result,
    };
  }

  // 更新用户
  async update() {
    const { ctx } = this;
    const { id } = ctx.params;
    const user = ctx.request.body;
    const result = await ctx.service.user.update(id, user);
    ctx.body = {
      code: 200,
      data: result,
    };
  }

  // 删除用户
  async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;
    const result = await ctx.service.user.delete(id);
    ctx.body = {
      code: 200,
      data: result,
    };
  }
}

module.exports = UserController;
