// app/repository/user.js
module.exports = class UserRepository {
    constructor(ctx) {
        this.ctx = ctx;
    }

    findById(id) {
        return { id, name: `用户${id}`, from: 'repository' };
    }
};