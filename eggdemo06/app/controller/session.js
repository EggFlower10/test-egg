/* app/controller/session.js */
const Controller = require('egg').Controller;

class SessionController extends Controller {
    // 1. 设置Session（模拟用户登录，存储用户信息）
    async setUser() {
        const { ctx } = this;
        // 从请求参数获取用户信息（实际项目中从登录表单/参数获取）
        const { userId, username } = ctx.query;

        // 参数校验
        if (!userId || !username) {
            ctx.body = { success: false, message: '缺少userId或username参数' };
            return;
        }

        // ✅ 正确用法：设置Session字段
        ctx.session.userId = userId;       // 存储用户ID
        ctx.session.username = username;   // 存储用户名
        // 统计访问次数（每次请求自增）
        ctx.session.visitCount = ctx.session.visitCount ? ctx.session.visitCount + 1 : 1;

        // ❌ 错误示例（仅演示，实际不要写）：
        // ctx.session._visitCount = 1; // 以_开头，下次请求丢失
        // ctx.session.isNew = 'test';  // 内部关键字，禁止修改

        // 返回结果
        ctx.body = {
            success: true,
            message: 'Session设置成功',
            data: {
                userId: ctx.session.userId,
                username: ctx.session.username,
                visitCount: ctx.session.visitCount,
            },
        };
    }

    // 2. 获取Session（读取当前用户信息）
    async getUser() {
        const { ctx } = this;
        // 读取Session中的用户信息
        const userInfo = {
            userId: ctx.session.userId,
            username: ctx.session.username,
            visitCount: ctx.session.visitCount || 0,
        };

        ctx.body = {
            success: true,
            message: '获取Session成功',
            data: userInfo,
        };
    }

    // 3. 删除Session（模拟用户退出登录）
    async clearUser() {
        const { ctx } = this;
        // 清空整个Session（核心操作：赋值为null）
        ctx.session = null;

        ctx.body = {
            success: true,
            message: 'Session已清空（退出登录）',
        };
    }
}

module.exports = SessionController;