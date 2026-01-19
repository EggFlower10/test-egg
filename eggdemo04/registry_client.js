// app/registry_client.js
console.log('🔍 registry_client.js已加载！');
const { parse } = require('node:url');
const { Base } = require('sdk-base');

class RegistryClient extends Base {
    constructor(options) {
        super({ initMethod: 'init' });
        this._options = options;
        this._registered = new Map();
    }

    async init() {
        console.log('🔍 RegistryClient init 方法执行！'); // 加日志验证
        this.ready(true); // 必须调用，否则 ready() 会卡住
    }

    async getConfig(dataId) {
        return this._registered.get(dataId);
    }

    subscribe(reg, listener) {
        const key = reg.dataId;
        this.on(key, listener);

        // 若已有数据，立即触发监听
        const data = this._registered.get(key);
        if (data) {
            process.nextTick(() => listener(data));
        }
    }

    publish(reg) {
        const key = reg.dataId;
        let changed = false;

        if (this._registered.has(key)) {
            const arr = this._registered.get(key);
            if (arr.indexOf(reg.publishData) === -1) {
                changed = true;
                arr.push(reg.publishData);
            }
        } else {
            changed = true;
            this._registered.set(key, [reg.publishData]);
        }

        if (changed) {
            this.emit(key, this._registered.get(key).map(url => parse(url, true)));
        }
    }
}

module.exports = RegistryClient;