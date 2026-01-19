// app/agent.js

const RegistryClient = require('./registry_client.js');

module.exports = (agent) => {
    // 用 cluster 封装 RegistryClient

    agent.registryClient = agent.cluster(RegistryClient).create({});

    agent.beforeStart(async () => {
        console.log('🔍 agent.js 已加载！');

        try {
            await agent.registryClient.ready();
            agent.coreLogger.info('✅ 注册客户端已就绪（Agent 进程）');
            console.log('注册客户端已就绪（Agent 进程）');
        } catch (err) {
            agent.coreLogger.error('❌ Agent 客户端初始化失败：', err);
            console.error('❌ Agent 客户端初始化失败：', err); // 直接输出到终端
            console.log('Agent 客户端初始化失败：', err);

        }
    });
};