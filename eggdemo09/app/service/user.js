const Service = require('egg').Service;

class UserService extends Service {
  // 查询用户列表
  async list() {
    return await this.app.mysql.select('users');
  }

  // 新增用户
  async add(user) {
    return await this.app.mysql.insert('users', user);
  }

  // 更新用户
  async update(id, user) {
    return await this.app.mysql.update('users', user, {
      where: { id },
    });
  }

  // 删除用户
  async delete(id) {
    return await this.app.mysql.delete('users', { id });
  }
}

module.exports = UserService;
