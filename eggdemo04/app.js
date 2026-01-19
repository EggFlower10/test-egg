// // app/app.js

// app/app.js
const APIClient = require('./some-client/index');

module.exports = (app) => {
    app.apiClient = new APIClient(
        Object.assign({}, app.config.apiClient, { cluster: app.cluster })
    );

    app.beforeStart(async () => {
        await app.apiClient.ready();
        app.coreLogger.info('✅ APIClient 已就绪');
        console.log('APIClient 已就绪');
        app.apiClient.subscribe({ dataId: 'foo' }, (value) => {
            app.coreLogger.info('📥 收到 foo 数据：', value);
            console.log('🔑收到 foo 数据：', value);
            const fooData = app.apiClient.get('foo');
            app.coreLogger.info('🔑 缓存 foo 数据：', fooData);
            console.log('🔑 缓存 foo 数据：', fooData);
        });
        // 测试发布
        app.apiClient.publish({
            dataId: 'foo',
            publishData: 'http://localhost:7001/foo'
        });

        // 测试缓存读取
        // const fooData = app.apiClient.get('foo');
        // app.coreLogger.info('🔑 缓存 foo 数据：', fooData);
        // console.log('🔑 缓存 foo 数据：', fooData);
    });
};
// const RegistryClient = require('./registry_client');

// module.exports = (app) => {
//     // 用 cluster 封装 RegistryClient
//     app.registryClient = app.cluster(RegistryClient).create({});
//     console.log('🔍 app.js 已加载！');
//     app.beforeStart(async () => {
//         try {
//             await app.registryClient.ready();
//             app.coreLogger.info('✅ 注册客户端已就绪（App 进程）');
//             console.log('注册客户端已就绪（App 进程）');

//             // 后续订阅/发布/获取配置代码
//         } catch (err) {
//             app.coreLogger.error('❌ App 客户端初始化失败：', err);
//             console.error('❌ App 客户端初始化失败：', err); // 直接输出到终端
//             console.log(' App 客户端初始化失败：', err);

//         }
//         // 1. 订阅数据
//         app.registryClient.subscribe(
//             { dataId: 'demo.DemoService' },
//             (val) => {
//                 app.coreLogger.info('📥 收到订阅数据：', val);
//                 console.log('收到订阅数据：', val);
//             }
//         );

//         // 2. 发布数据
//         app.registryClient.publish({
//             dataId: 'demo.DemoService',
//             publishData: 'http://localhost:7001/demo'
//         });

//         // 3. 获取配置
//         const res = await app.registryClient.getConfig('demo.DemoService');
//         app.coreLogger.info('🔍 获取配置结果：', res);
//         console.log('获取配置结果：', res);
//     });
// };