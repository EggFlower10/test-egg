const { Service } = require('egg');

// 模拟内存缓存
let memoryCache = {};
// 模拟远程数据源的数据
let remoteData = { foo: 'bar', count: 0 };

class SourceService extends Service {
    get(key) {
        return memoryCache[key];
    }

    // 模拟检查远程数据是否更新
    async checkUpdate() {
        // 这里用随机数模拟数据变化，方便测试
        const isUpdated = Math.random() > 0.7;
        if (isUpdated) {
            remoteData.count += 1;
        }
        this.ctx.logger.info('check update response: %s', isUpdated);
        return isUpdated;
    }

    // 模拟从远程拉取数据并更新缓存
    async update() {
        memoryCache = { ...remoteData };
        this.ctx.logger.info('update memory cache from remote: %j', memoryCache);
    }
}

module.exports = SourceService;