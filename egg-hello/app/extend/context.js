// app/extend/context.js
// 扩展 Context 类，添加获取客户端 IP 的便捷方法
module.exports = {
    get clientIP() {
        // 优先取反向代理后的真实 IP
        return this.request.headers['x-real-ip'] || this.request.ip;
    },
    // 自定义通用响应方法
    success(data = {}, msg = '操作成功') {
        this.body = {
            code: 200,
            msg,
            data,
        };
        this.status = 200;
    },
};

