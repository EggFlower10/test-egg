// app/model/user.js
module.exports = class UserModel {
    constructor(app) {
        this.app = app;
    }

    getInfo() {
        return { id: 1, name: 'Egg Loader Demo' };
    }
};