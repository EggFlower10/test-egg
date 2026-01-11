// egg-ua/test/ua.test.js
const { app, mock, assert } = require('egg-mock/bootstrap');

describe('test/ua.test.js', () => {
    it('should get UA info', async () => {
        // 模拟请求头的User-Agent
        const res = await app.httpRequest()
            .get('/')
            .set('User-Agent', 'Mozilla/5.0 (iPhone; ...) Chrome/100.0.0.0 Mobile Safari/537.36');

        // 验证ctx.getUA()的返回结果
        assert(res.body.isMobile === true);
        assert(res.body.browser === 'Chrome');
    });
});