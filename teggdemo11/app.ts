import type { Application, ILifecycleBoot } from 'egg';

// 类形式的生命周期钩子（推荐用法）
export default class AppBootHook implements ILifecycleBoot {
    private readonly app: Application;

    // 构造函数接收Egg.js应用实例
    constructor(app: Application) {
        this.app = app;
    }

    /**
     * 插件项目：替代原app.beforeStart（应用项目用willReady）
     * 时机：所有配置和插件加载完成，但应用还未启动
     */
    async didLoad() {
        this.app.logger.info('✅ didLoad 执行：插件配置/加载完成，应用未启动');
        // 这里可以写插件项目的初始化逻辑，比如连接第三方服务的前置检查
    }

    /**
     * 应用项目：替代原app.beforeStart
     * 时机：应用即将就绪（所有插件启动完成，Worker准备启动）
     */
    async willReady() {
        this.app.logger.info('✅ willReady 执行：应用即将就绪，可做业务初始化');
        // 示例：模拟应用初始化逻辑（比如预加载数据、初始化缓存）
        await new Promise(resolve => setTimeout(resolve, 500));
        this.app.logger.info('📌 应用初始化逻辑执行完成');
    }

    /**
     * 替代原app.ready
     * 时机：应用完全就绪，已启动成功，可以处理请求
     */
    async didReady() {
        this.app.logger.info('✅ didReady 执行：应用已启动成功，可处理请求');
        const port = this.app.config.cluster?.listen?.port || 7001;
        this.app.logger.info(`🚀 服务启动成功：http://127.0.0.1:${port}`);
    }
    /**
     * 替代原app.beforeClose
     * 时机：应用即将关闭（比如收到停止信号）
     */
    async beforeClose() {
        this.app.logger.info('✅ beforeClose 执行：应用即将关闭，清理资源');
        // 示例：关闭前的清理逻辑（比如关闭数据库连接、释放端口）
        await new Promise(resolve => setTimeout(resolve, 500));
        this.app.logger.info('🧹 资源清理完成，应用即将退出');
    }
}