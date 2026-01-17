// app/controller/test.js
const Controller = require('egg').Controller;

class TestController extends Controller {
    async index() {
        const { ctx } = this;
        // 使用扩展的 Context 方法
        ctx.success({
            ip: ctx.clientIP,
            currentTime: ctx.helper.formatTime(new Date()),
        });
    }
}

module.exports = TestController;