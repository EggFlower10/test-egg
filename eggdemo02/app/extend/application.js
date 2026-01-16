// app/extend/application.js
const BAR = Symbol('Application#bar');

module.exports = {
    // 方法扩展：给 app 加一个 foo 方法
    foo(param) {
        return `调用了 app.foo，参数是：${param}`;
    },

    // 属性扩展：给 app 加一个带缓存的 bar 属性
    get bar() {
        if (!this[BAR]) {
            // 这里模拟从配置读取值并计算
            this[BAR] = this.config.xname + this.config.yname;
        }
        return this[BAR];
    },
};