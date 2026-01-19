// some-client/index.js
const APIClientBase = require('cluster-client').APIClientBase;
const RegistryClient = require('../registry_client');

class APIClient extends APIClientBase {
    get DataClient() {
        return RegistryClient;
    }

    get clusterOptions() {
        return { responseTimeout: 120 * 1000 };
    }

    constructor(options) {
        super(options);
        this._cache = {};
        const subMap = options.subMap || {};

        // 初始化订阅
        for (const key in subMap) {
            this.subscribe(subMap[key], (value) => {
                console.log('🔑 缓存赋值：', key, value); // 验证 key 和 value
                this._cache[key] = value;
            });
        }
    }

    subscribe(reg, listener) {
        this._client.subscribe(reg, listener);
    }

    publish(reg) {
        this._client.publish(reg);
    }

    get(key) {
        console.log('🔍 当前缓存：', this._cache); // 验证缓存内容
        return this._cache[key];
    }
}

module.exports = APIClient;