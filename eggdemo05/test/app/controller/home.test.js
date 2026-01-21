const { app, mock, assert } = require('egg-mock/bootstrap');

describe('test/controller/home.test.js', () => {
  describe('GET /', () => {
    it('应该返回状态码为 200 并获取到内容', () => {
      // 对 app 发起 `GET /` 请求
      return app
        .httpRequest()
        .get('/')
        .expect(200) // 期望返回状态码为 200
        .expect('hello world'); // 期望响应内容为 hello world
    });

    it('应该发送多个请求', async () => {
      // 使用 generator function 方式编写测试用例，可以在一个用例中串行发起多次请求
      await app
        .httpRequest()
        .get('/')
        .expect(200) // 期望返回状态码 200
        .expect('hello world'); // 期望响应内容为 hello world

      // 再次请求
      const result = await app
        .httpRequest()
        .get('/')
        .expect(200)
        .expect('hello world');

      // 也可以这样验证
      assert(result.status === 200);
    });
  });

  describe('get lru', () => {
    it('should get an lru and it should work', () => {
      // 设置缓存
      app.lru.set('foo', 'bar');
      // 读取缓存
      assert(app.lru.get('foo') === 'bar');
    });
  });

  describe('isXHR()', () => {
    it('should be true', () => {
      const ctx = app.mockContext({
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
      assert(ctx.isXHR === true);
    });

    it('should be false', () => {
      const ctx = app.mockContext({
        headers: {
          'X-Requested-With': 'SuperAgent',
        },
      });
      assert(ctx.isXHR === false);
    });
  });

  describe('isChrome()', () => {
    it('should be true', () => {
      const ctx = app.mockContext({
        headers: {
          'User-Agent': 'Chrome/56.0.2924.51',
        },
      });
      assert(ctx.request.isChrome === true);
    });

    it('should be false', () => {
      const ctx = app.mockContext({
        headers: {
          'User-Agent': 'FireFox/1',
        },
      });
      assert(ctx.request.isChrome === false);
    });
  });

  describe('isSuccess()', () => {
    it('should return true when status is 200', () => {
      const ctx = app.mockContext();
      ctx.status = 200;
      assert(ctx.response.isSuccess === true);
    });

    it('should return false when status is not 200', () => {
      const ctx = app.mockContext();
      ctx.status = 404;
      assert(ctx.response.isSuccess === false);
    });
  });
});