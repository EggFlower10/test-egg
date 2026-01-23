// agent.js

// 模拟一个消息订阅客户端
class Subscriber {
    constructor() {
        this.listeners = {};
        // 模拟每30秒推送一次变更事件
        setInterval(() => {
            this.emit('changed');
        }, 30000);
    }

    on(event, callback) {
        this.listeners[event] = callback;
    }

    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event](data);
        }
    }
}

module.exports = (agent) => {
    const subscriber = new Subscriber();
    // 收到推送后通知所有 worker
    subscriber.on('changed', () => {
        agent.messenger.sendToApp('refresh', 'push');
        agent.logger.info('notify all workers to refresh by push');
    });
};