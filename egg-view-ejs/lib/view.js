const ejs = require('ejs');

// 实现 Egg 要求的 View 基类（必须有 render/renderString 方法）
module.exports = class EjsView {
    // 构造函数：Egg 会自动传入 ctx 和插件配置
    constructor(ctx) {
        this.ctx = ctx;
        this.app = ctx.app;
        // 合并插件默认配置 + 项目自定义配置
        this.config = ctx.app.config.ejs || {};
    }

    /**
     * 渲染模板文件
     * @param {string} filename 模板文件的完整路径（Egg 已确认文件存在）
     * @param {object} locals 渲染数据（包含 ctx、helper 等内置对象）
     * @param {object} viewOptions 单次渲染的临时配置（覆盖默认配置）
     * @returns {Promise<string>} 渲染后的 HTML 字符串
     */
    render(filename, locals, viewOptions) {
        // 合并配置：默认配置 < 临时配置 < 文件名（必传）
        const config = Object.assign({}, this.config, viewOptions, { filename });

        return new Promise((resolve, reject) => {
            // 调用 ejs 的异步渲染文件方法
            ejs.renderFile(filename, locals, config, (err, result) => {
                if (err) {
                    reject(err); // 渲染失败：抛出错误
                } else {
                    resolve(result); // 渲染成功：返回 HTML
                }
            });
        });
    }

    /**
     * 渲染模板字符串（无需文件）
     * @param {string} tpl 模板字符串
     * @param {object} locals 渲染数据
     * @param {object} viewOptions 临时配置
     * @returns {Promise<string>} 渲染后的 HTML 字符串
     */
    renderString(tpl, locals, viewOptions) {
        const config = Object.assign({}, this.config, viewOptions, { cache: null });
        try {
            // ejs.render 是同步方法，包装成 Promise 符合 Egg 规范
            return Promise.resolve(ejs.render(tpl, locals, config));
        } catch (err) {
            return Promise.reject(err);
        }
    }
};