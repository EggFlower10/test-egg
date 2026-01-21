const { Service } = require('egg');

class UserService extends Service {
    async get(name) {
        return await userDatabase.get(name);
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


module.exports = UserService;