// 1. 引入必要的装饰器和类型
import { SingletonProto, Inject } from 'egg';

// 2. 装饰器指定：这是应用级单例Proto，实例名称为mistAdapter
@SingletonProto({ name: 'mistAdapter' })
export class MISTAdapter {
    // 可选：注入其他依赖（比如项目配置）
    @Inject()
    private config: any; // 注入全局配置

    // 3. 构造函数（可选，初始化逻辑）
    constructor() {
        console.log('MISTAdapter单例已创建（应用启动时只执行一次）');
    }

    // 4. 定义Proto提供的业务方法（示例）
    getAdapterConfig() {
        // 调用注入的config，返回适配器配置
        return this.config.mist || { url: '默认地址' };
    }

    // 模拟适配器核心方法
    async request(data: any) {
        return { code: 200, data, msg: 'MIST适配器请求成功' };
    }
}