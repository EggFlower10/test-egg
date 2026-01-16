// app.ts（简化版）
import type { Application, ILifecycleBoot } from 'egg';

export default class AppBootHook implements ILifecycleBoot {
    private readonly app: Application;

    constructor(app: Application) {
        this.app = app;
        console.log(' AppBootHook 已实例化');
    }

    configWillLoad() {
        console.log('configWillLoad: 动态修改配置', this.app.config.keys);
    }

    async didLoad() {
        console.log(' didLoad: 初始化自定义服务');
    }

    async willReady() {
        console.log(' willReady: 预加载缓存数据');
    }

    async didReady() {
        console.log('didReady: 应用启动完毕');
    }

    async serverDidReady() {
        console.log('serverDidReady: HTTP 服务器已启动');
    }
}