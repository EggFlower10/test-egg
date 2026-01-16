// app/extend/helper.js
module.exports = {
    // 👉 示例1：格式化时间（常用工具）
    formatTime(date, format = 'YYYY-MM-DD HH:mm:ss') {
        // this.ctx 能拿到当前请求上下文（示例：打印请求路径）
        console.log('当前请求路径：', this.ctx.path);

        // 简单实现时间格式化（实际项目可复用 dayjs 库）
        const d = new Date(date || Date.now());
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hour = String(d.getHours()).padStart(2, '0');
        const minute = String(d.getMinutes()).padStart(2, '0');
        const second = String(d.getSeconds()).padStart(2, '0');

        return format.replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day)
            .replace('HH', hour)
            .replace('mm', minute)
            .replace('ss', second);
    },

    // 👉 示例2：拼接URL参数（文档示例扩展）
    pathFor(path = '', params = {}) {
        // 把参数对象转成 URL 拼接字符串（如 {a:1,b:2} → ?a=1&b=2）
        const queryStr = Object.entries(params)
            .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
            .join('&');
        return queryStr ? `${path}?${queryStr}` : path;
    },

    // 👉 示例3：验证手机号（业务常用）
    isMobile(phone) {
        if (!phone) return false;
        const reg = /^1[3-9]\d{9}$/;
        return reg.test(phone.trim());
    },
};