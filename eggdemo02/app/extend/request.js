// app/extend/request.js
module.exports = {
    get foo() {
        return this.get('x-request-foo') || '默认值（未传 x-request-foo 请求头）';
    },
};