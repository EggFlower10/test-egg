// app/middleware/error_handler.js
module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      ctx.app.emit('error', err, ctx);
      const status = err.status || 500;
      const error = status === 500 && ctx.app.config.env === 'prod'
        ? 'Internal Server Error'
        : err.message;

      // 先构建响应体对象
      const responseBody = { error };
      if (status === 422) {
        responseBody.detail = err.errors; // 先给detail赋值
      }
      ctx.body = responseBody; // 再将完整对象赋值给ctx.body
      ctx.status = status;
    }
  };
};
