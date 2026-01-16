// app/extend/response.js
module.exports = {
    // 👉 带强过滤的 setter：彻底清除所有非法字符
    set foo(value) {
        // 正则匹配并移除所有控制字符（换行、回车、制表符等）
        const safeValue = String(value).replace(/[\r\n\t\x00-\x1F\x7F]/g, '');
        this.set('x-response-foo', safeValue);
    },

    // 👉 getter：获取响应头值
    get foo() {
        return this.get('x-response-foo') || '未设置 x-response-foo 响应头';
    },
};