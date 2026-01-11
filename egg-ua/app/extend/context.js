// egg-ua/app/extend/context.js
// 扩展Egg的ctx对象，添加ctx.getUA()方法
module.exports = {
    getUA() {
        // 从请求头中获取User-Agent，解析设备/浏览器信息
        const userAgent = this.headers['user-agent'] || '';
        return {
            isMobile: /mobile/i.test(userAgent),
            browser: userAgent.includes('Chrome') ? 'Chrome' : 'Other'
        };
    }
};